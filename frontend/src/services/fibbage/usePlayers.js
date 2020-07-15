import { useContext } from "react";
import { FibbageContext } from "./index";

const usePlayers = () => {
  const {
    state: { players },
  } = useContext(FibbageContext);

  return players;
};

export default usePlayers;
