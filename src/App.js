import React from 'react';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

import Routes from './routes';

Modal.setAppElement('body');

class App extends React.Component {
  render() {
    return [
      <Routes key="route" />,
      <ToastContainer
        key="toast"
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
    ];
  }
}

App.propTypes = {};

export default App;
