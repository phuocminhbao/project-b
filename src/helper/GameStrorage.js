const KEY = {
    PLAYED_TIME: "timePlayed",
    ANSWERED_SPECIAL_QUESTIONS: "answeredSpecialQuestions",
    FOUND_NPCS: "foundNPCs",
};

export const timePlayed = () => localStorage.getItem(KEY.PLAYED_TIME);

export const increaseTimePlayed = () => {
    const timePlayed = localStorage.getItem(KEY.PLAYED_TIME);
    if (timePlayed === null) {
        localStorage.setItem(KEY.PLAYED_TIME, 1);
        return;
    }
    localStorage.setItem(KEY.PLAYED_TIME, Number(timePlayed) + 1);
};

export const isFirstTime = () => timePlayed() === null;

export const getAnsweredSpecialQuestions = () => {
    return JSON.parse(
        localStorage.getItem(KEY.ANSWERED_SPECIAL_QUESTIONS) ?? "{}",
    );
};

export const saveAnsweredSpecialQuestions = (questionID, isCorrect) => {
    const answeredSpecialQuestions = getAnsweredSpecialQuestions();
    if (answeredSpecialQuestions[questionID] === undefined) {
        answeredSpecialQuestions[questionID] = isCorrect;
        localStorage.setItem(
            KEY.ANSWERED_SPECIAL_QUESTIONS,
            JSON.stringify(answeredSpecialQuestions),
        );
        return;
    }
    if (isCorrect && !answeredSpecialQuestions[questionID]) {
        answeredSpecialQuestions[questionID] = isCorrect;
        localStorage.setItem(
            KEY.ANSWERED_SPECIAL_QUESTIONS,
            JSON.stringify(answeredSpecialQuestions),
        );
    }
};

export const getFoundNPCs = () => {
    return JSON.parse(localStorage.getItem(KEY.FOUND_NPCS) ?? "[]");
};

export const saveNPCAsFound = (id) => {
    const foundNPCs = getFoundNPCs();
    if (foundNPCs.includes(id)) {
        return;
    }
    foundNPCs.push(id);
    localStorage.setItem(KEY.FOUND_NPCS, JSON.stringify(foundNPCs));
};
