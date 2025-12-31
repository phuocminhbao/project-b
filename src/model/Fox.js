import foxAvatar from "../assets/fox.gif";
import { Character } from "./Character";
import { GameItem } from "./GameItem";
class Fox extends Character {
    #points;

    /**
     * @type {GameItem[]}
     */
    #items = [];
    #itemQuantity = {};

    constructor(possition) {
        super("Kayron", foxAvatar, possition);
        this.#points = 20;
    }

    get Items() {
        return this.#items;
    }

    getItemQuantity(item) {
        return this.#itemQuantity[item.ID];
    }

    addItem(newItem) {
        const isItemExist = this.#itemQuantity[newItem.ID] ?? 0 > 0;
        if (isItemExist) {
            this.#itemQuantity[newItem.ID]++;
        } else {
            this.#items.push(newItem);
            this.#itemQuantity[newItem.ID] = 1;
        }
        this.#sortItems();
    }

    #sortItems() {
        this.#items.sort((a, b) => a.Chance - b.Chance);
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
