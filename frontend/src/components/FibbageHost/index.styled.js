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

export const PlayerListContainer = styled.div`
  margin: 20px 20px 20px 0;
  align-self: center;
  height: calc(100vh - 44px);
  flex-basis: 20%;
`;

export const PlayerWrapper = styled.div`
  border-radius: 40px;
  margin-bottom: 5px;
  background-color: #ffffff;
  padding: 6px 14px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  ${({ hasAnswered }) =>
    hasAnswered &&
    css`
      background-color: #ee5d6c99;
    `}
`;

export const PlayerIndex = styled.div`
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

export const PlayerInfoWrapper = styled.div`
  margin-left: 6px;

  & > * {
    text-align: left;
  }
`;

export const PlayerScore = styled.button`
  border-radius: 10px;
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

export const NotStartedContainer = styled.div`
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
    css`
      animation: ${appearAnimation} 0.5s ${delay}ms ease-in-out both;
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

const flyInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const GameOverPlayerResultsWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const GameOverPlayerResult = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 2px solid #ee5d6c;

  &:not(:first-child) {
    margin-bottom: 5px;
  }

  &:last-child {
    border-color: #f0b747;
  }

  ${({ delay }) =>
    css`
      animation: ${flyInAnimation} 0.5s ${delay}ms ease-in-out both;
    `}
`;
