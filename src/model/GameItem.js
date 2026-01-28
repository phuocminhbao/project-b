import { ITEM_RARITY, RARITY_THRESHOLDS } from "../constant/item";
import { GameEffect } from "./GameEffect";
export class GameItem extends GameEffect {
    #chance;
    constructor({ id, name, description, chance }) {
        super({ id, name, description });
        this.#chance = chance;
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
