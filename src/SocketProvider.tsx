import { SocketContext, ISocketContext } from './SocketContext';
import { useContext, useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { setLogLevel, setLogger, logInfo, logError } from './utils/logger';
import { deepEqual } from './utils/commonFunctions';

export const useSocket = (): ISocketContext => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  uri: string;
  options?: Record<string, any>;
  children: React.ReactNode;
  onError?: (error: Error) => void;
  logLevel?: 'silent' | 'error' | 'warn' | 'info' | 'debug';
  logger?: {
    error?(message: string, ...args: any[]): void;
    warn?(message: string, ...args: any[]): void;
    info?(message: string, ...args: any[]): void;
    debug?(message: string, ...args: any[]): void;
  };
}

const SocketProvider = ({
  uri,
  options,
  children,
  onError,
  logLevel,
  logger,
}: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<ISocketContext['status']>('idle');
  const [error, setError] = useState<Error | null>(null);
  const prevUri = useRef<string>(uri);
  const prevOptions = useRef<Record<string, any>>(options || {});

  // Set up logging configuration
  useEffect(() => {
    if (logLevel) {
      setLogLevel(logLevel);
    }
    if (logger) {
      setLogger(logger);
    }
  }, [logLevel, logger]);

  useEffect(() => {
    // Check if uri or options have actually changed
    const uriChanged = prevUri.current !== uri;
    const optionsChanged = !deepEqual(prevOptions.current, options || {});

    // Only recreate socket if uri or options have changed
    if (uriChanged || optionsChanged) {
      // Set status to connecting
      setStatus('connecting');

      // Disconnect existing socket if present
      if (socket) {
        socket.disconnect();
      }

      const socketInstance = io(uri, { ...options });

      socketInstance.on('connect', () => {
        logInfo('socket:connected');
        setStatus('connected');
        setError(null); // Clear error on successful connection
      });

      socketInstance.on('disconnect', () => {
        logInfo('socket:disconnected');
        setStatus('disconnected');
      });

      socketInstance.on('connect_error', (err) => {
        logError('socket:connection_error', err);
        setStatus('error');
        setError(err);
        if (onError) {
          onError(err);
        }
      });

      setSocket(socketInstance);

      // Update refs
      prevUri.current = uri;
      prevOptions.current = options || {};

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [uri, options, socket, onError]);

  const contextValue: ISocketContext = {
    socket,
    status,
    error,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
