import React, { useState } from "react";

import DatePickerMain from "react-datepicker";
import cn from "classnames";
import DatePickerNavigation from "./components/DatePickerNavigation/DatePickerNavigation.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";
import { sortEventsByTime } from "../../helpers/index.js";

const renderTitle = (data) => {
  const isRecurringEvent = data?.hasOwnProperty("field_recurring_day_of_week");
  const isContinuesEvent = data?.isContinuesEvent;
  if (isContinuesEvent) {
    return `This is continues event. ${data?.time} ${data?.title} ${data?.description?.replace(/<[^>]*>?/gm, "")}`;
  }
  if (isRecurringEvent) {
    return `This is recurring event. ${data?.time} ${data?.title} ${data?.description?.replace(/<[^>]*>?/gm, "")}`;
  }
  return `${data?.time} ${data?.title} ${data?.description?.replace(/<[^>]*>?/gm, "")}`;
};

const DatePickerView = (props) => {
  const {
    events,
    renderDay,
    renderMonth,
    onModal,
    className,
    onCurrentEvent,
    onSearch,
    onSelectCategory,
    // onCreateEvent,
    onSelectEventDay,
    onMonthChange,
    isLoadingEvents,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showMonthView, setShowMonthView] = useState(false);

  const handlerStartDate = (date) => {
    setStartDate(date);
  };
  const handlerSetDateInput = (day) => setStartDate(day);

  const renderDayContents = (day, date) => {
    const current = new Date(date);

    let currentDayEvents = events?.filter(({ date }) => {
      const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

      return date === currentDate;
    });

    if (currentDayEvents.length > 0) {
      currentDayEvents = sortEventsByTime(currentDayEvents);
    }

    return (
      <>
        <div className={"day"}>{day}</div>

        {currentDayEvents.map((item, index) => {
          const isRecurringEvent = item?.hasOwnProperty("field_recurring_day_of_week");
          const isContinuesEvent = item?.isContinuesEvent;

          // const continuesEventStartDate =
          //   new Date(item?.continuesStartDate).getTime() === new Date(date).getTime();

          // if (isContinuesEvent && !continuesEventStartDate) {

          //   return (
          //     <div
          //       key={index}
          //       className=""
          //       onClick={() => {
          //         onModal();
          //         onCurrentEvent(item);
          //       }}
          //     >
          //       Continues Event
          //     </div>
          //   );
          // }

          const continuesEventEndDate =
            new Date(item?.field_end_date).getTime() === new Date(date).getTime();
          if (isContinuesEvent && continuesEventEndDate) {
          }
          return (
            <div
              key={index}
              className={cn(
                "event",
                { "recurring-event": isRecurringEvent },
                { "continues-event": isContinuesEvent }
              )}
            >
              {item?.title && <span className="label" />}

              <div
                onClick={(e) => {
                  onModal();
                  onCurrentEvent(item);
                }}
                className={"title"}
                title={renderTitle(item)}
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
        onSelectCategory={onSelectCategory}
        events={events}
        onSearch={onSearch}
        // onCreateEvent={onCreateEvent}
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
            onSelect={onSelectEventDay}
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
