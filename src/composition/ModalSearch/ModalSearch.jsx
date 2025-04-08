import React, { useState } from "react";
import "./ModalSearch.scss";

import Modal from "../../components/Modal/Modal";
import ModalWrapper from "../../components/Modal/ModalWrapper";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalBody from "../../components/Modal/ModalBody";
import ModalClose from "../../components/Modal/ModalClose";

import { Formik, Form, Field } from "formik";
import Button from "../../components/Button/Button";

const ModalSearch = ({
  isOpen,
  onClose,
  filteredData,
  isErrorInput,
  onFilterData,
  noEventsFound,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} isOutside>
      <Modal className={"modal-search"}>
        <ModalHeader>
          <ModalClose onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{ search_input: "", start_date: "", end_date: "" }}
            onSubmit={(values) => {
              onFilterData(values);
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
                {noEventsFound && (
                  <p style={{ color: "red", padding: "0 0 5px", fontSize: "12px" }}>
                    No events found
                  </p>
                )}
              </ul>
              <div className="searched-form-button-group">
                <Button className={"search-btn"} type="submit" underlineView>
                  Search
                </Button>
                <Button className={"close-btn"} onClick={onClose} underlineView>
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
