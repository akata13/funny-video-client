import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from 'components/FormControl';

import {
  validateRequired,
  validateEmail,
  validateTextlength,
  validateMatch
} from 'helpers/validator';

const RegisterForm = ({ form, handleSubmit, submitting }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <Field
      component={TextInput}
      type="text"
      id={`${form}-name`}
      name="name"
      label="Name"
      placeholder="Input name"
    />
    <Field
      component={TextInput}
      type="text"
      id={`${form}-email`}
      name="email"
      label="Email"
      placeholder="Input email"
    />
    <Field
      component={TextInput}
      type="password"
      id={`${form}-password`}
      name="password"
      label="Password"
      placeholder="Input password"
    />
    <Field
      component={TextInput}
      type="password"
      id={`${form}-password_confirm`}
      name="password_confirm"
      label="Confirm password"
      placeholder="Input password"
    />
    <div className="d-flex flex-row-reverse">
      <button
        type="submit"
        className="btn btn-sm btn-success"
        disabled={submitting}
      >
        Register
      </button>
    </div>
  </form>
);

RegisterForm.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  validate: (values) => ({
    name: validateRequired(values.name),
    email: validateRequired(values.email) || validateEmail(values.email),
    password:
      validateRequired(values.password) ||
      validateTextlength(values.password, 'password', 6),
    password_confirm:
      validateRequired(values.password_confirm) ||
      validateTextlength(values.password_confirm, 'password', 6) ||
      validateMatch(values.password, values.password_confirm, 'Password')
  })
})(RegisterForm);
