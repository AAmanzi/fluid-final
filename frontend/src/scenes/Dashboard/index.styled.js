import styled from 'styled-components';

export const DashboardContainer = styled.div`
  & p {
    color: #ffffff;
  }

  & input {
    color: #282856;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  position: relative;
`;

export const Container = styled.div`
  margin-bottom: 120px;
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 80px;
  left: 30px;

  @media screen and (max-width: 768px) {
    bottom: 20px;
    left: initial;
    height: 100px;
  }
`;

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

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const ButtonSecondary = styled.button`
  font-size: 52px;
  padding: 0 18px;
  border-radius: 20px;
  margin-top: 10px;
`;

export const Label = styled.p`
  font-family: 'Annie';
  font-size: 60px;
  margin: 0;
  line-height: 60px;
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
