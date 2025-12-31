const ITEM_RARITY = {
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
};

const RARITY_THRESHOLDS = {
    LEGENDARY_MAX: 5,
    EPIC_MAX: 10,
    RARE_MAX: 20,
    UNCOMMON_MAX: 50,
    COMMON_MAX: 100,
};
export class GameItem {
    #id;
    #name;
    #description;
    #chance;
    constructor({ id, name, description, chance }) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#chance = chance;
    }

    get ID() {
        return this.#id;
    }

    get Name() {
        return this.#name;
    }

    get Description() {
        return this.#description;
    }

    get Chance() {
        return this.#chance;
    }

    get Rarity() {
        const chance = this.Chance;
        if (chance < 0 || chance > RARITY_THRESHOLDS.COMMON_MAX) {
            throw new Error("Chance must be between 0 and 100");
        }

        if (chance <= RARITY_THRESHOLDS.LEGENDARY_MAX) {
            return ITEM_RARITY.LEGENDARY;
        }

        if (chance <= RARITY_THRESHOLDS.EPIC_MAX) {
            return ITEM_RARITY.EPIC;
        }

        if (chance <= RARITY_THRESHOLDS.RARE_MAX) {
            return ITEM_RARITY.RARE;
        }

        if (chance <= RARITY_THRESHOLDS.UNCOMMON_MAX) {
            return ITEM_RARITY.UNCOMMON;
        }

        return ITEM_RARITY.COMMON;
    }
}
