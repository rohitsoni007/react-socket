import SocketProvider from './SocketProvider';
import Socket from './Socket';
import { SocketContext } from './SocketContext';

if (window) window.ReactSocketIO = { SocketProvider, Socket, SocketContext };

export { SocketProvider, Socket, SocketContext };
