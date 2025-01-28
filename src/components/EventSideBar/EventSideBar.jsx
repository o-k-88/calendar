import React from "react";
import image from "./images/01month.jpg";
import "./EventSideBar.scss";

const EventSideBar = ({ currentEvents = [], ongoingEvents = [] }) => {
  return (
    <div className="event-sidebar-wrapper">
      <div className="sidebar-box">
        <div className="events-ongoing">
          <div className="sidebar-image">
            <img className="image" src={image} alt="alt" />
          </div>
          <h2 className="sidebar-title">Ongoing Events</h2>
          <ul className="ongoing-list">
            {ongoingEvents.map((event, index) => (
              <li key={index} className="list-item">
                <p className="list-title"> {event.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="events-current">
          <h2 className="sidebar-title">Current Events</h2>
          <div className="sidebar-list-wrapper">
            <ul className="current-list">
              {currentEvents.map((event, index) => (
                <li key={index} className="list-item">
                  <p className="list-time"> {event.time}</p>
                  <p className="list-title"> {event.title}</p>
                  <p className="list-category"> {event.category}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSideBar;
