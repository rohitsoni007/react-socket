import { useContext } from "react";
import { SocketContext } from "./SocketContext";
import { Socket } from "socket.io-client";

export const useSocket = (): Socket | null => useContext(SocketContext);
