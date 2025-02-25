export default class CanvasJs {
    constructor(canvasSelector) {
        this.canvas = document.querySelector(canvasSelector);
        this.ctx = this.canvas.getContext("2d");

        this.defaultSize = { width: 800, height: 600 }; // PC default
        this.mobileSize = { width: 450, height: 800 }; // Mobile default
        this.assets = {}; // Metadata
        this.images = {}; // Loaded images
        this.onAssetsLoaded = null; // Callback after assets load
    }

    // 📌 Get 2D Context
    get2DContext() {
        return this.ctx;
    }

    // 📌 Get Mobile-friendly canvas size
    mobile() {
        let deviceWidth = window.innerWidth;
        let deviceHeight = window.innerHeight;

        if (deviceWidth / deviceHeight > 9 / 16) {
            deviceWidth = deviceHeight * (9 / 16);
        } else {
            deviceHeight = deviceWidth / (9 / 16);
        }

        return {
            width: Math.max(350, Math.min(deviceWidth, 500)),
            height: Math.max(600, Math.min(deviceHeight, 950)),
        };
    }

    // 📌 Get PC-friendly canvas size
    pc() {
        return this.defaultSize;
    }

    // 📌 Set canvas size dynamically
    setSize(size) {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
    }

    // 📌 Load assets and trigger `game.loaded()`
    loadAssets(assetPaths) {
        let loadedCount = 0;
        const totalAssets = Object.keys(assetPaths).length;

        if (totalAssets === 0) {
            if (this.onAssetsLoaded) this.onAssetsLoaded();
            return;
        }

        for (const key in assetPaths) {
            const img = new Image();
            img.src = assetPaths[key];

            img.onload = () => {
                this.images[key] = img;
                this.assets[key] = { src: img, width: img.width, height: img.height };
                loadedCount++;
                if (loadedCount === totalAssets && this.onAssetsLoaded) {
                    this.onAssetsLoaded(); // All assets loaded, trigger callback
                }
            };

            img.onerror = () => console.error(`Error loading: ${assetPaths[key]}`);
        }
    }

    // 📌 Set callback for when assets finish loading
    loaded(callback) {
        this.onAssetsLoaded = callback;
    }

    // 📌 Clear the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 📌 Fill entire canvas with a color
    fill(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 📌 Draw an image from loaded assets
    drawImage(asset, x, y, width, height) {
        if (asset && asset.src) {
            this.ctx.drawImage(asset.src, x, y, width || asset.width, height || asset.height);
        }
    }

    // 📌 Fully Customizable Render Loop
    render(callback) {
        const loop = () => {
            callback();
            requestAnimationFrame(loop);
        };
        loop();
    }

    // 📌 Create an Enum-like Object (GDScript style)
    evum(states) {
        return Object.fromEntries(Object.keys(states).map((key, index) => [key, index]));
    }
}
