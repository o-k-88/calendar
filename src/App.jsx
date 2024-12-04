import React, { useState, useEffect } from "react";
import "./App.css";
import DatePicker from "./components/DatePicker/DatePicker.jsx";
import ModalBase from "./components/ModalBase/ModalBase.jsx";
import Widget from "./containers/Widget/Widget.jsx";

import Layout from "./layout/Layout.jsx";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [popupData, setPopupData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  // https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json

  useEffect(() => {
    const data = fetch("https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json", {});
    data
      .then((data) => {
        return data.json();
      })
      .then((current) => {
        const split = current.rows.map(({ field_start_date, title, field_description }) => {
          const regex = /<time[^>]*>(\d+)<\/time>/;

          const matchData = field_start_date.match(regex)[1];

          const date = new Date(Number(matchData) * 1000);

          return {
            title,
            time: date.getHours(),
            description: field_description,
            date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
            currentDate: field_start_date,
          };
        });

        setEvents(split);
      });
  }, []);

  const handlerStartDate = (date) => setStartDate(date);
  const handlerIsModal = () => setIsShow(!isShow);
  const handlerSelect = (dateSelect) => {
    console.log("handlerSelect", dateSelect);

    const current = new Date(dateSelect);

    const dateId = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

    const FilteredEvents = events.filter((item) => item.date === dateId);

    setPopupData(FilteredEvents || []);
    if (FilteredEvents.length) {
      handlerIsModal();
    }
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
            startDate={startDate}
            events={events}
            onChange={handlerStartDate}
            onSelect={handlerSelect}
          />
        </Widget>
      </Layout>
      <ModalBase
        isOpen={isShow}
        data={popupData}
        handleClose={handlerIsModal}
        handleOk={handlerIsModal}
      ></ModalBase>
    </>
  );
}

export default App;
