export default class AudioLoader {
    constructor() {
        this.sounds = {};
        this.onLoadCallback = null;
        this.total = 0;
        this.loaded = 0;
        this.loadTimes = [];
        this.startTime = 0;
    }

    load(audioPaths) {
        this.total = Object.keys(audioPaths).length;
        if (this.total === 0) return this;
        
        this.startTime = performance.now();

        for (const key in audioPaths) {
            const start = performance.now();
            const audio = new Audio(audioPaths[key]);

            audio.onloadeddata = () => {
                this.sounds[key] = audio;
                this.loaded++;
                this.loadTimes.push(performance.now() - start);
                this._checkLoad(audio);
            };

            audio.onerror = () => console.error(`Error loading audio: ${audioPaths[key]}`);
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
            sounds: this.sounds
        };
    }

    onLoad(callback) {
        this.onLoadCallback = callback;
    }
}
