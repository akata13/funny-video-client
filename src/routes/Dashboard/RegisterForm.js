import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "components/FormControl";

import { validateRequired, validateMatch } from "helpers/validator";

const RegisterForm = ({ form, handleSubmit, submitting }) => (
  <form className="user" onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6">
        <Field
          component={TextInput}
          type="text"
          id={`${form}-last_name`}
          name="last_name"
          placeholder="Họ"
          className="au-input au-input--full"
        />
      </div>
      <div className="col-md-6">
        <Field
          component={TextInput}
          type="text"
          id={`${form}-first_name`}
          name="first_name"
          placeholder="Tên"
          className="au-input au-input--full"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <Field
          component={TextInput}
          type="email"
          id={`${form}-email`}
          name="email"
          placeholder="Email"
          className="au-input au-input--full"
        />
      </div>
      <div className="col-md-6">
        <Field
          component={TextInput}
          type="text"
          id={`${form}-phone`}
          name="phone"
          placeholder="SĐT"
          className="au-input au-input--full"
        />
      </div>
    </div>
    <Field
      component={TextInput}
      type="password"
      id={`${form}-password`}
      name="password"
      placeholder="Password"
      className="au-input au-input--full"
    />
    <Field
      component={TextInput}
      type="password"
      id={`${form}-confirm_password`}
      name="confirm_password"
      placeholder="Nhập lại password"
      className="au-input au-input--full"
    />
    <button
      type="submit"
      className="au-btn au-btn--block au-btn--green m-b-20"
      disabled={submitting}
    >
      Đăng ký
    </button>
  </form>
);

RegisterForm.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  validate: values => ({
    name: validateRequired(values.name),
    email: validateRequired(values.email),
    password: validateRequired(values.password),
    confirm_password:
      validateRequired(values.confirm_password) ||
      validateMatch(values.confirm_password, values.password),
  }),
})(RegisterForm);
