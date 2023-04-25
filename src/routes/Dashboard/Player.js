/* eslint-disable consistent-return */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
import React, { createRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/lazy';
import { remove } from 'lodash';
import screenfull from 'screenfull';

const Player = ({
  video,
  like,
  disLike,
  showLogin,
  currentUser = undefined
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const myRef = createRef(null);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleClickFullscreen = () => {
    screenfull.request(findDOMNode(myRef.current));
  };

  const handleLike = async () => {
    if (!currentUser) return showLogin();
    await like(video?._id);

    if (video.likes?.includes(currentUser.id)) {
      remove(video.likes, (data) => data === currentUser.id);
    } else {
      video.likes.push(currentUser.id);
    }

    forceUpdate();
  };

  const handleDisLike = async () => {
    if (!currentUser) return showLogin();
    await disLike(video?._id);

    if (video.dislikes?.includes(currentUser.id)) {
      remove(video.dislikes, (data) => data === currentUser.id);
    } else {
      video.dislikes.push(currentUser.id);
    }

    forceUpdate();
  };

  return (
    <div className="row pt-5">
      <div className="col player-wrapper mb-5">
        <ReactPlayer
          ref={myRef}
          url={video.videoUrl}
          className="react-player"
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          onPlay={handlePlay}
          onPause={handlePause}
        />
        <div className="d-flex justify-content-between align-items-center border border-secondary px-3 py-1">
          <div aria-hidden="true" onClick={handlePlayPause}>
            {playing ? (
              <i className="fa fa-pause fa-lg" />
            ) : (
              <i className="fa fa-play fa-lg" />
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
            />
            <i className="fa fa-volume-down fa-2x pl-2 pr-3" />
            <i
              className="fa fa fa-arrows-alt fa-lg"
              aria-hidden="true"
              onClick={handleClickFullscreen}
            />
          </div>
        </div>
      </div>
      <div className="info-container col">
        <h4>{video.title}</h4>
        <h6>Shared by: {video.userId}</h6>
        <div className="d-flex pb-1">
          <div aria-hidden="true" onClick={handleLike}>
            {video.likes?.length > 0 && video.likes?.length}
            {video.likes?.includes(currentUser?.id) ? (
              <i className="fa fa-thumbs-up fa-lg pl-2" />
            ) : (
              <i className="fa fa-thumbs-o-up fa-lg pl-2" />
            )}
          </div>
          <div aria-hidden="true" onClick={handleDisLike} className="pl-4">
            {video.dislikes?.length > 0 && video.dislikes?.length}
            {video.dislikes?.includes(currentUser?.id) ? (
              <i className="fa fa-thumbs-down fa-lg pl-2" />
            ) : (
              <i className="fa fa-thumbs-o-down fa-lg pl-2" />
            )}
          </div>
        </div>
        <p>Description:</p>
        <p>{video.desc}</p>
      </div>
    </div>
  );
};

Player.propTypes = {
  video: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  disLike: PropTypes.func.isRequired,
  showLogin: PropTypes.func.isRequired,
  currentUser: PropTypes.any
};

export default Player;
