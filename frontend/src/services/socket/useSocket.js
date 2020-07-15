import { useContext } from "react";
import { SocketContext } from "./index";

const useSocket = () => {
  const {
    state: { socket },
  } = useContext(SocketContext);

  return socket;
};

export default useSocket;
