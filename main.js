const screen = document.getElementById("screen");
const context = screen.getContext("2d");

function createGame() {
  const state = {
    players: {
      player1: { x: 1, y: 1 },
      player2: { x: 9, y: 9 },
    },
    fruits: {
      fruit1: { x: 3, y: 1 },
    },
  };

  function movePlayer(command) {
    console.log(
      `game.movePlayer() -> moving ${command.playerId} with ${command.keyPressed}`
    );

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y -= 1;
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < screen.height) {
          player.y += 1;
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x -= 1;
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < screen.width) {
          player.x += 1;
        }
      },
    };

    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];
    const moveFunction = acceptedMoves[keyPressed];

    moveFunction && moveFunction(player);
  }

  return {
    movePlayer,
    state,
  };
}

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

function createKeyboardListener() {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`Notifying ${state.observers.length} observers`);
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  function handleKeyDown() {
    const keyPressed = event.key;
    const command = {
      playerId: "player1",
      keyPressed,
    };

    notifyAll(command);
  }

  return {
    subscribe,
  };
}

renderScreen();

function renderScreen() {
  context.clearRect(0, 0, screen.width, screen.height);

  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    context.fillStyle = "black";
    context.fillRect(player.x, player.y, 1, 1);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    context.fillStyle = "green";
    context.fillRect(fruit.x, fruit.y, 1, 1);
  }

  requestAnimationFrame(renderScreen);
}
