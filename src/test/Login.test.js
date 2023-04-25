import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
import { createStore, Store, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer, reduxForm } from 'redux-form';
import { render, screen } from '@testing-library/react';

import { UnconnectedLoginForm } from 'components/LoginForm';

const ReduxFormComponent = reduxForm({
  form: 'LoginForm'
})(UnconnectedLoginForm);

const rootReducer = combineReducers({
  form: formReducer
});

let store;

describe('LoginForm testing', () => {
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it('should render username and password fields and buttons', () => {
    render(
      <Provider store={store}>
        <ReduxFormComponent />
      </Provider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Register' })
    ).toBeInTheDocument();
  });

  it('should render initial values', () => {
    const onSubmit = jest.fn();

    render(
      <Provider store={store}>
        <ReduxFormComponent
          onSubmit={onSubmit}
          initialValues={{ email: 'admin@test.cn', password: '123qwe' }}
        />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/Input email/i)).toHaveValue(
      'admin@test.cn'
    );
    expect(screen.getByPlaceholderText(/Input password/i)).toHaveValue(
      '123qwe'
    );
  });
});
