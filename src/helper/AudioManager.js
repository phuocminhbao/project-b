/**
 * @type {HTMLAudioElement}
 */
let currentAudio = null;

export function playAudio(src, { loop = false, volume = 1 } = {}) {
    stopAudio();

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    // Safe play (handles browser autoplay restriction)
    audio.play().catch((e) => {
        console.warn("Audio play blocked until user interaction");
    });

    currentAudio = audio;
}

export function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}
