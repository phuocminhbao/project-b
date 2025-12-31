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
    #shields = 0;

    constructor(possition) {
        super("Kayron", foxAvatar, possition);
        this.#points = 20;
    }

    get Items() {
        return this.#items.filter((item) => fox.getItemQuantity(item) > 0);
    }

    getItemQuantity(item) {
        return this.#itemQuantity[item.ID];
    }

    addItem(newItem) {
        const isItemExist = this.#itemQuantity[newItem.ID] !== undefined;
        if (isItemExist) {
            this.#itemQuantity[newItem.ID]++;
        } else {
            this.#items.push(newItem);
            this.#itemQuantity[newItem.ID] = 1;
        }
        this.#sortItems();
    }

    removeItem(item) {
        const isItemExist = this.#itemQuantity[item.ID] ?? 0 > 0;
        if (!isItemExist) {
            throw new Error(`Fox does not have item ${item.Name}`);
        }
        this.#itemQuantity[item.ID]--;
    }

    #sortItems() {
        this.#items.sort((a, b) => a.Chance - b.Chance);
    }

    resetItems() {
        this.#items = [];
    }

    addShield() {
        this.#shields++;
    }

    get HasShield() {
        return this.#shields > 0;
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
        if (this.HasShield) {
            this.#shields--;
            return;
        }
        this.addPoints(-amount);
    }
}

const fox = new Fox([0, 0]);
window.fox = fox;

export { fox, Fox };
