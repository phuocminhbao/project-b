export const timePlayed = () => localStorage.getItem("timePlayed");

export const increaseTimePlayed = () => {
    const timePlayed = localStorage.getItem("timePlayed");
    if (timePlayed === null) {
        localStorage.setItem("timePlayed", 1);
        return;
    }
    localStorage.setItem("timePlayed", Number(timePlayed) + 1);
};

export const isFirstTime = () => timePlayed() === null;
