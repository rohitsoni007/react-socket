export default SocketProvider;
declare class SocketProvider {
    constructor(props: any);
    socket: import("socket.io-client").Socket<import("@socket.io/component-emitter").DefaultEventsMap, import("@socket.io/component-emitter").DefaultEventsMap>;
    mergeOptions(options?: {}): {
        reconnection: boolean;
        reconnectionAttempts: number;
        reconnectionDelay: number;
        reconnectionDelayMax: number;
        autoConnect: boolean;
        transports: string[];
        rejectUnauthorized: boolean;
    };
    render(): any;
}
declare namespace SocketProvider {
    namespace propTypes {
        const options: any;
        const uri: any;
        const children: any;
    }
}
