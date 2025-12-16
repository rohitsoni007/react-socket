import { SocketContext, ISocketContext } from '../../src/SocketContext';

describe('SocketContext', () => {
  it('should be defined', () => {
    expect(SocketContext).toBeDefined();
  });

  it('should have correct type definitions', () => {
    const statuses: ISocketContext['status'][] = [
      'idle',
      'connecting',
      'connected',
      'disconnected',
      'error'
    ];

    expect(statuses).toHaveLength(5);
  });
});