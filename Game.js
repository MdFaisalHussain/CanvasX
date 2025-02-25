
import CanvasJs from "./CanvasJs.js";

// Initialize the game
const game = new CanvasJs(".canvas");

// Get 2D context
const ctx = game.get2DContext();

// Set size based on device type
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
game.setSize(isMobile ? game.mobile() : game.pc());

// 📌 Define Game States using `evum()`
const GAME_STATE = game.evum({
    READY, PLAYING, OVER, PAUSE
});

console.log(GAME_STATE); // { READY: 0, PLAYING: 1, OVER: 2, PAUSE: 3 }

// 📌 Set initial game state
let currentState = GAME_STATE.READY;

// 📌 Load Assets
const assets = game.loadAssets({
    background: "/public/bg.png",
    ground: "/public/ground.png",
});

// 📌 Once assets are loaded, start game
game.loaded(() => {
    const background = { width: game.canvas.width, height: game.canvas.height, src: game.assets.background };
    const ground = { width: game.canvas.width, height: 100, src: game.assets.ground };

    let groundX = 0;
    const groundSpeed = 2;

    // 📌 Update Game Logic
    function update() {
        if (currentState === GAME_STATE.PLAYING) {
            groundX -= groundSpeed;
            if (groundX <= -game.canvas.width) {
                groundX = 0; // Reset ground position
            }
        }
    }

    // 📌 Draw Everything
    function draw() {
        game.drawImage(background, 0, 0);
        game.drawImage(ground, groundX, game.canvas.height - 100);
        game.drawImage(ground, groundX + game.canvas.width, game.canvas.height - 100);
    }

    // 📌 Start Custom Render Loop
    game.render(() => {
        update();
        game.clear();
        draw();
    });

    // Change game state after 2 seconds
    setTimeout(() => {
        currentState = GAME_STATE.PLAYING;
        console.log("Game State:", currentState); // Should print 1 (PLAYING)
    }, 2000);
});
