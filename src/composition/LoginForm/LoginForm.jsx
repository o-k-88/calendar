import React from "react";
import { Formik, Form, Field } from "formik";
import "./LoginForm.scss";

const LoginForm = ({ onLogin }) => {
  return (
    <div className="login-form-container">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          onLogin();
        }}
      >
        <Form>
          <div className="login-form-group">
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <Field className="login-input" type="email" name="email" id="email" />
          </div>
          <div className="login-form-group">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <Field className="login-input" type="password" name="password" id="password" />
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
