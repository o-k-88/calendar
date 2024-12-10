import React from "react";
import { useState } from "react";
import Button from "../Button/Button";

import "./DatePickerNavigation.scss";

const DatePickerNavigation = ({ category, handlerStartDate, events }) => {
  const [inputValue, setInputValue] = useState(new Date().toISOString().slice(0, 10));
  const [filteredBySelectEvents, setFilteredBySelectEvents] = useState([]);

  const handlerTodayButton = () => {
    handlerStartDate(new Date());
    setInputValue(new Date().toISOString().slice(0, 10));
  };

  const handlerInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handlerSetDateButton = () => {
    if (inputValue) {
      const [year, month, day] = inputValue.split("-");
      const date = new Date(year, month - 1, day);
      handlerStartDate(date);
    }
  };

  const handlerSelectOptions = (e) => {
    let currentOption = e.target.value;

    console.log(currentOption);
    setFilteredBySelectEvents(events.filter((item) => item.category === currentOption));
    console.log(filteredBySelectEvents);
  };

  return (
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
        onClick={handlerSetDateButton}
      >
        Set date
      </Button>
      <input
        className="date-picker-navigation-input-day"
        onChange={handlerInputValue}
        type="date"
        value={inputValue}
      />
      <div>
        <div>Filters</div>
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
    </div>
  );
};

export default DatePickerNavigation;
