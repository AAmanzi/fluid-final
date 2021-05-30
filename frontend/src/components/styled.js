import styled from 'styled-components';

export const ButtonPrimary = styled.button`
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

export const ButtonSecondary = styled.button`
  font-size: 34px;
  padding: 8px 24px;
  border-radius: 10px;
  margin-top: 10px;

  ${({ background }) => background === 'red' && 'background-color: #ee5d6c;'}
  ${({ background }) => background === 'blue' && 'background-color: #282856;'}
`;

export const ButtonRadio = styled.button`
  border-radius: 30px;
  font-size: 64px;
  margin-top: 12px;
  margin-bottom: 12px;
  text-transform: uppercase;
  border: 2px solid #ffffff;
  transition: border 0.2s ease-in-out;

  ${({ isSelected }) => isSelected && 'border: 2px solid #ee5d6c;'};
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
  color: #282856;

  :focus {
    box-shadow: -4px 4px 0px 0px rgba(99, 94, 94, 1);
    transform: translate3d(-2px, 2px, 0);
  }
`;
