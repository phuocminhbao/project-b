import { getRandomInt } from "./numberUtils";

export const getRandomElement = (array) => {
    const randomIndex = getRandomInt(0, array.length);
    return array[randomIndex];
};
