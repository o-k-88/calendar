import React, { useState, useEffect, useContext } from "react";

import DatePicker from "composition/DatePicker/DatePicker.jsx";
import ModalCalendar from "composition/ModalCalendar/ModalCalendar.jsx";
import ModalSearch from "composition/ModalSearch/ModalSearch.jsx";
import ModalCreateEvent from "composition/ModalCreateEvent/ModalCreateEvent.jsx";
import EventSideBar from "components/EventSideBar/EventSideBar.jsx";
import Widget from "layout/Widget/Widget.jsx";
import Layout from "layout/Layout.jsx";

import { overflowHidden } from "helpers/index.js";

import { useGetEvents } from "hooks/useGetEvents.js";

import { Context } from "context/index.jsx";
import { useDatePickerNavigate } from "hooks/useDatePickerNavigate";

let timeOutTime = 60000;
const newDate = new Date();

const PageCalendar = () => {
  //This state is for Header

  // useLogout(1760031970285, () => setLogout(true));
  // const [timeoutTime, setTimeoutTime] = useState(60000);
  //End This state is for Header

  const { currentUser } = useContext(Context);

  const [popupData, setPopupData] = useState({});

  const [isShow, setIsShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const [currentDateMonth, setCurrentDateMonth] = useState(newDate);

  const {
    events,
    filteredEvents,
    isLoadingEvents,
    handlerSelectCategory,
    handleSelectEventDay,
    currentSideBarEventDay,
  } = useGetEvents(currentDateMonth); //custom hook to get events

  const { filteredData, isErrorInput, noEventsFound, handleFilterData, handleClearFilterData } =
    useDatePickerNavigate(events); //custom hook for search modal

  const handlerCurrentEvent = (dataEvent) => setPopupData(dataEvent);

  const handlerIsModal = () => {
    setIsShow(!isShow);
    overflowHidden(isShow);
  };

  const handlerPopup = () => {
    setIsSearch(!isSearch);
    overflowHidden(isSearch);
  };

  const handlerClosePopupSearch = () => {
    handleClearFilterData(); // Clear filtered data when closing the search modal. Function is from useDatePickerNavigate hook
    handlerPopup();
  };

  // const handleCreateEvent = () => {
  //   setCreateEvent(!createEvent);
  //   overflowHidden(createEvent);
  // }; // not in use

  const handleMonthChange = (date) => setCurrentDateMonth(date);

  useEffect(() => {
    const current = new Date();
    handleSelectEventDay(current);
    handlerSelectCategory();
  }, [events]);

  return (
    <>
      <Layout>
        <Widget>
          <DatePicker
            events={filteredEvents}
            onModal={handlerIsModal}
            onSearch={handlerPopup}
            onCurrentEvent={handlerCurrentEvent}
            onSelectCategory={handlerSelectCategory}
            // onCreateEvent={handleCreateEvent}
            onSelectEventDay={handleSelectEventDay}
            onMonthChange={handleMonthChange}
            isLoadingEvents={isLoadingEvents}
          />
        </Widget>
        {/* <RightSideBar /> */}
        <EventSideBar currentEvents={currentSideBarEventDay} currentDateMonth={currentDateMonth} />
      </Layout>
      <ModalCalendar
        isOpen={isShow}
        data={popupData}
        onClose={handlerIsModal}
        currentUserUid={currentUser.uid}
      />
      <ModalSearch
        isOpen={isSearch}
        filteredData={filteredData}
        isErrorInput={isErrorInput}
        onClose={handlerClosePopupSearch}
        onFilterData={handleFilterData}
        noEventsFound={noEventsFound}
      />
      {/* <ModalCreateEvent isOpen={createEvent} onClose={handleCreateEvent} /> */}
    </>
  );
};

export default PageCalendar;
