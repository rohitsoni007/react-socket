export default Socket;
declare class Socket {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): boolean;
}
declare namespace Socket {
    export { SocketContext as contextType };
    export namespace propTypes {
        const on: any;
        const handle: any;
    }
}
import { SocketContext } from "./SocketContext";
