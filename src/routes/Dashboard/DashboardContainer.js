import { connect } from 'react-redux';

import * as selectors from 'store/selectors';
import * as authActions from 'store/auth';
import * as actions from 'store/common';

import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
  currentUser: selectors.getCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
  login: (params) => dispatch(authActions.login(params)),
  register: (params) => dispatch(authActions.register(params)),
  logout: () => dispatch(authActions.logout()),
  fetchVideos: (params) => dispatch(actions.fetchVideos(params)),
  shareVideo: (params) => dispatch(actions.shareVideo(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
