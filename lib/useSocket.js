"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = useSocket;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SocketContext = require("./SocketContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useSocket() {
    var socket = (0, _react.useContext)(_SocketContext.SocketContext);
    return {
        socket: socket
    };
}