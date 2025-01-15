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
        // console.log(values);
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
        <Form>
          <Field type="hidden" name="calendar_event" value="calendar_event" />
          <label>
            <p>Title</p>
            <Field type="text" id="title" name="title" />
          </label>
          <label>
            <p>Description</p>
            <Field type="text" id="description" name="field_description" />
          </label>
          <label>
            <p>Location</p>
            <Field type="text" id="location" name="field_location" />
          </label>
          <label>
            <p>Category</p>
            <Field as="select" name="field_category">
              {categories.map((category) => (
                <option key={category.tid} value={category.tid}>
                  {category.name}
                </option>
              ))}
            </Field>
          </label>

          <div className="date-time-group">
            <label>
              <p>Start Date</p>
              <Field type="date" id="start-date" name="field_start_date" />
            </label>
            <label>
              <p>Time</p>
              <Field type="time" id="start-time" name="start-time" />
            </label>
          </div>
          <hr />
          <div className="date-time-group">
            <label>
              <p>End Date</p>
              <Field type="date" id="end-date" name="field_end_date" />
            </label>
            <label>
              <p>Time</p>
              <Field type="time" id="end-time" name="end-time" />
            </label>
          </div>
          <div>
            <Button type="submit">submit</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
