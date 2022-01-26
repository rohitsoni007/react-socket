'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketContext = exports.useSocket = exports.Socket = exports.SocketProvider = undefined;

var _SocketProvider = require('./SocketProvider');

var _SocketProvider2 = _interopRequireDefault(_SocketProvider);

var _Socket = require('./Socket');

var _Socket2 = _interopRequireDefault(_Socket);

var _useSocket = require('./useSocket');

var _useSocket2 = _interopRequireDefault(_useSocket);

var _SocketContext = require('./SocketContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (window) window.ReactSocketIO = { SocketProvider: _SocketProvider2.default, Socket: _Socket2.default, useSocket: _useSocket2.default, SocketContext: _SocketContext.SocketContext };

exports.SocketProvider = _SocketProvider2.default;
exports.Socket = _Socket2.default;
exports.useSocket = _useSocket2.default;
exports.SocketContext = _SocketContext.SocketContext;