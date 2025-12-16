import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import SocketProvider from '../../src/SocketProvider';

// Extend Jest expect with jest-dom matchers
import '@testing-library/jest-dom';

describe('SocketProvider', () => {
  it('should render without crashing', () => {
    render(
      <SocketProvider uri="http://localhost:3000">
        <div>Test Child</div>
      </SocketProvider>
    );
    
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});