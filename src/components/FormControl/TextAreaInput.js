import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class TextAreaInput extends React.Component {
  render() {
    const { id, label, input, meta: { touched, error } } = this.props;

    return (
      <div
        className={cx("form-group", {
          "has-error": touched && error,
          "has-success": touched && !error,
        })}
      >
        {label && (
          <label htmlFor={id} className="control-label">
            {label}
          </label>
        )}
        <textarea className="form-control" {...this.props} {...input} />
        {touched &&
          error && <span className="form-text text-danger">{error}</span>}
      </div>
    );
  }
}

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  label: PropTypes.string,
};

export default TextAreaInput;
