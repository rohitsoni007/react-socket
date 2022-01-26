import SocketProvider from './SocketProvider';
import Socket from './Socket';
import useSocket from './useSocket';
import { SocketContext } from './SocketContext';

if (window) window.ReactSocketIO = { SocketProvider, Socket, useSocket, SocketContext };

export { SocketProvider, Socket, useSocket, SocketContext };
