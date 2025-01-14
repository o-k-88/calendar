import React from "react";
import { Formik, Form, Field } from "formik";
import "./LoginForm.scss";

const LoginForm = ({ onLogin }) => {
  return (
    <div className="login-form-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values);
          onLogin();
        }}
      >
        <Form>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" id="email" />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" id="password" />
          </div>
          <button className="login-submit-btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
