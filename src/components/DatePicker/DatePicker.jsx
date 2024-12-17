import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import DatePickerMain from "react-datepicker";
import cn from "classnames";
import DatePickerNavigation from "./components/DatePickerNavigation/DatePickerNavigation.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";
import { use } from "react";

const DatePickerView = (props) => {
  const {
    events,
    renderDay,
    renderMonth,
    handlerIsModal,
    className,
    category,
    onSelect,
    filteredEvents,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showMonthView, setShowMonthView] = useState(false);

  const handlerStartDate = (date) => setStartDate(date);
  const handlerSetDateInput = (day) => setStartDate(day);

  const renderDayContents = (day, date) => {
    const current = new Date(date);
    const filteredTooltipText = filteredEvents?.filter(({ date }) => {
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
                handlerIsModal();
                onSelect(date, e);
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

  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const handlerSelectMonth = () => {
      const fullYear = new Date(day).getFullYear();
      setShowMonthView(false);
      //   setCurrentMonth(new Date(`${fullYear}-01-${month + 1 < 10 ? `0${month + 1}` : month + 1}`));
      handlerStartDate(new Date(`${fullYear}-01-${month + 1 < 10 ? `0${month + 1}` : month + 1}`));
    };

    return <span onClick={handlerSelectMonth}>{shortMonth}</span>;
  };

  const handlerSelectOptions = (e) => {
    if (e.target.value === "All") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.category === e.target.value));
    }
  };

  return (
    <>
      <DatePickerNavigation
        category={category}
        onStartDate={handlerStartDate}
        onShowMonthView={setShowMonthView}
        currentDay={startDate}
        onDateInput={handlerSetDateInput}
        events={events}
      />

      <div className="wrapper-date-picker">
        <DatePickerMain
          {...props}
          calendarClassName={cn("g-date-picker", className)}
          selected={startDate}
          showMonthYearPicker={showMonthView}
          onChange={handlerStartDate}
          onSelect={onSelect}
          renderDayContents={renderDay ? renderDay : renderDayContents}
          renderMonthContent={renderMonth ? renderMonth : renderMonthContent}
          inline
        />
      </div>
    </>
  );
};

export default DatePickerView;
