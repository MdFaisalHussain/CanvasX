export default class AssetsLoader {
    constructor() {
        this.onLoadCallback = null;
    }

    load(audioLoader, imageLoader) {
        const totalAssets = audioLoader.total + imageLoader.total;
        let loadedAssets = 0;
        const startTime = performance.now();
        const loadTimes = [];

        const checkComplete = (data) => {
            loadedAssets++;
            loadTimes.push(parseFloat(data.time));

            const loadData = {
                total: totalAssets,
                loaded: loadedAssets,
                duration: (performance.now() - startTime).toFixed(2),
                time: (loadTimes.reduce((a, b) => a + b, 0) / (loadTimes.length || 1)).toFixed(2),
                asset: data.asset,
                images: imageLoader.images,
                sounds: audioLoader.sounds
            };

            if (this.onLoadCallback) this.onLoadCallback(loadData);

            if (loadedAssets === totalAssets && this.onLoadCallback) {
                this.onLoadCallback(loadData, true); // Final callback
            }
        };

        audioLoader.onLoad(checkComplete);
        imageLoader.onLoad(checkComplete);

        return this;
    }

    onLoad(callback) {
        this.onLoadCallback = callback;
    }
}
