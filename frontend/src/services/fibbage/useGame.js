import { useContext } from "react";
import { FibbageContext } from "./index";

const useGame = () => {
  const {
    state: { gameStart, gameEnd },
    startGame,
  } = useContext(FibbageContext);

  return {
    gameStart,
    gameEnd,
    startGame,
  };
};

export default useGame;
