"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSocket = void 0;
const SocketContext_1 = require("./SocketContext");
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const useSocket = () => (0, react_1.useContext)(SocketContext_1.SocketContext);
exports.useSocket = useSocket;
const SocketProvider = ({ uri, options, children }) => {
    const [socket, setSocket] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const socketInstance = (0, socket_io_client_1.default)(uri, { ...options });
        socketInstance.on("connect", () => {
            console.log("socket:connected");
        });
        socketInstance.on("disconnect", () => {
            console.log("socket:disconnected");
        });
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, [uri, options]);
    return (<SocketContext_1.SocketContext.Provider value={socket}>{children}</SocketContext_1.SocketContext.Provider>);
};
exports.default = SocketProvider;
