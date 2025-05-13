import { useEffect, useMemo, useState } from "react";

import ModalOngoingEvents from "../../composition/ModalOngoingEvents/ModalOngoingEvents.jsx";
import EventSideBarImage from "./components/EventSideBarImage.jsx";

import Portal from "../Portal/Portal.jsx";

import { getOauthToken, overflowHidden } from "../../helpers/index.js";
import { ONGOING_EVENTS_API } from "../../const/index.js";
import "./EventSideBar.scss";

const EventSideBar = ({ currentEvents = [], currentDateMonth }) => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [currentOngoingEvent, setCurrentOngoingEvent] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const currentMonth = new Date(currentDateMonth).getMonth();
  const currentTimestamp = new Date(currentDateMonth).getTime();

  const handleOngoingEvent = (event) => {
    setCurrentOngoingEvent(event);
    setModalOpen(true);
    overflowHidden(modalOpen);
  };

  const onCloseOngoingEvent = () => {
    setModalOpen(false);
    overflowHidden(modalOpen);
  };

  const filterOngoingEvent = useMemo(() => {
    return ongoingEvents.filter((item) => {
      const startOngoingEvent = new Date(item.field_start_date).getTime();
      const endOngoingEvent = new Date(item.field_end_date).getTime();

      return (
        (currentTimestamp === startOngoingEvent || currentTimestamp > startOngoingEvent) &&
        currentTimestamp <= endOngoingEvent
      );
    });
  }, [ongoingEvents, currentTimestamp]);

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
        if (data.response.rows.length === 0) {
          return [{}];
        }
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
            <h2 className="sidebar-title">Today's Events</h2>
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
            <EventSideBarImage currentMonth={currentMonth} />
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
          onClose={() => onCloseOngoingEvent()}
          data={currentOngoingEvent}
        />
      </Portal>
    </>
  );
};

export default EventSideBar;
