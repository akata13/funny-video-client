import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from 'components/FormControl';

import { validateRequired, validateEmail } from 'helpers/validator';

export const UnconnectedLoginForm = ({
  form,
  handleSubmit,
  submitting,
  showRegister
}) => (
  <form className="modal-form" onSubmit={handleSubmit}>
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
    <div className="d-flex justify-content-between">
      <button
        type="submit"
        className="btn btn-sm btn-success"
        disabled={submitting}
      >
        Login
      </button>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        disabled={submitting}
        onClick={showRegister}
      >
        Register
      </button>
    </div>
  </form>
);

export const LoginForm = reduxForm({
  validate: (values) => ({
    email: validateRequired(values.email) || validateEmail(values.email),
    password: validateRequired(values.password)
  })
})(UnconnectedLoginForm);

UnconnectedLoginForm.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  showRegister: PropTypes.func.isRequired
};
