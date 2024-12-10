import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import cn from "classnames";
import Button from "../Button/Button";
import DatePickerNavigation from "../DatePickerNavigation/DatePickerNavigation";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerView = (props) => {
  const { events, renderDay, handlerIsModal, className, category } = props;

  const [startDate, setStartDate] = useState(new Date());
  // const [inputValue, setInputValue] = useState(new Date().toISOString().slice(0, 10));

  const handlerStartDate = (date) => setStartDate(date);

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

            <span
              onClick={(e) => {
                handlerIsModal(e);
              }}
              className={"title"}
            >
              {item?.time} - {item?.title}
            </span>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <DatePickerNavigation
        category={category}
        handlerStartDate={handlerStartDate}
        events={events}
      />

      <div className="wrapper-date-picker">
        <DatePicker
          calendarClassName={cn("g-date-picker", className)}
          selected={startDate}
          onChange={handlerStartDate}
          renderDayContents={renderDay ? renderDay : renderDayContents}
          inline
        />
      </div>
    </>
  );
};

export default DatePickerView;
