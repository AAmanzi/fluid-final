import React, { useEffect } from "react";
import useSocket from "services/socket/useSocket";

import PromptInfo from "components/FibbagePromptInfo";

import { PromptContainer } from "./index.styled";

const Prompt = ({ prompt }) => {
  const socket = useSocket();

  useEffect(() => {
    socket.emit("host/send/prompt", {
      prompt,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <PromptContainer>
      <div>
        <PromptInfo prompt={prompt} />
      </div>
    </PromptContainer>
  );
};

export default Prompt;
