/* eslint-disable no-shadow */
/* eslint-disable default-param-last */
/* eslint-disable no-useless-catch */
import http from 'helpers/http';

const SHOW_ERROR = 'common/SHOW_ERROR';

export const initialState = {
  showError: false
};

export const fetchVideos = (params) => async () => {
  try {
    const result = await http.get('/video/list', { params });

    return result;
  } catch (err) {
    throw err;
  }
};

export const shareVideo = (values) => async () => {
  try {
    const result = await http.post('/video', values);

    return result;
  } catch (err) {
    throw err;
  }
};

export const like = (id) => async () => {
  try {
    const result = await http.put(`/users/like/${id}`);

    return result;
  } catch (err) {
    throw err;
  }
};

export const disLike = (id) => async () => {
  try {
    const result = await http.put(`/users/dislike/${id}`);

    return result;
  } catch (err) {
    throw err;
  }
};

export const showError = (showError) => ({
  type: SHOW_ERROR,
  payload: {
    showError
  }
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        showError: action.payload.showError
      };

    default:
      return state;
  }
};
