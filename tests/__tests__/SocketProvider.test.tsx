import React from 'react';
import { render } from '@testing-library/react';
import SocketProvider from '../../src/SocketProvider';

describe('SocketProvider', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <SocketProvider uri="http://localhost:3000">
        <div>Test Child</div>
      </SocketProvider>
    );
    
    expect(getByText('Test Child')).toBeInTheDocument();
  });
});