import React, { useState } from "react";
import "./ModalSearch.scss";

import Modal from "../Modal/Modal";
import ModalWrapper from "../Modal/ModalWrapper";
import ModalHeader from "../Modal/ModalHeader";
import ModalBody from "../Modal/ModalBody";
import ModalFooter from "../Modal/ModalFooter";
import ModalClose from "../Modal/ModalClose";

import { Formik, Form, Field } from "formik";
import Button from "../Button/Button";

const ModalSearch = ({ data, isOpen, handleClose }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isErrorInput, setIsErrorInput] = useState(false);

  const updatedData = data.map((item) => {
    const curr = item.currentDate;
    const regex = /<time[^>]*>(\d+)<\/time>/;
    const matchData = curr.match(regex)[1];
    return {
      ...item,
      currentDate: new Date(Number(matchData) * 1000),
    };
  });

  const handleFilterData = ({ search_input, start_date, end_date }) => {
    // If search_input is empty, set filteredData to an empty array
    if (search_input.trim() === "") {
      setIsErrorInput(true);
      setFilteredData([]);
      return;
    }

    const start = start_date ? new Date(start_date) : null;
    const end = end_date ? new Date(end_date) : null;

    const filtered = updatedData.filter((event) => {
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
  };

  return (
    <ModalWrapper isOpen={isOpen} handleClose={handleClose} isOutside>
      <Modal className={"modal-search"}>
        <ModalHeader>
          <ModalClose
            onClick={() => {
              setFilteredData([]);
              handleClose();
              setIsErrorInput(false);
            }}
          />
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ search_input: "", start_date: "", end_date: "" }}
            onSubmit={(values) => {
              handleFilterData(values);
            }}
          >
            <Form>
              <Field
                className="search-form-field"
                type="text"
                name="search_input"
                placeholder="Search events"
              />
              {isErrorInput && (
                <p style={{ color: "red", padding: "0 0 5px", fontSize: "12px" }}>
                  Search input is required
                </p>
              )}
              <span>Occurring between:</span>
              <div
                className="search-form-date"
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Field className="search-form-field" type="date" name="start_date" />

                <Field className="search-form-field" type="date" name="end_date" />
              </div>
              <ul>
                {filteredData.length > 0 &&
                  filteredData.map((event) => (
                    <li className="searched-item " key={event.id}>
                      <strong className="searched-title">{event.title}</strong>
                      <p
                        className="searched-description"
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                      <p>Date: {new Date(event.currentDate).toLocaleDateString()}</p>
                      <p className="searched-category">
                        Category: {event.category || "No Category"}
                      </p>
                    </li>
                  ))}
              </ul>
              <div className="searched-form-button-group">
                <Button classNames={"search-btn"} type="submit" underlineView>
                  Search
                </Button>
                <Button
                  classNames={"close-btn"}
                  onClick={() => {
                    setFilteredData([]);
                    handleClose();
                    setIsErrorInput(false);
                  }}
                  underlineView
                >
                  Close
                </Button>
              </div>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </ModalWrapper>
  );
};

export default ModalSearch;
