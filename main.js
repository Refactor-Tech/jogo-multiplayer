const screen = document.getElementById("screen");
const context = screen.getContext("2d");

function createGame() {
  const state = {
    players: {},
    fruits: {},
  };

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = command.playerX;
    const playerY = command.playerY;

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function addFruit(command) {
    const fruitId = command.fruitId;
    const fruitX = command.fruitX;
    const fruitY = command.fruitY;

    state.fruits[fruitId] = {
      x: fruitX,
      y: fruitY,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function movePlayer(command) {
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

    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(command.playerId);
    }

    function checkForFruitCollision(playerId) {
      const player = state.players[playerId];

      for (const fruitId in state.fruits) {
        const fruit = state.fruits[fruitId];

        if (player.x === fruit.x && player.y === fruit.y) {
          console.log(`Player ${playerId} hit a fruit`);
          removeFruit({ fruitId });
        }
      }
    }
  }

  return {
    movePlayer,
    state,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}

const game = createGame();
game.addFruit({ fruitId: "fruit1", fruitX: 5, fruitY: 5 });
game.addFruit({ fruitId: "fruit2", fruitX: 9, fruitY: 9 });
game.addPlayer({ playerId: "player1", playerX: 0, playerY: 0 });
game.addPlayer({ playerId: "player2", playerX: 2, playerY: 3 });
game.addPlayer({ playerId: "player3", playerX: 5, playerY: 7 });
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
