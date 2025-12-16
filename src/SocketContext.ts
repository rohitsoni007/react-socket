import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketStatus =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'error';

export interface ISocketContext {
  socket: Socket | null;
  status: SocketStatus;
  error: Error | null;
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  status: 'idle',
  error: null,
});
