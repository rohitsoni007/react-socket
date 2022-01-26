'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SocketContext = require('./SocketContext');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Socket = function (_React$Component) {
  (0, _inherits3.default)(Socket, _React$Component);

  function Socket(props) {
    (0, _classCallCheck3.default)(this, Socket);
    return (0, _possibleConstructorReturn3.default)(this, (Socket.__proto__ || (0, _getPrototypeOf2.default)(Socket)).call(this, props));
  }

  (0, _createClass3.default)(Socket, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          on = _props.on,
          handle = _props.handle;

      var socket = this.context;

      if (!socket) {
        (0, _utils.warning)('Socket IO connection has not been established.');
        return;
      }

      socket.on(on, handle);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props2 = this.props,
          on = _props2.on,
          handle = _props2.handle;

      var socket = this.context;

      if (!socket) {
        (0, _utils.warning)('Socket IO connection has not been established.');
        return;
      }

      socket.off(on, handle);
    }
  }, {
    key: 'render',
    value: function render() {
      return false;
    }
  }]);
  return Socket;
}(_react2.default.Component);

Socket.contextType = _SocketContext.SocketContext;

Socket.propTypes = {
  on: _propTypes2.default.string.isRequired,
  handle: _propTypes2.default.func.isRequired
};

exports.default = Socket;