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
    onChange,
    onMonthChange,
  } = props;

  const [startDate, setStartDate] = useState(new Date());
  const [showMonthView, setShowMonthView] = useState(false);

  const handlerStartDate = (date) => {
    setStartDate(date);
    onChange(date);
  };
  const handlerSetDateInput = (day) => setStartDate(day);

  const renderDayContents = (day, date) => {
    const current = new Date(date);
    const filteredTooltipText = events?.filter(({ date }) => {
      const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

      return date === currentDate;
    });

    //     Condition Check:

    // if (filteredTooltipText.length > 0):
    // This checks if the filteredTooltipText array contains any elements. If the array is empty, the sorting logic is skipped.
    // Sorting Logic:

    // filteredTooltipText.sort((a, b) => { ... }):
    // The sort method is used to reorder the elements of the filteredTooltipText array in ascending order based on the hour of the day.
    // Extracting Hours:

    // const timeA = new Date(a.currentDate).getHours();
    // const timeB = new Date(b.currentDate).getHours();
    // For each event object (a and b), the currentDate property is converted into a Date object, and the hour is extracted using the getHours() method.
    // Comparison:

    // return timeA - timeB;
    // The difference between timeA and timeB determines the order:
    // If timeA is less than timeB, a is placed before b.
    // If timeA is greater than timeB, b is placed before a.
    // If they are equal, their order remains unchanged.

    if (filteredTooltipText.length > 0) {
      filteredTooltipText.sort((a, b) => {
        const timeA = new Date(a.currentDate).getHours();
        const timeB = new Date(b.currentDate).getHours();
        return timeA - timeB;
      });
    }

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
            onMonthChange={onMonthChange}
            inline
          />
        )}
      </div>
    </>
  );
};

export default DatePickerView;
