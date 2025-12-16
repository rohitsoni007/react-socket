# react-socket-client


React.js wrapper for [socket.io-client
](https://www.npmjs.com/package/socket.io-client) to fast implemention in react

For React 18, 19 and above & socket 4.8.1 and above

## Features

- Easy integration of Socket.IO with React applications
- Automatic connection management
- Connection status tracking (connecting, connected, disconnected, error)
- Configurable logging with custom log levels
- Utility hooks for common operations
- TypeScript support with generic types for event data
# Installation

```bash
npm install react-socket-client
```

# How to use

In app container file:

```js
import React from 'react';
import { SocketProvider } from 'react-socket-client';

const uri = 'http://localhost:3000';
const options = { 

};

export default function App() {
    
    return (
        <SocketProvider uri={uri}> 
            <App/>
        </SocketProvider>
    );
}
```

In app container file with options:

default options: 
reconnection: true
reconnectionAttempts: Infinity
reconnectionDelay: 1 * 1000
reconnectionDelayMax: 10 * 1000
autoConnect: true
transports: ['polling']
rejectUnauthorized: true 

as per offical documentation, visit [socket.io-client
](https://socket.io/docs/v4/client-initialization)

```js
import React from 'react';
import { SocketProvider } from 'react-socket-client';

const uri = 'http://localhost:3000';
const options = {};

export default function App() {
    
    return (
        <SocketProvider uri={uri} options={options}> 
            <App/>
        </SocketProvider>
    );
}
```

In other files:

```js
import React from 'react';
import { Socket } from 'react-socket-client';

export default function MyComponent() {

    const handleConnect = (data) => {
        console.log('socket connected', data);
    }
    const handleDisconnect = (data) => {
        console.log('socket disconnected');
    }

    return (
        <div>
            <Socket on='connect' handle={handleConnect} />
            <Socket on='disconnect' handle={handleDisconnect} />
        </div>
    );
}

```
## New Utility Hooks

### useSocketEmit

```js
import React from 'react';
import { useSocketEmit } from 'react-socket-client';

export default function MyComponent() {
    const emit = useSocketEmit();
    
    const handleClick = (e) => {
        emit('chat message', 'hello there');
    }

    return (
        <div>
            <button onClick={handleClick} type="button">Click Me!</button>
        </div>
    );
}
```

### useSocketListener

```js
import React from 'react';
import { useSocketListener } from 'react-socket-client';

export default function MyComponent() {
    useSocketListener('connect', (data) => {
        console.log('socket connected', data);
    });
    
    useSocketListener('disconnect', (data) => {
        console.log('socket disconnected');
    });

    return <div>Listening for socket events...</div>;
}
```

### useSocketStatus

```js
import React from 'react';
import { useSocketStatus } from 'react-socket-client';

export default function MyComponent() {
    const { status, error } = useSocketStatus();
    
    return (
        <div>
            <p>Connection Status: {status}</p>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
```

## Enhanced useSocket Hook

The enhanced `useSocket` hook now returns connection status and error information:

```js
import React from 'react';
import { useSocket } from 'react-socket-client';

export default function MyComponent() {
    const { socket, status, error } = useSocket();
    
    useEffect(() => {
        if (socket) {
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
        }
    }, [socket]);
    
    const handleConnect = (data) => {
        console.log('socket connected', data);
    }
    
    const handleDisconnect = (data) => {
        console.log('socket disconnected');
    }

    const handleClick = (e) => {
        if (socket) {
            socket.emit('chat message', 'hello there');
        }
    }

    return (
        <div>
            <p>Connection Status: {status}</p>
            {error && <p>Error: {error.message}</p>}
            <button onClick={handleClick} type="button">Click Me!</button>
        </div>
    );
}
```

## Configurable Logging

You can configure logging levels and provide a custom logger:

```js
import React from 'react';
import { SocketProvider } from 'react-socket-client';

const customLogger = {
    error: (message, ...args) => console.error('[Custom Logger]', message, ...args),
    warn: (message, ...args) => console.warn('[Custom Logger]', message, ...args),
    info: (message, ...args) => console.info('[Custom Logger]', message, ...args),
    debug: (message, ...args) => console.debug('[Custom Logger]', message, ...args),
};

export default function App() {
    return (
        <SocketProvider 
            uri="http://localhost:3000"
            logLevel="debug"
            logger={customLogger}
        > 
            <App/>
        </SocketProvider>
    );
}
```

## Generic Types for Event Data

The `Socket` component and related types now support generic parameters for type-safe event data:

```js
import React from 'react';
import { Socket } from 'react-socket-client';

export default function MyComponent() {
    // Type-safe event handler
    const handleMessage = (data: { userId: string; message: string }) => {
        console.log(`Message from ${data.userId}: ${data.message}`);
    }

    return (
        <div>
            <Socket on='chat-message' handle={handleMessage} />
        </div>
    );
}
```

## Error Handling

The SocketProvider now includes built-in error handling:

```js
import React from 'react';
import { SocketProvider } from 'react-socket-client';

export default function App() {
    const handleError = (error) => {
        console.error('Socket connection error:', error);
        // Handle error appropriately in your UI
    };
    
    return (
        <SocketProvider 
            uri="http://localhost:3000"
            onError={handleError}
        > 
            <App/>
        </SocketProvider>
    );
}
```

or
```js
import React from 'react';
import { useSocket } from 'react-socket-client';

export default function MyComponent() {
    const { socket, status, error } = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('connect', handleConnect);
            socket.on('disconnect', handleDisconnect);
        }
    }, [socket])
    
    const handleConnect = (data) => {
        console.log('socket connected', data);
    }
    const handleDisconnect = (data) => {
        console.log('socket disconnected');
    }

    const handleClick = (e) => {
        if (socket) {
            socket.emit('chat message', 'hello there');
        }
    }

    return (
        <div>
            <p>Connection Status: {status}</p>
            {error && <p>Error: {error.message}</p>}
            <button onClick={handleClick} type="button">Click Me!</button>
        </div>
    );
}

```