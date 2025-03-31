import { Socket } from "socket.io-client";
import { ISocketProvider } from "./ISocketProvider";
export declare const useSocket: () => Socket | null;
declare const SocketProvider: ({ uri, options, children }: ISocketProvider) => import("react").JSX.Element;
export default SocketProvider;
