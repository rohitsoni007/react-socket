import { SocketContext } from "./SocketContext";
import { useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { ISocketProvider } from "./ISocketProvider";

export const useSocket = (): Socket | null => useContext(SocketContext);

const SocketProvider = ({ uri, options, children }: ISocketProvider) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(uri, { ...options });

    socketInstance.on("connect", () => {
      console.log("socket:connected");
    });
    socketInstance.on("disconnect", () => {
      console.log("socket:disconnected");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [uri, options]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
