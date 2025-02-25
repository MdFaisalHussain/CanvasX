export default class ImageLoader {
    constructor() {
        this.images = {};
        this.onLoadCallback = null;
        this.total = 0;
        this.loaded = 0;
        this.loadTimes = [];
        this.startTime = 0;
    }

    load(imagePaths) {
        this.total = Object.keys(imagePaths).length;
        if (this.total === 0) return this;

        this.startTime = performance.now();

        for (const key in imagePaths) {
            const start = performance.now();
            const img = new Image();
            img.src = imagePaths[key];

            img.onload = () => {
                this.images[key] = img;
                this.loaded++;
                this.loadTimes.push(performance.now() - start);
                this._checkLoad(img);
            };

            img.onerror = () => console.error(`Error loading image: ${imagePaths[key]}`);
        }

        return this;
    }

    _checkLoad(asset) {
        if (this.onLoadCallback) {
            this.onLoadCallback(this._getLoadData(asset));
        }
    }

    _getLoadData(asset) {
        return {
            total: this.total,
            loaded: this.loaded,
            duration: (performance.now() - this.startTime).toFixed(2),
            time: (this.loadTimes.reduce((a, b) => a + b, 0) / (this.loadTimes.length || 1)).toFixed(2),
            asset,
            images: this.images
        };
    }

    onLoad(callback) {
        this.onLoadCallback = callback;
    }
}
