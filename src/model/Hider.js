import { Character } from "./Character";

export class Hider extends Character {
    #isFound = false;
    constructor(name, avatar, possition) {
        super(name, avatar, possition);
    }

    get IsFound() {
        return this.#isFound;
    }
    found() {
        this.#isFound = true;
    }
    lost() {
        this.#isFound = false;
    }
}
