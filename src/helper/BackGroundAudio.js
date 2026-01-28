let bgm = null;
let isReady = false;

export function initBackgroundMusic(src, volume = 0.4) {
    if (bgm) return;

    bgm = new Audio(src);
    bgm.loop = true;
    bgm.volume = volume;

    const unlock = () => {
        if (isReady) return;
        isReady = true;
        bgm.play();

        document.removeEventListener("click", unlock);
        document.removeEventListener("keydown", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);
}

export function stopBackgroundMusic() {
    if (!bgm) return;
    bgm.pause();
    bgm.currentTime = 0;
    bgm = null;
    isReady = false;
}
