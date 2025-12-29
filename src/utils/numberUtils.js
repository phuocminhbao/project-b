export const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

/**
 * Returns true if a random number is less than the given percentage.
 * For example, inChanceOf(50) returns true 50% of the time.
 * @param {number} percent - The percentage to check against.
 * @returns {boolean} True if the random number is less than the given percentage.
 * @throws {RangeError} If the percent is not a number between 0 and 100.
 */
export const inChanceOf = (percent) => {
    if (typeof percent !== "number" || percent < 0 || percent > 100) {
        throw new RangeError("percent must be a number between 0 and 100");
    }
    return Math.random() * 100 < percent;
};
