export const getScoreForCorrectAnswer = (round) => {
  if (round === 1) {
    return 1000;
  }

  if (round === 2) {
    return 2000;
  }

  if (round === 3) {
    return 3000;
  }

  return 0;
};

export const getScoreForFooling = (round) => {
  if (round === 1) {
    return 500;
  }

  if (round === 2) {
    return 1000;
  }

  if (round === 3) {
    return 1500;
  }

  return 0;
};

export const takeNewPrompt = (prompts) => {
  const newPromptIndex = Math.floor(Math.random() * prompts.length);
  const newPrompt = {
    ...prompts[newPromptIndex],
  };
  const newPrompts = prompts.filter((_, index) => index !== newPromptIndex);

  return {
    newPrompt,
    newPrompts,
  };
};
