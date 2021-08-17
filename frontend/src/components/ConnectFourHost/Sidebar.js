import React from 'react';

import { SidebarContainer, RoomCode } from './index.styled';

const Sidebar = ({ roomCode }) => {
  return (
    <SidebarContainer>
      <RoomCode>Room code:</RoomCode>
      <RoomCode>{roomCode}</RoomCode>
    </SidebarContainer>
  );
};

export default Sidebar;
