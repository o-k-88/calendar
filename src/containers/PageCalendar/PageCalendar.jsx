import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import DatePicker from "../../composition/DatePicker/DatePicker.jsx";
import ModalCalendar from "../../composition/ModalCalendar/ModalCalendar.jsx";
import ModalSearch from "../../composition/ModalSearch/ModalSearch.jsx";
import ModalCreateEvent from "../../composition/ModalCreateEvent/ModalCreateEvent.jsx";

import EventSideBar from "../../components/EventSideBar/EventSideBar.jsx";
import Widget from "../../layout/Widget/Widget.jsx";
import Layout from "../../layout/Layout.jsx";

import { API_HOST, TOKEN_OBJECT_STRINGIFY } from "../../const/";
import {
  formattingCategory,
  overflowHidden,
  getAllFormattedEvents,
  getOauthToken,
  sortEventsByTime,
} from "../../helpers/index.js";

const newDate = new Date();

const PageCalendar = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState(["All Categories"]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [popupData, setPopupData] = useState({});

  const [isShow, setIsShow] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [isErrorInput, setIsErrorInput] = useState(false);

  const [currentEventDay, setCurrentEventDay] = useState([]);

  const [noEventsFound, setNoEventsFound] = useState(false);

  const [totalPages, setTotalPages] = useState([]);
  const [oauthToken, setOauthToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [currentDatePickerDate, setCurrentDatePickerDate] = useState(newDate);

  const [currentUrl, setCurrentUrl] = useState(window.location.href);
  const [currentUser, setCurrentUser] = useState({});
  const [currentToken, setCurrentToken] = useState(null);
  const [isLogin, setIsLogin] = useState(currentUrl.includes("/?sso=esc2902931876") || false);
  const [isAddEvent, setAddEvent] = useState(false);
  const [currentDateMonth, setCurrentDateMonth] = useState(newDate);

  const handleFilterData = ({ search_input, start_date, end_date }) => {
    // If search_input is empty, set filteredData to an empty array
    if (search_input.trim() === "") {
      setIsErrorInput(true);
      setFilteredData([]);
      return;
    }

    const start = start_date ? new Date(start_date) : null;
    const end = end_date ? new Date(end_date) : null;

    const filtered = events.filter((event) => {
      const eventDate = new Date(event.currentDate);

      // Check if event date is within range
      const isWithinDateRange = (!start || eventDate >= start) && (!end || eventDate <= end);

      // Check if search input matches title, description, or category
      const matchesSearch =
        event.title.toLowerCase().includes(search_input.toLowerCase()) ||
        event.description.toLowerCase().includes(search_input.toLowerCase()) ||
        event.category.toLowerCase().includes(search_input.toLowerCase());

      return isWithinDateRange && matchesSearch;
    });
    setIsErrorInput(false);
    setFilteredData(filtered);

    filtered.length === 0 ? setNoEventsFound(true) : setNoEventsFound(false);
  };

  const selectEventDay = (date) => {
    const current = new Date(date);

    const currentDate = `${current.getFullYear()}${current.getMonth()}${current.getDate()}`;

    const filterEvent = events.filter(({ date }) => date === currentDate);

    const currentEvent = sortEventsByTime(filterEvent);

    setCurrentEventDay(currentEvent);
  };

  useEffect(() => {
    getOauthToken().then((data) => {
      setOauthToken(data?.access_token);

      setRefreshToken(data?.refresh_token);
      fetch(`${API_HOST}/api/v2/calendar/event/all?_format=json`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + data.access_token,
        },
      })
        .then((res) => res.json())
        .then((current) => {
          const totalPagesArr = new Array(current.pager.total_pages)
            .fill(null)
            .map(
              (item, index) =>
                `${API_HOST}/api/v2/calendar/event/all?_format=json&page=${index + 1}`
            );

          setTotalPages(totalPagesArr);
        });
    });
  }, []);

  const getDataCalendar = async () => {
    const data = await getAllFormattedEvents(totalPages, oauthToken);
    const categories = formattingCategory(data);

    setEvents(data);
    setFilteredEvents(data);
    setCategory(categories);
  };

  useEffect(() => {
    if (totalPages.length > 0) {
      getDataCalendar();
    }
  }, [totalPages]);

  const handleSelectDate = (dateSelect) => {
    selectEventDay(dateSelect);
    setCurrentDatePickerDate(dateSelect);
  };

  const handlerCurrentEvent = (dataEvent) => {
    setPopupData(dataEvent);
  };

  const handlerIsModal = () => {
    setIsShow(!isShow);
    overflowHidden(isShow);
  };

  const handlerPopup = () => {
    setIsSearch(!isSearch);
    overflowHidden(isSearch);
  };

  const handlerClosePopupSearch = () => {
    setFilteredData([]);
    setIsErrorInput(false);
    setNoEventsFound(false);
    handlerPopup();
  };

  const handleCreateEvent = () => {
    setCreateEvent(!createEvent);
    overflowHidden(createEvent);
  };

  const handlerSelectOptions = (value) => {
    if (value.value === "All Categories") {
      return setFilteredEvents(events);
    }
    setFilteredEvents(events.filter((event) => event.category === value.value));
  };

  useEffect(() => {
    const current = new Date();
    selectEventDay(current);
  }, [events]);

  useEffect(() => {
    setCurrentUrl(window.location.href);

    if (currentUrl.includes("/?sso=esc2902931876")) {
      setIsLogin(true);
    }
    if (currentToken) {
      setIsLogin(false);
      setAddEvent(true);

      setCurrentUser(jwtDecode(currentToken));
    }
  }, [currentUrl, currentToken]);

  const handleToken = (token) => {
    setCurrentToken(token);
  };

  const handleMonthChange = (date) => {
    setCurrentDateMonth(date);
  };

  return (
    <>
      <Layout
        isLogin={isLogin}
        isAddEvent={isAddEvent}
        currentUser={currentUser}
        onToken={handleToken}
      >
        <Widget>
          <DatePicker
            className={"asdasdsadsa"}
            events={filteredEvents}
            onModal={handlerIsModal}
            onSearch={handlerPopup}
            category={category}
            onSelectDate={handleSelectDate}
            onCurrentEvent={handlerCurrentEvent}
            onSelectOptions={handlerSelectOptions}
            onCreateEvent={handleCreateEvent}
            onSelectEventDay={selectEventDay}
            onMonthChange={handleMonthChange}
          />
        </Widget>
        {/* <RightSideBar /> */}
        <EventSideBar currentEvents={currentEventDay} currentDateMonth={currentDateMonth} />
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
      <ModalCreateEvent isOpen={createEvent} onClose={handleCreateEvent} />
    </>
  );
};

export default PageCalendar;
