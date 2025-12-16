import { useCallback, useEffect, useRef } from 'react';
import { useSocket } from './SocketProvider';

/**
 * Hook to emit socket events
 * @returns A function to emit socket events
 */
export const useSocketEmit = () => {
  const { socket } = useSocket();

  const emit = useCallback(
    <T = any>(event: string, data?: T) => {
      if (!socket) {
        console.error('Socket IO connection has not been established.');
        return;
      }

      socket.emit(event, data);
    },
    [socket]
  );

  return emit;
};

/**
 * Hook to listen to socket events
 * @param event The event name to listen to
 * @param handler The handler function to call when the event is received
 */
export const useSocketListener = <T = any>(
  event: string,
  handler: (data: T) => void
) => {
  const { socket } = useSocket();

  // Store the latest handler in a ref to ensure we always use the latest version
  // without having to re-subscribe to the event
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!socket) {
      console.error('Socket IO connection has not been established.');
      return;
    }

    const wrappedHandler = (data: T) => {
      handlerRef.current(data);
    };

    socket.on(event, wrappedHandler);

    return () => {
      socket.off(event, wrappedHandler);
    };
  }, [socket, event]);
};

/**
 * Hook to get socket connection status
 * @returns The current socket connection status
 */
export const useSocketStatus = () => {
  const { status, error } = useSocket();
  return { status, error };
};
