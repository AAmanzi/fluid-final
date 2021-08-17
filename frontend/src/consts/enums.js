export const ROOM_TYPE = Object.freeze({
  fibbage: 'fibbage',
  connectFour: 'connectFour',
});

export const FIBBAGE_EVENT_TYPE = Object.freeze({
  notStarted: 'notStarted',
  answeringPrompt: 'answeringPrompt',
  choosingAnswers: 'choosingAnswers',
  displayResults: 'displayResults',
  gameOver: 'gameOver',
});

export const CONNECT_FOUR_EVENT_TYPE = Object.freeze({
  notStarted: 'notStarted',
  playerOneTurn: 'playerOneTurn',
  playerTwoTurn: 'playerTwoTurn',
  gameOver: 'gameOver',
});

export const PLAYER = Object.freeze({
  one: 'one',
  two: 'two',
});
