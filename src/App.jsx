import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App.css";
import DatePicker from "./components/DatePicker/DatePicker.jsx";
import ModalCalendar from "./components/ModalCalendar/ModalCalendar.jsx";
import Widget from "./containers/Widget/Widget.jsx";

import Layout from "./layout/Layout.jsx";

function App() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [popupData, setPopupData] = useState({}); //
  const [isShow, setIsShow] = useState(false);

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
              return [...categoriesArray];
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
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handlerIsModal = (e) => {
    const currentEvent = e.target.textContent.replace(/^\d{2}:\d{2} [APM]{2} -\s*/, ""); //I'm not sure if this is the best way to do this
    console.log(currentEvent);
    setPopupData(events.find((item) => item.title === currentEvent));
    setIsShow(!isShow);
  };

  return (
    <>
      <Layout>
        <Widget>
          {/* <div className="navigation">
            <input type="text" /> <br />
            <input type="text" /> <br />
            <input type="text" /> <br />
            <input type="text" /> <br />
          </div> */}
          <DatePicker
            className={"asdasdsadsa"}
            events={events}
            handlerIsModal={handlerIsModal}
            category={category}
          />
        </Widget>
      </Layout>
      <ModalCalendar
        isOpen={isShow}
        data={popupData}
        handleClose={handlerIsModal}
        handleOk={handlerIsModal}
      ></ModalCalendar>
    </>
  );
}

export default App;
