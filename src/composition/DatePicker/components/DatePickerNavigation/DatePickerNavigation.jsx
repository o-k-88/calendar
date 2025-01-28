import React, { useEffect } from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../../components/Button/Button";
import SelectCustom from "../SelectCustom/SelectCustom";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = (props) => {
  const {
    category,
    onStartDate,
    onShowMonthView,
    currentDay,
    onDateInput,
    onSelectOptions,
    onSearch,
    onCreateEvent,
  } = props;

  const handlerTodayButton = () => {
    onStartDate(new Date());
  };

  const handlerMonthButton = () => {
    onShowMonthView(true);
  };

  return (
    <div className="date-picker-navigation">
      <Button
        underlineView
        classNames="date-picker-navigation-add-event"
        href={"https://hybridcal.dev.sunyempire.edu/node/add/calendar_event"}
        target="_blank"
      >
        Add Event
      </Button>
      {/* <Button onClick={onCreateEvent} underlineView classNames="date-picker-navigation-add-event">
        Add New Event Form
      </Button> */}
      <Button
        underlineView
        classNames="date-picker-navigation-btn-today"
        onClick={handlerTodayButton}
      >
        Today
      </Button>
      <Button
        underlineView
        classNames="date-picker-navigation-btn-today"
        onClick={handlerMonthButton}
      >
        Month
      </Button>
      <Button
        underlineView
        classNames="date-picker-navigation-btn-today"
        href={"https://sunyempire.edu/media/academic-affairs/registrar/2024-2025-Academic-Year.pdf"}
      >
        '24-'25 Term Bookmark
      </Button>
      <Button
        underlineView
        classNames="date-picker-navigation-btn-today"
        href={"https://sunyempire.edu/media/academic-affairs/registrar/2025-2026-Academic-Year.pdf"}
      >
        '25-'26 Term Bookmark
      </Button>
      <Button onClick={onSearch} underlineView classNames="date-picker-navigation-btn-search">
        Search
      </Button>

      <DataCustom
        selected={currentDay}
        startDate={currentDay}
        onChange={(date) => onDateInput(date)}
      />
      <div className="date-picker-filter">
        <SelectCustom
          data={category}
          onChange={onSelectOptions}
          className="date-picker-select"
          classNamePrefix="date-picker"
          // defaultMenuIsOpen // открыть выпадающее меню селектора
        />
      </div>
    </div>
  );
};

export default DatePickerNavigation;
