import React, { useState, useEffect } from "react";
import { overflowHidden } from "./helpers/overflowHidden.js";
import dayjs from "dayjs";
import DatePicker from "./components/DatePicker/DatePicker.jsx";
import ModalCalendar from "./components/ModalCalendar/ModalCalendar.jsx";
import Widget from "./containers/Widget/Widget.jsx";
import Layout from "./layout/Layout.jsx";
import ModalSearch from "./components/ModalSearch/ModalSearch.jsx";
import ModalCreateEvent from "./components/ModalCreateEvent/ModalCreateEvent.jsx";
import { formattingEvent, formattingCategory } from "./helpers/index.js";
import "./App.scss";
import RightSideBar from "./components/RightSideBar/RightSideBar.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(["All Categories"]);
  const [popupData, setPopupData] = useState({});

  const [isShow, setIsShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const [filteredEvents, setFilteredEvents] = useState([]);

  // https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json

  useEffect(() => {
    const data = fetch("https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json");
    data
      .then((data) => {
        return data.json();
      })
      .then((current) => {
        const data = formattingEvent(current.rows);
        const categories = formattingCategory(data);
        console.log("data", data);
        // setEvents(data);
        // setFilteredEvents(data);
        // setCategory();
        return {
          data,
          categories,
        };
      })
      .then((data) => {
        console.log("data 46", data);
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

  return (
    <>
      <Layout>
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
        <RightSideBar />
      </Layout>
      <ModalCalendar isOpen={isShow} data={popupData} handleClose={handlerIsModal}></ModalCalendar>
      <ModalSearch isOpen={isSearch} data={events} handleClose={handlerIsSearch}></ModalSearch>
      <ModalCreateEvent isOpen={createEvent} handleClose={handleCreateEvent}></ModalCreateEvent>
    </>
  );
}

export default App;
