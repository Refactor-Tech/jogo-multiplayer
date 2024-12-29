import { createGame } from "./game.js";
import { createKeyboardListener } from "./keyboard-listener.js";
import { renderScreen } from "./render-screen.js";

const game = createGame();
const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(game.movePlayer);

const screen = document.getElementById("screen");
renderScreen(screen, game, requestAnimationFrame);

game.addFruit({ fruitId: "fruit1", fruitX: 5, fruitY: 5 });
game.addFruit({ fruitId: "fruit2", fruitX: 9, fruitY: 9 });
game.addPlayer({ playerId: "player1", playerX: 0, playerY: 0 });
game.addPlayer({ playerId: "player2", playerX: 2, playerY: 3 });
game.addPlayer({ playerId: "player3", playerX: 5, playerY: 7 });
