# Fluid
## Local stack
* **Postgres** needs to be set up on the dev machine
* **Yarn** is suggested

## Env variables (`backend/`)
`Update accordingly`
* POSTGRES_HOST=localhost
* POSTGRES_USER=postgres
* POSTGRES_PASSWORD=postgres
* POSTGRES_DATABASE=fluid

## Running the project
1. Run Postgres

### Backend (`backend/`)
1. Run `yarn`
2. Run `yarn dev`

### Frontend (`frontend/`)
1. Run `yarn`
2. Run `yarn start`

## How to play
```

On the main screen you will be prompted with a "Create game" button and name & room code inputs.

By clicking on "Create game" you will end up on a screen for selecting the type of game you want
to play (only one implemented for the purposes of this project) which will then create a game
and the device that created the game will be considered as the "Host".

The room/game code will be displayed on the right hand side of the screen.

Every player must then also open the webpage on their devices and input their desired display
name and room code from the Host's screen.

The first player to join a game will be considered as the "Moderator" and will be in control of
starting the game once all other players have joined.

The game works as follows:
Prompts will be displayed on the Host device, while players will receive inputs/buttons on their
screen in order to interact with/answer the prompts. Each player will be rewarded points based
on their performance in the game.

```

### Fibbage
```

The game consists of 3 rounds. At the end of the third round, the player with the most points
is considered as the winner.

Each round is simple: There is a statement on the screen with a missing word and you have to
supply the incorrect answer to fool your friends into guessing it. After all players have
submited their answers, each player will be able to select what they think is the correct
answer. You will get points if you choose the correct answer supplied by the game itself. If
somebody else chooses your incorrect answer, you will also receive points.

```