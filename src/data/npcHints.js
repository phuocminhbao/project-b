import { config } from "../config/gameConfig";
import { HINT } from "../constant/hint";

const rarelity = config.hint.rarelity;

const hints = [
    { name: HINT.EXTRACT_POSITION, chance: rarelity[HINT.EXTRACT_POSITION] },
    { name: HINT.RANGE_OF_ROOMS, chance: rarelity[HINT.RANGE_OF_ROOMS] },
    {
        name: HINT.RELATIVE_DIRECTION,
        chance: rarelity[HINT.RELATIVE_DIRECTION],
    },
    {
        name: HINT.RELATIVE_DIRECTION_DIAGONAL,
        chance: rarelity[HINT.RELATIVE_DIRECTION_DIAGONAL],
    },
    { name: HINT.DISTANCE, chance: rarelity[HINT.DISTANCE] },
    {
        name: HINT.ROW_COLUMN_ALIGNMENT_FOX,
        chance: rarelity[HINT.ROW_COLUMN_ALIGNMENT_FOX],
    },
    {
        name: HINT.ROW_COLUMN_ALIGNMENT_HIDERS,
        chance: rarelity[HINT.ROW_COLUMN_ALIGNMENT_HIDERS],
    },
    { name: HINT.ROW_COLUMN_DIFF, chance: rarelity[HINT.ROW_COLUMN_DIFF] },
    { name: HINT.HIDING_AT_CONNER, chance: rarelity[HINT.HIDING_AT_CONNER] },
];

const totalChances = hints.reduce((total, hint) => total + hint.chance, 0);

export const getHints = () => {
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
