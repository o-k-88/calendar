import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Button from "../../components/Button/Button.jsx";

export const FormCreateEvent = ({ handleClose }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://hybridcal.dev.sunyempire.edu/api/v2/calendar/categories?_format=json")
      .then((response) => response.json())
      .then((data) => {
        data.map((category) => {
          if (category.name.includes("&#039;")) {
            category.name = category.name.replace("&#039;", "'");
          }
        });
        setCategories(data);
      });
  }, []);

  return (
    <Formik
      initialValues={{ type: "calendar_event" }}
      onSubmit={(values, actions) => {
        // console.log("initial form data", values);
        const initialFormData = {
          ...values,
          field_start_date: `${values.field_start_date}T${values["start-time"]}:00Z`,
          field_end_date: `${values.field_end_date}T${values["end-time"]}:00Z`,
        };

        // "field_end_date":{"value":"2024-01-12T17:00:00Z"}
        const updatedFormData = Object.keys(initialFormData).map((key) => {
          if (key === "type") {
            return {
              [key]: initialFormData[key],
            };
          }
          if (key !== "end-time" && key !== "start-time") {
            return {
              [key]: { value: `${initialFormData[key]}` },
            };
          }
        });

        const objectToPost = updatedFormData.reduce((acc, obj) => ({ ...acc, ...obj }), {});
        // console.log("objectToPost", objectToPost);

        fetch("https://hybridcal.dev.sunyempire.edu/node?_format=json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic Y29udGVudF9jcmVhdG9yQHN1bnllbXBpcmUuZWR1OlBhc3N3b3JkMTIzIQ==",
          },
          body: JSON.stringify(objectToPost),
        })
          .then((response) => {
            const data = response.json();
            return data;
          })
          .then((data) => {
            console.log("data from server form create event", data);
          });

        handleClose();
      }}
    >
      {() => (
        <Form className="modal-create-event-form ">
          <Field type="hidden" name="calendar_event" value="calendar_event" />
          <label className="modal-create-event-form-label">
            <p className="modal-create-event-form-title">Title</p>
            <Field type="text" id="title" name="title" />
          </label>
          <label className="modal-create-event-form-label">
            <p>Description</p>
            <Field type="text" id="description" name="field_description" />
          </label>
          <label className="modal-create-event-form-label">
            <p>Location</p>
            <Field type="text" id="location" name="field_location" />
          </label>
          <label className="modal-create-event-form-label">
            <p>Category</p>
            <Field className="modal-create-event-form-select" as="select" name="field_category">
              {categories.map((category) => (
                <option key={category.tid} value={category.tid}>
                  {category.name}
                </option>
              ))}
            </Field>
          </label>

          <div className="date-time-group">
            <label className="modal-create-event-form-label">
              <p>Start Date</p>
              <Field type="date" id="start-date" name="field_start_date" />
            </label>
            <label className="modal-create-event-form-label">
              <p>Time</p>
              <Field type="time" id="start-time" name="start-time" />
            </label>
          </div>
          <hr />
          <div className="date-time-group">
            <label className="modal-create-event-form-label">
              <p>End Date</p>
              <Field type="date" id="end-date" name="field_end_date" />
            </label>
            <label className="modal-create-event-form-label">
              <p>Time</p>
              <Field type="time" id="end-time" name="end-time" />
            </label>
          </div>
          <div>
            <Button classNames="modal-create-event-form-submit" type="submit">
              submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
