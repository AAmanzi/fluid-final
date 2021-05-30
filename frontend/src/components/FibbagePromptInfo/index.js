import React from 'react';

import { Container, HeadingSecondary, Text, TextAlt } from './index.styled';

const FibbagePromptInfo = ({
  prompt,
  hideTitle = false,
  hideDescription = false,
  hideAdditionalInfo = false,
}) => {
  return (
    <Container>
      {!hideTitle && <HeadingSecondary>{prompt.title}</HeadingSecondary>}
      {!hideDescription && <Text>{prompt.description}</Text>}
      {!hideAdditionalInfo && <TextAlt>{prompt.additionalInfo}</TextAlt>}
    </Container>
  );
};

export default FibbagePromptInfo;
