import { GameEffect } from "./GameEffect";

export const EVENT_TYPE = {
    GOOD: "good",
    BAD: "bad",
};

export class RoomEvent extends GameEffect {
    #type;
    constructor({ id, name, description, type }) {
        super({ id, name, description });
        this.#type = type;
    }
    get isGood() {
        return this.#type === EVENT_TYPE.GOOD;
    }
    get isBad() {
        return this.#type === EVENT_TYPE.BAD;
    }
}
