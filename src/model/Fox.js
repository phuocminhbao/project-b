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

    addItem(newItem) {
        const item = this.#items.find((item) => item.id === newItem.id);
        if (item) {
            item.quantity++;
        } else {
            this.#items.push({ ...newItem, quantity: 1 });
        }
        this.#sortItems();
    }

    #sortItems() {
        this.#items.sort((a, b) => b.order - a.order);
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
