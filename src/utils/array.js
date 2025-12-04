import { getRandomInt } from "./numberUtils";

export const getRandomElement = (array) => {
    const randomIndex = getRandomInt(0, array.length);
    return array[randomIndex];
};

export const generateUniqueRandomArray = (n, arrLength) => {
    const numbers = Array.from({ length: n + 1 }, (_, i) => i);
    const result = [];

    for (let i = 0; i < arrLength; i++) {
        const randomIndex = getRandomElement(numbers);
        result.push(numbers.splice(randomIndex, 1)[0]);
    }

    return result;
};

export const shuffle = (array) => {
    const arr = [...array]; // avoid mutating original
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
    return arr;
};
