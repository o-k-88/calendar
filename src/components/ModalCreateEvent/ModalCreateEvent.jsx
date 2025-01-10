import React from "react";
import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";

import "./ModalCreateEvent.scss";

const ModalCreateEvent = ({ isOpen, handleClose, data }) => {
  return (
    <ModalWrapper isOpen={isOpen} isOutside handleClose={handleClose}>
      <Modal className={"modal-create-event"}>
        <ModalHeader>
          <ModalClose onClick={handleClose} />
        </ModalHeader>
        <ModalBody>
          <h1>Create Calendar Event</h1>
          <form className="event-form">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" />
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" />
            <label htmlFor="category">Category</label>
            <select id="category" name="category">
              <option value="All Categories">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
            </select>
            <div className="date-time-group">
              <label htmlFor="start-date">Start Date</label>
              <input type="date" id="start-date" name="start-date" />
              <label htmlFor="start-time">Time</label>
              <input type="time" id="start-time" name="start-time" />
            </div>
            <div className="date-time-group">
              <label htmlFor="end-date">End Date</label>
              <input type="date" id="end-date" name="end-date" />
              <label htmlFor="end-time">Time</label>
              <input type="time" id="end-time" name="end-time" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter
          clickSecondary={handleClose}
          textFirst={"Submit"}
          textSecondary={"Close"}
        ></ModalFooter>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalCreateEvent;
