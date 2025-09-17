import React, { useState } from "react";

import DatePickerMain from "react-datepicker";
import cn from "classnames";
import DatePickerNavigation from "./components/DatePickerNavigation/DatePickerNavigation.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";
import { sortEventsByTime } from "../../helpers/index.js";

const DatePickerView = (props) => {
  const {
    events,
    renderDay,
    renderMonth,
    onModal,
    className,
    onCurrentEvent,
    onSearch,
    onSelectOptions,
    onCreateEvent,
    onSelectEventDay,
    onSelectDate,
    onMonthChange,
    isLoadingEvents,
    onCurrentCategory,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showMonthView, setShowMonthView] = useState(false);

  const handlerStartDate = (date) => {
    setStartDate(date);
  };
  const handlerSetDateInput = (day) => setStartDate(day);

  const renderDayContents = (day, date) => {
    const current = new Date(date);
    let filteredTooltipText = events?.filter(({ date }) => {
      const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

      return date === currentDate;
    });

    if (filteredTooltipText.length > 0) {
      filteredTooltipText = sortEventsByTime(filteredTooltipText);
    }

    return (
      <>
        <div className={"day"}>{day}</div>

        {filteredTooltipText.map((item, index) => {
          const isRecurringEvent = item?.hasOwnProperty("field_recurring_day_of_week");
          return (
            <div key={index} className={cn("event", { "recurring-event": isRecurringEvent })}>
              {item?.title && <span className="label" />}

              <div
                onClick={(e) => {
                  onModal();
                  onCurrentEvent(item);
                }}
                className={"title"}
                title={`${
                  isRecurringEvent
                    ? "This is recurring event"
                    : item?.time +
                      " " +
                      item?.title +
                      " " +
                      item?.description?.replace(/<[^>]*>?/gm, "")
                }`}
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
        {isLoadingEvents ? (
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
            onMonthChange={onMonthChange}
            inline
          />
        )}
      </div>
    </>
  );
};

export default DatePickerView;
