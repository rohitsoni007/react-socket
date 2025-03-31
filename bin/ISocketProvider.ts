import { ReactNode } from "react";
import { SocketOptions } from "socket.io-client";

export type ISocketProvider = {
  uri: string;
  options: SocketOptions;
  children: ReactNode;
};
