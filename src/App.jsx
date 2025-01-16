import React, { useState, useEffect } from "react";
import { overflowHidden } from "./helpers/overflowHidden.js";
import dayjs from "dayjs";
import DatePicker from "./components/DatePicker/DatePicker.jsx";
import ModalCalendar from "./components/ModalCalendar/ModalCalendar.jsx";
import Widget from "./containers/Widget/Widget.jsx";
import Layout from "./layout/Layout.jsx";
import ModalSearch from "./components/ModalSearch/ModalSearch.jsx";
import ModalCreateEvent from "./components/ModalCreateEvent/ModalCreateEvent.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";

import "./App.scss";

function App() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(["All Categories"]);
  const [popupData, setPopupData] = useState({});

  const [isShow, setIsShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const [filteredEvents, setFilteredEvents] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json

  useEffect(() => {
    const data = fetch("https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json");
    data
      .then((data) => {
        return data.json();
      })
      .then((current) => {
        const split = current.rows.map(
          ({ field_start_date, title, field_description, field_category, nid }) => {
            const regex_data = /datetime="([^"]+)"/;
            let matchTime = field_start_date.match(regex_data);
            let currentHour = matchTime[1].split("T")[1].slice(0, 2);
            let currentMinute = matchTime[1].split("T")[1].slice(3, 5);
            let currentTime = dayjs().set("hour", currentHour).set("minute", currentMinute);
            const regex = /<time[^>]*>(\d+)<\/time>/;
            let matchData = field_start_date.match(regex)[1];
            let date = new Date(Number(matchData) * 1000);

            // const datejs = dayjs(Number(matchData) * 1000)
            // console.log('datejs',date, datejs.format('hh:mm A'));
            // console.log('match',matchTime[1].split("T")[1].slice(0,5));

            setCategory((prev) => {
              const categoriesArray = new Set([...prev, field_category]);
              const removeEmptyString = [...categoriesArray].filter((item) => item !== "");
              const removeSymbol = removeEmptyString.map((item) => {
                if (item.includes("&#039;")) {
                  return item.replace("&#039;", "'");
                }
                return item;
              });

              return [...removeSymbol];
            });
            return {
              id: nid,
              title,
              time: currentTime.format("hh:mm A"),
              description: field_description,
              date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
              currentDate: field_start_date,
              category: field_category,
            };
          }
        );

        setEvents(split);
        setFilteredEvents(split);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handlerSelect = (dateSelect, e) => {
    const currentEventTitle = e.target.textContent.replace(/^\d{2}:\d{2} [APM]{2} -\s*/, ""); //I'm not sure if this is the best way to do this
    setPopupData(events.find((item) => item.title === currentEventTitle));
  };

  const handlerIsModal = () => {
    setIsShow(!isShow);
    overflowHidden(isShow);
  };
  const handlerIsSearch = () => {
    setIsSearch(!isSearch);
    overflowHidden(isSearch);
  };

  const handleCreateEvent = () => {
    setCreateEvent(!createEvent);
    overflowHidden(createEvent);
  };

  const handlerSelectOptions = (value) => {
    if (value.value === "All Categories") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === value.value));
    }
  };

  const handlerIsLoggedIn = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Layout>
        {isLoggedIn ? (
          <Widget>
            <DatePicker
              className={"asdasdsadsa"}
              events={filteredEvents}
              onModal={handlerIsModal}
              onSearch={handlerIsSearch}
              category={category}
              onSelect={handlerSelect}
              onSelectOptions={handlerSelectOptions}
              onCreateEvent={handleCreateEvent}
            />
          </Widget>
        ) : (
          <LoginForm onLogin={handlerIsLoggedIn} />
        )}
      </Layout>
      <ModalCalendar isOpen={isShow} data={popupData} handleClose={handlerIsModal}></ModalCalendar>
      <ModalSearch isOpen={isSearch} data={events} handleClose={handlerIsSearch}></ModalSearch>
      <ModalCreateEvent isOpen={createEvent} handleClose={handleCreateEvent}></ModalCreateEvent>
    </>
  );
}

export default App;
