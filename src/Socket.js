import React from 'react';
import PropTypes from 'prop-types';
import {SocketContext} from './SocketContext';
import {warning} from './utils';

class Socket extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {on, handle} = this.props;
    const socket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.on(on, handle);
  }

  componentWillUnmount() {
    const {on, handle} = this.props;
    const socket = this.context;

    if (!socket) {
      warning('Socket IO connection has not been established.');
      return;
    }

    socket.off(on, handle);
  }

  render() {
    return false;
  }
}

Socket.contextType = SocketContext;

Socket.propTypes = {
  on: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired
};

export default Socket;
