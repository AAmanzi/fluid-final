import React from "react";

import { SidebarStyled, RoomCode } from "./index.styled";

const Sidebar = ({ roomCode }) => {
  return (
    <SidebarStyled>
      <RoomCode>Room code: {roomCode}</RoomCode>
    </SidebarStyled>
  );
};

export default Sidebar;
