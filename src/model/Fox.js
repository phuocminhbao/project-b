import foxAvatar from "../assets/fox.gif";
import { Character } from "./Character";
class Fox extends Character {
    #points;

    constructor(possition) {
        super("Kayron", foxAvatar, possition);
        this.#points = 20;
    }

    get Points() {
        return this.#points;
    }

    set Points(amount) {
        this.#points = amount;
    }

    addPoints(amount) {
        this.#points += amount;
    }

    minusPoints(amount) {
        this.addPoints(-amount);
    }
}

const fox = new Fox([0, 0]);

export { fox, Fox };
