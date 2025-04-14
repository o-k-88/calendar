import React, { useState } from "react";

import DatePickerMain from "react-datepicker";
import cn from "classnames";
import DatePickerNavigation from "./components/DatePickerNavigation/DatePickerNavigation.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const DatePickerView = (props) => {
  const {
    events,
    renderDay,
    renderMonth,
    onModal,
    className,
    category,
    onCurrentEvent,
    onSearch,
    onSelectOptions,
    onCreateEvent,
    onSelectEventDay,
    onSelectDate,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showMonthView, setShowMonthView] = useState(false);

  const handlerStartDate = (date) => setStartDate(date);
  const handlerSetDateInput = (day) => setStartDate(day);

  const renderDayContents = (day, date) => {
    const current = new Date(date);
    const filteredTooltipText = events?.filter(({ date }) => {
      const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

      return date === currentDate;
    });

    return (
      <>
        <div className={"day"}>{day}</div>
        {filteredTooltipText.map((item, index) => {
          return (
            <div key={index} className={"event"}>
              {item?.title && <span className="label" />}

              <div
                onClick={(e) => {
                  onModal();
                  onCurrentEvent(item);
                }}
                className={"title"}
                title={
                  item?.time +
                  " " +
                  item?.title +
                  " " +
                  item?.description?.replace(/<[^>]*>?/gm, "")
                }
              >
                {item?.time} - {item?.title}
              </div>
            </div>
          );
        })}
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

    return <div onClick={handlerSelectMonth}>{shortMonth}</div>;
  };

  return (
    <>
      <DatePickerNavigation
        category={category}
        onStartDate={handlerStartDate}
        onShowMonthView={setShowMonthView}
        currentDay={startDate}
        onDateInput={handlerSetDateInput}
        onSelectOptions={onSelectOptions}
        events={events}
        onSearch={onSearch}
        onCreateEvent={onCreateEvent}
        onSelectEventDay={onSelectEventDay}
      />

      <div className="wrapper-date-picker">
        {events.length === 0 ? (
          <Loader />
        ) : (
          <DatePickerMain
            {...props}
            calendarClassName={cn("g-date-picker", className)}
            selected={startDate}
            showMonthYearPicker={showMonthView}
            onChange={handlerStartDate}
            onSelect={onSelectDate}
            renderDayContents={renderDay ? renderDay : renderDayContents}
            renderMonthContent={renderMonth ? renderMonth : renderMonthContent}
            inline
          />
        )}
      </div>
    </>
  );
};

export default DatePickerView;
