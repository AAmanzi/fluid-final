import styled, { keyframes } from 'styled-components';

const appearAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Screen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
`;

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const PromptContainer = styled.div`
  animation: ${appearAnimation} 0.8s ease-in-out;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text = styled.p`
  font-size: 50px;
  margin: 18px;
  max-width: 640px;
`;
