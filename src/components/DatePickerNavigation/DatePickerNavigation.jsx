import React from "react";
import { useState } from "react";
import Button from "../Button/Button";

const DatePickerNavigation = ({ category, handlerStartDate }) => {
  const [inputValue, setInputValue] = useState(new Date().toISOString().slice(0, 10));

  const handlerTodayButton = () => {
    handlerStartDate(new Date());
    setInputValue(new Date().toISOString().slice(0, 10));
  };

  const handlerInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handlerInputDate = () => {
    if (inputValue) {
      const [year, month, day] = inputValue.split("-");
      const date = new Date(year, month - 1, day);
      handlerStartDate(date);
    }
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
      <Button underlineView classNames="date-picker-navigation-set-day" onClick={handlerInputDate}>
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
        {category.map((item, index) => (
          <button key={index}>{item}</button>
        ))}
        <button>All</button>
      </div>
    </div>
  );
};

export default DatePickerNavigation;
