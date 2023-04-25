import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextInput, TextAreaInput } from 'components/FormControl';

import { validateRequired, validateUrl } from 'helpers/validator';

const ShareForm = ({ form, handleSubmit, submitting }) => (
  <form className="modal-form" onSubmit={handleSubmit}>
    <Field
      component={TextInput}
      type="text"
      id={`${form}-title`}
      name="title"
      label="Title"
      placeholder="Input title"
    />
    <Field
      component={TextAreaInput}
      type="text"
      id={`${form}-desc`}
      name="desc"
      label="Description"
      placeholder="Input description"
    />
    <Field
      component={TextAreaInput}
      type="text"
      id={`${form}-videoUrl`}
      name="videoUrl"
      label="Youtube url"
      placeholder="Input youtube url"
    />
    <div className="d-flex flex-row-reverse">
      <button
        type="submit"
        className="btn btn-sm btn-success"
        disabled={submitting}
      >
        Share video
      </button>
    </div>
  </form>
);

ShareForm.propTypes = {
  form: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  validate: (values) => ({
    title: validateRequired(values.title),
    videoUrl: validateRequired(values.videoUrl) || validateUrl(values.videoUrl),
    desc: validateRequired(values.desc)
  })
})(ShareForm);
