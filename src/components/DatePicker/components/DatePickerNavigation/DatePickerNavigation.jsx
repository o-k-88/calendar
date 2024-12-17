import React, { useEffect } from "react";
import { useState } from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../Button/Button";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = ({
  category,
  onStartDate,
  onShowMonthView,
  currentDay,
  onDateInput,
  events,
}) => {
  const [filteredBySelectEvents, setFilteredBySelectEvents] = useState([]);

  const handlerTodayButton = () => {
    onStartDate(new Date());
  };

  const handlerMonthButton = () => {
    onShowMonthView(true);
  };

  const handlerSelectOptions = (e) => {
    if (e.target.value === "All") {
      setFilteredBySelectEvents(events);
    } else {
      setFilteredBySelectEvents(events.filter((item) => item.category === e.target.value));
    }

    let currentOption = e.target.value;
    setFilteredBySelectEvents(events.filter((item) => item.category === currentOption));
  };

  return (
    <div className="date-picker-navigation">
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

      <DataCustom
        selected={currentDay}
        startDate={currentDay}
        onChange={(date) => onDateInput(date)}
      />
      {/* <div className="filters">
        <div>Filters</div>
        <div className="date-picker-wrapper">
          <select
            className="date-picker-navigation-select"
            name=""
            id=""
            onChange={handlerSelectOptions}
          >
            {category.map((item, index) => (
              <option className="date-picker-navigation-option" key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div> */}
    </div>
  );
};

export default DatePickerNavigation;
