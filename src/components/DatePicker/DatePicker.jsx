import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import cn from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerView = (props) => {
  const { startDate, onChange, onSelect, events, renderDay, handlerIsModal, className } = props;
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
  return (
    <>
      {/* <div className="date-picker-navigation">
        <button>Month</button>
        <button>Week</button>
        <button>Day</button>
        <div>
          <button>Current day</button>
          <input type="date" />
        </div>
      </div> */}
      <div className="wrapper-date-picker">
        <DatePicker
          calendarClassName={cn("g-date-picker", className)}
          selected={startDate}
          onChange={onChange}
          onSelect={onSelect}
          renderDayContents={renderDay ? renderDay : renderDayContents}
          inline
        />
      </div>
    </>
  );
};

export default DatePickerView;
