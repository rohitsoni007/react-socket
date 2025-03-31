# @rjui/react-socket


React.js wrapper for the socket.io to fast implemention in react

For React 19.1.0 and above & socket 4.8.1 and above
# Installation

```bash
npm install @rjui/react-socket --save-dev
```

# How to use

In app container file:

```js
import React from 'react';
import { SocketProvider } from '@rjui/react-socket';

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

```js
import React from 'react';
import { SocketProvider } from '@rjui/react-socket';

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
import { Socket } from '@rjui/react-socket';

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
or
```js
import React from 'react';
import { useSocket } from '@rjui/react-socket';

export default function MyComponent() {

    const socket = useSocket();

    useEffect(() => {
        socket.on('connect', handleConnect)
        socket.on('disconnect', handleConnect)
    },[socket])
    
    const handleConnect = (data) => {
        console.log('socket connected', data);
    }
    const handleDisconnect = (data) => {
        console.log('socket disconnected');
    }

    const handleClick = (e) => {
        socket.emit('chat message', 'hello their');
    }

    return (
        <div>
            <button onClick={handleClick} type="button">Click Me!</button>
        </div>
    );
}

```