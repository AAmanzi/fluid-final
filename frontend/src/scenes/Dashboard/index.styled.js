import { ButtonPrimary } from 'src/components/styled';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  & input {
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

export const Label = styled.p`
  font-family: 'Annie';
  font-size: 60px;
  margin: 0;
  line-height: 60px;
  color: #282856;
`;

export const ButtonCreateGame = styled(ButtonPrimary)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
