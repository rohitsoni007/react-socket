import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSocketEmit, useSocketListener, useSocketStatus } from '../../src/utilityHooks';
import { SocketContext } from '../../src/SocketContext';

// Create mock socket with proper Socket interface
const mockSocket: any = {
  on: jest.fn(),
  off: jest.fn(),
  emit: jest.fn(),
  disconnect: jest.fn(),
  connect: jest.fn(),
  connected: true,
  // Add other required properties to satisfy the Socket interface
  io: {},
  id: 'test-id',
  _pid: 'test-pid',
  _lastOffset: 'test-offset',
  // Add more properties as needed to satisfy TypeScript
  close: jest.fn(),
  open: jest.fn(),
  send: jest.fn(),
  timeout: jest.fn(),
  compress: jest.fn(),
  binary: jest.fn(),
  volatile: {},
};

// Mock socket.io-client
jest.mock('socket.io-client', () => ({
  __esModule: true,
  default: () => mockSocket
}));

// Create a wrapper for the hooks to provide context
const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SocketContext.Provider
    value={{
      socket: mockSocket,
      status: 'connected',
      error: null,
    }}
  >
    {children}
  </SocketContext.Provider>
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('useSocketEmit', () => {
  it('should emit events through the socket', () => {
    const { result } = renderHook(() => useSocketEmit(), { wrapper });

    act(() => {
      result.current('test-event', { message: 'hello' });
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('test-event', { message: 'hello' });
  });

  it('should log error when socket is not available', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const { result } = renderHook(() => useSocketEmit(), {
      wrapper: ({ children }) => (
        <SocketContext.Provider
          value={{
            socket: null,
            status: 'idle',
            error: null,
          }}
        >
          {children}
        </SocketContext.Provider>
      ),
    });

    act(() => {
      result.current('test-event');
    });

    expect(errorSpy).toHaveBeenCalledWith('Socket IO connection has not been established.');
    errorSpy.mockRestore();
  });
});

describe('useSocketListener', () => {
  it('should subscribe to socket events', () => {
    const handler = jest.fn();
    
    renderHook(() => useSocketListener('test-event', handler), { wrapper });

    expect(mockSocket.on).toHaveBeenCalledWith('test-event', expect.any(Function));
  });

  it('should unsubscribe from socket events on cleanup', () => {
    const handler = jest.fn();
    
    const { unmount } = renderHook(() => useSocketListener('test-event', handler), { wrapper });
    
    unmount();

    expect(mockSocket.off).toHaveBeenCalledWith('test-event', expect.any(Function));
  });

  it('should call handler when event is received', () => {
    const handler = jest.fn();
    const testData = { message: 'test data' };
    
    renderHook(() => useSocketListener('test-event', handler), { wrapper });

    // Call the handler directly
    const callIndex = mockSocket.on.mock.calls.findIndex((call: any[]) => call[0] === 'test-event');
    if (callIndex !== -1) {
      const handlerFn = mockSocket.on.mock.calls[callIndex][1];
      act(() => {
        handlerFn(testData);
      });
    }

    expect(handler).toHaveBeenCalledWith(testData);
  });

  it('should log error when socket is not available', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const handler = jest.fn();
    
    renderHook(() => useSocketListener('test-event', handler), {
      wrapper: ({ children }) => (
        <SocketContext.Provider
          value={{
            socket: null,
            status: 'idle',
            error: null,
          }}
        >
          {children}
        </SocketContext.Provider>
      ),
    });

    expect(errorSpy).toHaveBeenCalledWith('Socket IO connection has not been established.');
    errorSpy.mockRestore();
  });
});

describe('useSocketStatus', () => {
  it('should return current socket status', () => {
    const { result } = renderHook(() => useSocketStatus(), { wrapper });

    expect(result.current).toEqual({
      status: 'connected',
      error: null,
    });
  });

  it('should return error when present', () => {
    const error = new Error('Connection error');
    
    const { result } = renderHook(() => useSocketStatus(), {
      wrapper: ({ children }) => (
        <SocketContext.Provider
          value={{
            socket: mockSocket,
            status: 'error',
            error,
          }}
        >
          {children}
        </SocketContext.Provider>
      ),
    });

    expect(result.current).toEqual({
      status: 'error',
      error,
    });
  });
});