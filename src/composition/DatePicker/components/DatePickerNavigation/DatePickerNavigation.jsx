import React, { forwardRef } from "react";
import DateCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../../components/Button/Button";
import SelectCustom from "../SelectCustom/SelectCustom";
import AddEventIcon from "./icons/add-event.svg";
import monthIcon from "./icons/month-calendar.svg";
import todayIcon from "./icons/today-calendar.svg";
import searchIcon from "./icons/search-calendar.svg";
import "./DatePickerNavigation.scss";
import cx from "classnames";

const DatePickerButton = forwardRef(({ value, onClick, className }, ref) => (
  <button className={cx(className, "date-picker-input")} onClick={onClick} ref={ref}>
    {value}
  </button>
));

const DatePickerNavigation = (props) => {
  const {
    onStartDate,
    onShowMonthView,
    currentDay,
    onDateInput,
    onSelectCategory,
    onSearch,
    // onCreateEvent,
    onSelectEventDay,
  } = props;

  const handlerTodayButton = () => {
    onStartDate(new Date());
  };

  const handlerMonthButton = () => {
    onShowMonthView(true);
  };

  return (
    <div className="date-picker-navigation">
      <Button underlineView className="button-navigation" onClick={handlerTodayButton}>
        <span className="icon">
          <img src={todayIcon} alt="today button" />
        </span>
        <span className="text" title="Today's day">
          Today
        </span>
      </Button>
      <Button underlineView className="button-navigation" onClick={handlerMonthButton}>
        <span className="icon">
          <img src={monthIcon} alt="month button" />
        </span>
        <span className="text" title="Pick month">
          Month
        </span>
      </Button>
      <Button
        underlineView
        className="button-navigation mobile-hidden"
        href={"/src/assets/2026_2027 Term Calendar Bookmark.pdf"}
      >
        <span className="icon">
          <img src={AddEventIcon} alt="26-’27 Term Bookmark" />
        </span>
        <span className="text">’26-’27 Term Bookmark</span>
      </Button>
      <Button
        underlineView
        className="button-navigation mobile-hidden"
        href={"/src/assets/2027_2028 Term Calendar Bookmark.pdf"}
      >
        <span className="icon">
          <img src={AddEventIcon} alt="'27-’28 Term Bookmark" />
        </span>
        <span className="text">'27-’28 Term Bookmark</span>
      </Button>
      <Button
        underlineView
        className="button-navigation mobile-hidden"
        href={
          "https://sunyempire.edu/_resources/images/its-external/calendar-pdf/DEI-Calendar-23-24.pdf"
        }
      >
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text">Diversity, Equity and Inclusion Calendar</span>
      </Button>
      <Button onClick={onSearch} underlineView className="button-navigation">
        <span className="icon">
          <img src={searchIcon} alt="search button" />
        </span>
        <span className="text"> Search</span>
      </Button>

      <div className="navigation-actions">
        <div className="date-picker-date-custom action-button">
          <DateCustom
            selected={currentDay}
            startDate={currentDay}
            onChange={(date) => {
              onDateInput(date);
              onSelectEventDay(date);
            }}
            customInput={<DatePickerButton />}
          />
        </div>
        <div className="date-picker-filter action-button">
          <SelectCustom
            isSearchable={false}
            onChange={onSelectCategory}
            // defaultMenuIsOpen // открыть выпадающее меню селектора
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickerNavigation;
