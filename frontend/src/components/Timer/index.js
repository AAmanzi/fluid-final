import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useInterval } from 'src/hooks/useInterval';

const Text = styled.h1`
  font-size: 50px;
  margin: 18px;
  max-width: 640px;
`;

const Timer = ({ seconds, onExit }) => {
  const [counter, setCounter] = useState(seconds);

  useInterval(() => {
    setCounter((prevCounter) => {
      if (prevCounter !== 0) {
        return prevCounter - 1;
      }
      return prevCounter;
    });
  }, 1000);

  useEffect(() => {
    if (counter === 0) {
      onExit && onExit();
    }
  }, [counter, onExit]);

  return <Text>{counter}</Text>;
};

export default Timer;
