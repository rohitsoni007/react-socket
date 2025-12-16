import { useEffect } from 'react';
import { useSocket } from './SocketProvider';

interface SocketProps<T = any> {
  on: string;
  handle: (data: T) => void;
}

const Socket = <T,>({ on, handle }: SocketProps<T>) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) {
      console.error('Socket IO connection has not been established.');
      return;
    }

    socket.on(on, handle);

    return () => {
      socket.off(on, handle);
    };
  }, [socket, on, handle]);
};

export default Socket;
