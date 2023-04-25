/* eslint-disable react/require-default-props */
/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { omit } from 'lodash';

const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  thousandsSeparatorSymbol: '',
  allowLeadingZeroes: true
});

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.input.value
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(e) {
    const { value } = e.target;
    const oldValue = this.state.value;

    await this.setState({ value });

    const { callback } = this.props;

    if (callback && value !== oldValue) {
      callback(value);
    }
  }

  handleNumberChange(event) {
    const { value } = event.target;
    const formattedValue = value.replace(/\D+/g, '');
    this.props.input.onChange(formattedValue);
  }

  componentDidUpdate(prevProps) {
    if (this.props.input.value !== prevProps.input.value) {
      this.updateInputValue();
    }
  }

  updateInputValue() {
    this.setState({
      value: this.props.input.value
    });
  }

  renderInput() {
    const { id, type, input, placeholder, readOnly } = this.props;

    if (type === 'number') {
      return (
        <MaskedInput
          id={id}
          value={this.state.value}
          placeholder={placeholder}
          className="form-control"
          onChange={this.handleNumberChange}
          mask={numberMask}
          type="text"
          readOnly={readOnly}
        />
      );
    }
    return (
      <input
        className="form-control"
        {...omit(this.props, 'callback', 'extendLabel')}
        {...input}
        onBlur={this.handleChange}
      />
    );
  }

  render() {
    const {
      id,
      label,
      meta: { touched, error }
    } = this.props;
    return (
      <div
        className={cx('form-group', {
          'has-error': touched && error,
          'has-success': touched && !error
        })}
      >
        {label && (
          <label htmlFor={id} className="control-label">
            {label}
          </label>
        )}
        {this.renderInput()}
        {touched && error && (
          <span className="form-text text-danger">{error}</span>
        )}
      </div>
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  callback: PropTypes.func
};

export default TextInput;
