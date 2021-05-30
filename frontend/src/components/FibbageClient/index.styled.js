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

export const Button = styled.button`
  border-radius: 30px;
  font-size: 64px;
  margin-top: 12px;
  margin-bottom: 12px;
  min-width: 140px;
`;

export const ButtonAnswer = styled.button`
  border-radius: 30px;
  font-size: 64px;
  margin-top: 12px;
  margin-bottom: 12px;
  text-transform: uppercase;
  border: 2px solid #ffffff;
  transition: border 0.2s ease-in-out;

  ${({ isSelected }) => isSelected && 'border: 2px solid #ee5d6c;'};
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

export const Input = styled.input`
  box-shadow: -6px 6px 0px 0px rgba(99, 94, 94, 1);
  padding: 4px 16px;
  font-size: 34px;
  border: none;
  border-radius: 5px;
  max-width: 280px;
  margin-bottom: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  :focus {
    box-shadow: -4px 4px 0px 0px rgba(99, 94, 94, 1);
    transform: translate3d(-2px, 2px, 0);
  }
`;
