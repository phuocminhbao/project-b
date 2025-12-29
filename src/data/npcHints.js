export const HINT = {
    EXTRACT_POSITION: 1,
    RANGE_OF_ROOMS: 2,
    RELATIVE_DIRECTION: 3,
    RELATIVE_DIRECTION_DIAGONAL: 4,
    DISTANCE: 5,
    ROW_COLUMN_ALIGNMENT_FOX: 6,
    ROW_COLUMN_ALIGNMENT_HIDERS: 7,
    ROW_COLUMN_DIFF: 8,
    HIDING_AT_CONNER: 9,
    NOTTHNG: 10,
};

const hints = [
    { name: HINT.EXTRACT_POSITION, chance: 1.69 },
    { name: HINT.RANGE_OF_ROOMS, chance: 40 },
    { name: HINT.RELATIVE_DIRECTION, chance: 35 },
    { name: HINT.RELATIVE_DIRECTION_DIAGONAL, chance: 25 },
    { name: HINT.DISTANCE, chance: 30 },
    { name: HINT.ROW_COLUMN_ALIGNMENT_FOX, chance: 30 },
    { name: HINT.ROW_COLUMN_ALIGNMENT_HIDERS, chance: 50 },
    { name: HINT.ROW_COLUMN_DIFF, chance: 10 },
    { name: HINT.HIDING_AT_CONNER, chance: 60 },
];

export const getHints = () => {
    const totalChances = hints.reduce((total, hint) => total + hint.chance, 0);
    const randomChance = Math.random() * totalChances;
    let currentChance = 0;
    for (let i = 0; i < hints.length; i++) {
        currentChance += hints[i].chance;
        if (randomChance <= currentChance) {
            return hints[i].name;
        }
    }
    return HINT.NOTTHNG;
};
