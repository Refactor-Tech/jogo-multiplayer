export function createGame() {
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
