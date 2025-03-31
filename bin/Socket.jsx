"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useSocket_1 = require("./useSocket");
const Socket = ({ on, handle }) => {
    const socket = (0, useSocket_1.useSocket)();
    (0, react_1.useEffect)(() => {
        if (!socket) {
            console.error("Socket IO connection has not been established.");
            return;
        }
        socket.on(on, handle);
        return () => {
            socket.off(on, handle);
        };
    }, [socket]);
};
exports.default = Socket;
