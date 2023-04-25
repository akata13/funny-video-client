import { connect } from 'react-redux';

import * as actions from 'store/common';

import Player from './Player';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  like: (id) => dispatch(actions.like(id)),
  disLike: (id) => dispatch(actions.disLike(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
