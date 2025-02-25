# **📦 Assets Loader - Load Images & Audio Easily**  

A lightweight JavaScript library for loading images and audio assets efficiently.  
It includes **progress tracking**, **callbacks**, and ensures assets are fully loaded before use.  

---

# **🚀 Installation**
Simply include `assets-loader.js` in your project.

```js
import { ImageLoader, AudioLoader, AssetsLoader } from "./assets-loader.js";
```

---

# **🔰 Basic Usage**
1. **Load images**
2. **Load audio**
3. **Load all assets together**
4. **Use assets after loading**

---

# **📸 ImageLoader (Load Images)**  
Load images with **custom keys**:

```js
const imageLoader = new ImageLoader();
const images = imageLoader.load({
    bird: "./assets/bird.png",
    bg_day: "./assets/bg_day.png",
    bg_night: "./assets/bg_night.png",
    ground: "./assets/ground.png"
});
```

### **✅ Use Images**
```js
ctx.drawImage(imageLoader.images.bird, 100, 200);
```

### **📊 Image Loading Progress**
```js
imageLoader.onLoad((progress, allLoaded) => {
    console.log("Total Images:", progress.total);
    console.log("Loaded:", progress.loaded);
    console.log("Time Taken:", progress.duration + "ms");
    console.log("Avg Time Per Image:", progress.avgTime + "ms");
    console.log("Current Image:", progress.current);
});
```

---

# **🔊 AudioLoader (Load Audio)**
Load sounds with **custom keys**:

```js
const audioLoader = new AudioLoader();
const audio = audioLoader.load({
    jump: "./assets/jump.wav",
    hit: "./assets/hit.wav",
    bg_music: "./assets/bg_music.mp3"
});
```

### **✅ Play Audio**
```js
audioLoader.sounds.jump.play();
```

### **📊 Audio Loading Progress**
```js
audioLoader.onLoad((progress, allLoaded) => {
    console.log("Total Sounds:", progress.total);
    console.log("Loaded:", progress.loaded);
    console.log("Time Taken:", progress.duration + "ms");
    console.log("Avg Time Per Sound:", progress.avgTime + "ms");
    console.log("Current Sound:", progress.current);
});
```

---

# **📦 AssetsLoader (Load All Assets)**
Use `AssetsLoader` to **wait for everything to load** before starting the game.

```js
const assets = new AssetsLoader();
assets.load(imageLoader, audioLoader);
```

### **✅ Start Game After Loading**
```js
assets.onLoad((progress, allLoaded) => {
    console.log(progress); // Shows loading status

    if (allLoaded) {
        console.log("✅ All assets loaded! Starting game...");
        startGame();
    }
});
```

### **📊 Combined Loading Progress**
```js
assets.onLoad((data, allLoaded) => {
    console.log("Total Assets:", data.total);
    console.log("Loaded:", data.loaded);
    console.log("Time Taken:", data.duration + "ms");
    console.log("Avg Time Per Asset:", data.avgTime + "ms");
    console.log("Current Asset:", data.current);
});
```

---

# **🔁 Full Example**
```js
import { ImageLoader, AudioLoader, AssetsLoader } from "./assets-loader.js";

const ctx = document.querySelector("canvas").getContext("2d");

const imageLoader = new ImageLoader();
const images = imageLoader.load({
    bird: "./assets/bird.png",
    bg_day: "./assets/bg_day.png",
    bg_night: "./assets/bg_night.png",
    ground: "./assets/ground.png"
});

const audioLoader = new AudioLoader();
const audio = audioLoader.load({
    jump: "./assets/jump.wav",
    hit: "./assets/hit.wav",
    bg_music: "./assets/bg_music.mp3"
});

const assets = new AssetsLoader();
assets.load(imageLoader, audioLoader);

assets.onLoad((progress, allLoaded) => {
    if (allLoaded) {
        console.log("✅ All assets loaded!");

        // Draw background
        ctx.drawImage(imageLoader.images.bg_day, 0, 0);

        // Play background music
        audioLoader.sounds.bg_music.loop = true;
        audioLoader.sounds.bg_music.play();
    }
});
```

---

# **🎯 Features**
✔️ Load **multiple images & audio**  
✔️ Track **loading progress**  
✔️ Get **time taken for loading**  
✔️ Callback after **all assets load**  
✔️ Use assets **directly anytime**  

---

# **📌 FAQ**
### **❓ Can I use `audio.play()` without waiting for onLoad?**
Yes! But **check if it’s loaded first**:
```js
if (audioLoader.sounds.jump) {
    audioLoader.sounds.jump.play();
}
```

### **❓ Can I use `ctx.drawImage()` without waiting?**
Yes! Just **ensure the image exists**:
```js
if (imageLoader.images.bird) {
    ctx.drawImage(imageLoader.images.bird, 100, 200);
}
```

---

# **📜 License**
MIT License. Free to use and modify.

---

Now you’re ready to **load assets faster** and **start games smoothly**! 🚀
