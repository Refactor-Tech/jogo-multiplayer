import { createGame } from "./game.js";
import { createKeyboardListener } from "./keyboard-listener.js";

const screen = document.getElementById("screen");
const context = screen.getContext("2d");

const game = createGame();
game.addFruit({ fruitId: "fruit1", fruitX: 5, fruitY: 5 });
game.addFruit({ fruitId: "fruit2", fruitX: 9, fruitY: 9 });
game.addPlayer({ playerId: "player1", playerX: 0, playerY: 0 });
game.addPlayer({ playerId: "player2", playerX: 2, playerY: 3 });
game.addPlayer({ playerId: "player3", playerX: 5, playerY: 7 });
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

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
