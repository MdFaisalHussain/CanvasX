import AudioLoader from "./AudioLoader.js";
import ImageLoader from "./ImageLoader.js";
import AssetsLoader from "./AssetsLoader.js";
import FlappyBird from "./FlappyBird.js";

const canvas = document.querySelector("canvas");

// Asset Paths
const images = {
    bg_day: "/assets/bg_day.png",
    bg_night: "/assets/bg_night.png",
    ground: "/assets/ground.png",
    bird: "/assets/bird.png"
};

const audio = {
    jump: "/assets/jump.wav",
    bg_music: "/assets/bg_music.wav"
};

// Initialize Loaders
const audioLoader = new AudioLoader().load(audio);
const imageLoader = new ImageLoader().load(images);

// Load all assets together
const assets = new AssetsLoader().load(audioLoader, imageLoader);

assets.onLoad((data, allLoaded) => {
    console.log(`Loaded: ${data.loaded}/${data.total} | Asset: ${data.asset} | Avg Time: ${data.time}ms | Duration: ${data.duration}ms`);

    if (allLoaded) {
        console.log("✅ All assets loaded. Starting game...");
        const game = new FlappyBird(canvas, data.images, data.sounds);
        game.start();

        if (data.sounds.bg_music) {
            data.sounds.bg_music.loop = true;
            data.sounds.bg_music.play();
        }
    }
});
