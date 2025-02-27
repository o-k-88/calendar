import React, { useEffect } from "react";
import DataCustom from "../DataCustom/DataCustom.jsx";
import Button from "../../../../components/Button/Button";
import SelectCustom from "../SelectCustom/SelectCustom";
import AddEventIcon from "./icons/add-event.svg";
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
    onSelectEventDay,
  } = props;

  const handlerTodayButton = () => {
    onStartDate(new Date());
  };

  const handlerMonthButton = () => {
    onShowMonthView(true);
  };

  // https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=95a95fe5-983f-45a4-90a8-36973e266001&response_type=code+id_token&redirect_uri=https://hybridcal.dev.sunyempire.edu/azure&scope=user.read+openid+profile+email&response_mode=form_post&state=12345&nonce=678910

  // "https://hybridcal.dev.sunyempire.edu/node/add/calendar_event"

  return (
    <div className="date-picker-navigation">
      {/* <Button onClick={onCreateEvent} underlineView classNames="date-picker-navigation-add-event">
        Add New Event Form
      </Button> */}
      <Button underlineView classNames="button-navigation" onClick={handlerTodayButton}>
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text"> Today</span>
      </Button>
      <Button underlineView classNames="button-navigation" onClick={handlerMonthButton}>
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text"> Month</span>
      </Button>
      <Button
        underlineView
        classNames="button-navigation"
        href={"https://sunyempire.edu/media/academic-affairs/registrar/2024-2025-Academic-Year.pdf"}
      >
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text"> '24-'25 Term Bookmark</span>
      </Button>
      <Button
        underlineView
        classNames="button-navigation"
        href={"https://sunyempire.edu/media/academic-affairs/registrar/2025-2026-Academic-Year.pdf"}
      >
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text"> '25-'26 Term Bookmark</span>
      </Button>
      <Button onClick={onSearch} underlineView classNames="button-navigation">
        <span className="icon">
          <img src={AddEventIcon} alt="" />
        </span>
        <span className="text"> Search</span>
      </Button>

      <div className="navigation-actions">
        <DataCustom
          selected={currentDay}
          startDate={currentDay}
          onChange={(date) => {
            onDateInput(date);
            onSelectEventDay(date);
          }}
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
    </div>
  );
};

export default DatePickerNavigation;
