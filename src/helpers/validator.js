/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
export const validateRequired = (value) => {
  if (value === undefined || value === '' || value === null) {
    return 'Required';
  }
  if (value.trim() === '') {
    return 'Invalid';
  }
  return false;
};

export const validateMatch = (value, match, fieldName = '') => {
  if (value !== match) {
    return `${fieldName} not match`;
  }
  return false;
};

export const validateTextlength = (value, fieldName = '', min = 0) => {
  if (value === undefined || value === null) {
    return false;
  }
  if (value.length < min) {
    return `${fieldName} must have at least ${min} characters`;
  }
  return false;
};

export const validateEmail = (value) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!value.trim().match(emailRegex)) {
    return 'Invalid email format';
  }
};

export const validateUrl = (value) => {
  if (value) {
    const youtubeRegex =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

    if (!value.trim().match(youtubeRegex)) {
      return 'Invalid url format';
    }
  }
  return false;
};
