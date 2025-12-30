import foxAvatar from "../assets/fox.gif";
import { Character } from "./Character";
class Fox extends Character {
    #points;
    #items = [];

    constructor(possition) {
        super("Kayron", foxAvatar, possition);
        this.#points = 20;
    }

    get Items() {
        return this.#items;
    }

    addItem(item) {
        this.#items.push(item);
    }

    resetItems() {
        this.#items = [];
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
window.fox = fox;

export { fox, Fox };
