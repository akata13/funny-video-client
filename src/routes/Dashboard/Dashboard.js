/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { map } from 'lodash';

import { LoginForm } from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import ShareForm from 'components/ShareForm';
import Player from './PlayerContainer';

const Dashboard = ({
  login,
  register,
  logout,
  shareVideo,
  fetchVideos,
  currentUser = undefined
}) => {
  const [videos, setVideos] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formRegisterOpen, setFormRegisterOpen] = useState(false);
  const [formShareOpen, setFormShareOpen] = useState(false);

  const getVideos = async () => {
    const res = await fetchVideos();
    setVideos(res.results);
  };

  useEffect(() => {
    getVideos();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleLogin = async (values) => {
    const result = await login(values);

    if (result) {
      closeForm();
    }
  };

  const handleRegister = async (values) => {
    const result = await register(values);

    if (result) {
      toast.success('Your account has been successfully created');
      setFormRegisterOpen(false);
    }
  };

  const handleShare = async (values) => {
    const result = await shareVideo(values);

    if (result) {
      toast.success('Your video has been shared');
      getVideos();
      setFormRegisterOpen(false);
    }
  };

  const showLogin = () => {
    toast.error('Your must login to do this action!');
    setFormOpen(true);
  };

  return (
    <div className="container pt-2">
      <div className="d-flex justify-content-between border-bottom border-secondary">
        <h2>Funny videos</h2>
        <div className="d-flex justify-content-end align-items-center">
          {currentUser ? (
            <>
              <span>Welcome: {currentUser?.email}</span>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mx-2"
                onClick={() => setFormShareOpen(true)}
              >
                Share a video
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setFormOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <div className="container list-video">
        {map(videos, (video) => (
          <Player
            video={video}
            key={video._id}
            currentUser={currentUser}
            showLogin={showLogin}
          />
        ))}
      </div>

      <Modal
        isOpen={formOpen}
        onRequestClose={closeForm}
        className="modal-dialog modal-sm"
        overlayClassName="modal show"
        bodyOpenClassName="modal-open"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close" onClick={closeForm}>
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <LoginForm
              form="login-form"
              onSubmit={handleLogin}
              showRegister={() => setFormRegisterOpen(true)}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={formRegisterOpen}
        onRequestClose={() => setFormRegisterOpen(false)}
        className="modal-dialog modal-sm"
        overlayClassName="modal show"
        bodyOpenClassName="modal-open"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
            <button
              type="button"
              className="close"
              onClick={() => setFormRegisterOpen(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <RegisterForm form="register-form" onSubmit={handleRegister} />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={formShareOpen}
        onRequestClose={() => setFormShareOpen(false)}
        className="modal-dialog modal-lg"
        overlayClassName="modal show"
        bodyOpenClassName="modal-open"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Share video</h5>
            <button
              type="button"
              className="close"
              onClick={() => setFormShareOpen(false)}
            >
              <span>×</span>
            </button>
          </div>
          <div className="modal-body">
            <ShareForm form="share-form" onSubmit={handleShare} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

Dashboard.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  currentUser: PropTypes.any,
  shareVideo: PropTypes.func.isRequired,
  fetchVideos: PropTypes.func.isRequired
};

export default Dashboard;
