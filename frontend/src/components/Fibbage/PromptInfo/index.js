import React from 'react';

import { Text, TextSecondary } from 'src/components/styled';

import { Container } from './index.styled';

const FibbagePromptInfo = ({
  prompt,
  hideTitle = false,
  hideDescription = false,
}) => {
  return (
    <Container>
      {!hideTitle && <Text>{prompt.title}</Text>}
      {!hideDescription && <TextSecondary>{prompt.description}</TextSecondary>}
    </Container>
  );
};

export default FibbagePromptInfo;
