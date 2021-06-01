import styled, { keyframes, css } from 'styled-components';

const appearAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

export const HeadingMain = styled.h1`
  font-size: 120px;
  margin: 20px;
  animation: ${appearAnimation} 0.4s ease-in-out;
`;

export const ButtonStart = styled.button`
  margin: 4px;
  background-color: #635e5e99;
  color: transparent;
  padding: 0 16px;
  font-size: 44px;
  position: relative;
  border-radius: 10px;

  :hover {
    background-color: #635e5eb3;

    ::after {
      background-color: #ee5d6cb3;
      color: #282856b3;
      transform: translate3d(-2px, 2px, 0);
    }
  }

  ::after {
    ${({ content }) => content && `content: "${content}";`}
    transition: background 0.2s ease-in-out, transform 0.2s ease-in-out, color 0.2s ease-in-out;
    position: absolute;
    background-color: #ee5d6c99;
    color: #28285699;
    width: 100%;
    height: 100%;
    bottom: 6px;
    left: 6px;
    border-radius: 10px;
  }
`;

export const DisplayContainer = styled.div`
  animation: ${appearAnimation} 0.8s ease-in-out;
  flex-basis: 60%;
`;

export const Outcome = styled.div`
  color: white;
  text-align: center;
  border-radius: 50px;
  padding: 10px;
  font-size: 60px;
  height: 80px;
  animation: ${appearAnimation} 0.4s ease-in-out;
`;

export const PlayerName = styled.h3`
  margin: 0 0 0 6px;
`;

export const PlayerCard = styled.div`
  text-align: center;
  border-radius: 40px;
  margin-top: -1px;
  margin-bottom: 5px;
  width: 140px;
  background-color: #ffffff;
  padding: 6px 14px 6px 14px;
  height: 48px;
  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:nth-child(odd) {
    margin-right: 1px;
  }

  ${({ hasAnswered }) => hasAnswered && `background-color: #ee5d6c99;`}
`;

export const PlayerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  padding-left: 0;
  align-self: center;
  height: calc(100vh - 44px);
  flex-basis: 20%;
`;

export const Players = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const PlayerNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ee5d6c;
  color: #ffffff;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  font-size: 22px;
  line-height: 22px;
`;

export const PlayerTags = styled.div`
  min-height: 20px;
  margin-bottom: -10px;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const PlayerTag = styled.button`
  border-radius: 10px;
  position: relative;
`;

export const Text = styled.p`
  font-size: 50px;
  margin: 18px;
  max-width: 640px;
`;

export const TextAlt = styled.p`
  font-size: 24px;
  margin: 18px;
  max-width: 640px;
`;

export const PromptContainer = styled.div`
  animation: ${appearAnimation} 0.8s ease-in-out;
`;

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 20%;
  height: calc(100vh - 44px);
`;

export const CounterList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff96;
  border-radius: 30px;
  padding: 4px 36px;
  min-height: 10px;

  ${({ hidden }) => hidden && 'background-color: transparent;'}
`;

export const Counter = styled.div`
  font-size: 36px;
  animation: ${appearAnimation} 0.8s ease-in-out;
  text-transform: uppercase;
`;

export const WaitingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const RoomCode = styled.h3`
  font-family: 'Annie';
  color: #282856;
  font-size: 54px;
  margin: 0;
`;

export const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff80;
  padding: 30px 100px;
  border-radius: 30px;

  h1 {
    font-size: 200px !important;
  }
`;

export const AnswersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`;

export const AnswerTagContainer = styled.div`
  padding: 8px 2px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid #ee5d6c;
  background-color: white;
`;

export const AnswerTagValue = styled.h2`
  font-size: 34px;
  color: #ee5d6c;
  margin-top: 0;
  margin-bottom: 0;
`;

const modalScaleAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const AnswerTagContainerAbsolute = styled.div`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  width: 600px;

  position: absolute;
  top: 50%;
  left: 50%;

  ${({ disappearsIn }) =>
    disappearsIn &&
    css`
      animation: ${modalScaleAnimation} 0.4s ease-in-out both,
        ${modalScaleAnimation} 0.4s ${disappearsIn}ms ease-in-out reverse
          forwards;
    `}
`;

export const AnswerTagPlayersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
  border-top: 2px solid #e5e5e5;
`;

export const AnswerTagPlayerTag = styled.div`
  font-size: 34px;
  padding: 8px 24px;
  border-radius: 10px;
  background-color: #ee5d6c;
  color: white;
  margin: 5px;

  ${({ delay }) =>
    delay &&
    css`
      animation: ${appearAnimation} 0.5s ${delay}ms ease-in-out;
      animation-fill-mode: both;
    `}
`;

export const AnswerTagPointsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const AnswerTagPoint = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ee5d6c;
`;
