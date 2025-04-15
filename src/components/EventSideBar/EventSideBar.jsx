import { useEffect, useMemo, useState } from "react";
import image from "./images/01month.jpg";
import svgIcon from "./icons/no-events.svg";
import ModalOngoingEvents from "../../composition/ModalOngoingEvents/ModalOngoingEvents.jsx";

import Portal from "../Portal/Portal.jsx";

import { getOauthToken } from "../../helpers/index.js";
import { ONGOING_EVENTS_API } from "../../const/index.js";
import "./EventSideBar.scss";

// {
//   "title": "Summer Full Term &amp; Express Term One - Registration period.",
//   "description": "Registration period for the Full Term and Express Term One: 2/4/2025 through 5/11/2025.",
//   "field_start_date": "2025-02-04 09:00:00",
//   "field_end_date": "2025-05-11 23:59:00",
//   "field_category": "3",
//   "nid": "752",
//   "uuid": "c2d13536-d524-4914-a3f9-954346b079c6",
//   "cache_test": 37751
//   },

const EventSideBar = ({ currentEvents = [], currentDate }) => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [currentOngoingEvent, setCurrentOngoingEvent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleOngoingEvent = (event) => {
    setCurrentOngoingEvent(event);
    setModalOpen(true);
  };

  const filterOngoingEvent = useMemo(() => {
    return ongoingEvents.filter((item) => {
      const startOngoingEvent = new Date(item.field_start_date).getMonth() + 1;
      const endOngoingEvent = new Date(item.field_end_date).getMonth() + 1;
      console.log("startOngoingEvent", startOngoingEvent);
      console.log("endOngoingEvent", endOngoingEvent);

      const currentMonth = new Date(currentDate).getMonth() + 1;
      // const currentMonth = 6;
      console.log("currentMonth", currentMonth);
      return (
        (currentMonth === startOngoingEvent || currentMonth > startOngoingEvent) &&
        currentMonth <= endOngoingEvent
      );
    });
  }, [ongoingEvents]);

  useEffect(() => {
    getOauthToken()
      .then((data) => {
        const { access_token } = data;
        return fetch(ONGOING_EVENTS_API, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        });
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("ongoing events", data.response.rows);
        setOngoingEvents(data.response.rows);
      })
      .catch((error) => {
        console.error("Error fetching ongoing events:", error);
      });
  }, []);
  return (
    <>
      <div className="event-sidebar-wrapper">
        <div className="sidebar-box">
          <div className="events-current">
            <h2 className="sidebar-title">Current Events</h2>
            <div className="sidebar-list-wrapper">
              <ul className="current-list">
                {currentEvents.length === 0 && (
                  <p className="no-events">
                    Nothing planned for today. <span>Enjoy!</span>
                  </p>
                )}
                {currentEvents.length > 0 &&
                  currentEvents.map((event, index) => (
                    <li key={index} className="list-item">
                      <p className="list-time"> {event?.time}</p>
                      <p className="list-title"> {event?.title}</p>
                      <p className="list-category"> {event?.category}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="events-ongoing">
            <div className="sidebar-image">
              <img className="image" src={image} alt="alt" />
            </div>
            <h2 className="sidebar-title">Ongoing Events</h2>
            <ul className="ongoing-list">
              {filterOngoingEvent.map((item, index) => (
                <li key={index} className="list-item">
                  <p className="list-title" onClick={() => handleOngoingEvent(item)}>
                    {item.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Portal>
        <ModalOngoingEvents
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={currentOngoingEvent}
        />
      </Portal>
    </>
  );
};

export default EventSideBar;
