import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextInput } from 'components/FormControl';

import { validateRequired, validateEmail } from 'helpers/validator';

const LoginForm = ({ form, handleSubmit, submitting }) => (
  <form className="user" onSubmit={handleSubmit}>
    <Field
      component={TextInput}
      type="text"
      id={`${form}-email`}
      name="email"
      label="email"
      className="au-input au-input--full"
    />
    <Field
      component={TextInput}
      type="password"
      id={`${form}-password`}
      name="password"
      label="Password"
      className="au-input au-input--full"
    />
    <button
      type="submit"
      className="au-btn au-btn--block au-btn--green m-b-20"
      disabled={submitting}
    >
      Login
    </button>
  </form>
);

LoginForm.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  validate: (values) => ({
    email: validateRequired(values.email) || validateEmail(values.email),
    password: validateRequired(values.password)
  })
})(LoginForm);
