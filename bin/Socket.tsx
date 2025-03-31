import { useEffect } from "react";
import { ISocket } from "./ISocket";
import { useSocket } from "./useSocket";

const Socket = ({ on, handle }: ISocket) => {
  const socket = useSocket();
  useEffect(() => {
    if (!socket) {
      console.error("Socket IO connection has not been established.");
      return;
    }

    socket.on(on, handle);

    return () => {
      socket.off(on, handle);
    };
  }, [socket]);
};

export default Socket;
