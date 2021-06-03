import { ButtonPrimary } from 'src/components/styled';
import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

export const Container = styled.div`
  padding-bottom: 120px;
`;

export const Logo = styled.img`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  @media screen and (max-width: 768px) {
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
