import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import cn from "classnames";
import Button from "../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerView = (props) => {
  const { events, renderDay, handlerIsModal, className } = props;
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState(new Date().toISOString().slice(0, 10));

  const handlerStartDate = (date) => setStartDate(date);

  const handlerSelect = (dateSelect) => {
    console.log("handlerSelect", dateSelect);
    // const current = new Date(dateSelect);
    // const dateId = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;
    // const FilteredEvents = events.filter((item) => item.date === dateId);
    // setPopupData(FilteredEvents || []);
    // if (FilteredEvents.length) {
    //   // handlerIsModal();
    // }
  };

  const renderDayContents = (day, date) => {
    const current = new Date(date);
    const filteredTooltipText = events?.filter(({ date }) => {
      const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

      return date === currentDate;
    });

    return (
      <>
        <div className={"day"}>{day}</div>
        {filteredTooltipText.map((item, index) => (
          <div key={index}>
            {item?.title && <span className="label" />}
            {/* <span className="time">{item?.time} - </span> */}
            <span onClick={handlerIsModal} className={"title"}>
              {item?.time} - {item?.title}
            </span>
          </div>
        ))}
      </>
    );
  };

  const handlerTodayButton = () => {
    handlerStartDate(new Date());
    setInputValue(new Date().toISOString().slice(0, 10));
  };

  const handlerInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handlerInputDate = () => {
    if (inputValue) {
      const [year, month, day] = inputValue.split("-");
      const date = new Date(year, month - 1, day);
      handlerStartDate(new Date(date));
    }
  };

  return (
    <>
      <div className="date-picker-navigation">
        {/* <button>Month</button>
        <button>Week</button> */}

        <Button
          underlineView
          classNames="date-picker-navigation-btn-today"
          onClick={handlerTodayButton}
        >
          Today
        </Button>

        <Button
          underlineView
          classNames="date-picker-navigation-set-day"
          onClick={handlerInputDate}
        >
          Set date
        </Button>
        <input
          className="date-picker-navigation-input-day"
          onChange={handlerInputValue}
          type="date"
          value={inputValue}
        />
      </div>
      <div className="wrapper-date-picker">
        <DatePicker
          calendarClassName={cn("g-date-picker", className)}
          selected={startDate}
          onChange={handlerStartDate}
          onSelect={handlerSelect}
          renderDayContents={renderDay ? renderDay : renderDayContents}
          inline
        />
      </div>
    </>
  );
};

export default DatePickerView;
