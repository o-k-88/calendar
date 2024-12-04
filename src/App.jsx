import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "./App.css";
import DatePicker from "./components/DatePicker/DatePicker.jsx";
import ModalBase from "./components/ModalBase/ModalBase.jsx";
import Widget from "./containers/Widget/Widget.jsx";

import Layout from "./layout/Layout.jsx";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState([]);
  const [popupData, setPopupData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  // https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json

  useEffect(() => {
    const data = fetch("https://hybridcal.dev.sunyempire.edu/api/v1/calendar/all?_format=json");
    data
      .then((data) => {
        return data.json();
      })
      .then((current) => {
        const split = current.rows.map(({ field_start_date, title, field_description, field_category }) => {
        
          const regex_data = /datetime="([^"]+)"/;
          let matchTime = field_start_date.match(regex_data);
          let currentHour = matchTime[1].split("T")[1].slice(0,2)
          let currentMinute = matchTime[1].split("T")[1].slice(3,5)
          let currentTime = dayjs().set('hour', currentHour).set('minute', currentMinute)
          
          const regex = /<time[^>]*>(\d+)<\/time>/;
          let matchData = field_start_date.match(regex)[1];
          let date = new Date(Number(matchData) * 1000);
          
          
          // const datejs = dayjs(Number(matchData) * 1000)
          // console.log('datejs',date, datejs.format('hh:mm A'));
          // console.log('match',matchTime[1].split("T")[1].slice(0,5));
          
          setCategory((prev) => {
            // const arr = [...prev, field_category]
            //
            // return new Set(arr)
            
            return [...prev, field_category]
            
            // if (prev.length > 0 && prev.some((item) => item === field_category)){
            //   return [...prev, field_category]
            // } else {
            //   return [field_category]
            // }
          })

          return {
            title,
            time: currentTime.format("hh:mm A"),
            description: field_description,
            date: `${date.getFullYear()}${date.getMonth()}${date.getDate()}`,
            currentDate: field_start_date,
            category: field_category,
          };
        });

        setEvents(split);
      })
      .catch((e) => {
        console.error("Fucking CORS", e);
      });
    
    // category.map((item) => {
    //   console.log(item)
    // })
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
  
  // console.log('category',category);
  
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
