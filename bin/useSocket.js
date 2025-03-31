"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = void 0;
const react_1 = require("react");
const SocketContext_1 = require("./SocketContext");
const useSocket = () => (0, react_1.useContext)(SocketContext_1.SocketContext);
exports.useSocket = useSocket;
