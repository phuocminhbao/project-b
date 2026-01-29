import foxAvatar from "../assets/fox.gif";
import { config } from "../config/gameConfig";
import { Character } from "./Character";
import { GameItem } from "./GameItem";
class Fox extends Character {
    #points;

    /**
     * @type {GameItem[]}
     */
    #items = [];
    #itemQuantity = {};
    #shields = config.fox.shield;
    #depression = config.fox.depression;
    #pointsAdjustment = {
        add: [],
        minus: [],
    };
    #isAlone = false;

    constructor(possition) {
        super("Kayron", foxAvatar, possition);
        this.#points = config.fox.points;
    }

    addAddPointAdjustment(amount) {
        this.#pointsAdjustment.add.push(amount);
    }

    addMinusPointAdjustment(amount) {
        this.#pointsAdjustment.minus.push(amount);
    }

    get IsAlone() {
        return this.#isAlone;
    }

    set IsAlone(value) {
        this.#isAlone = value;
    }

    get Items() {
        return this.#items.filter((item) => fox.getItemQuantity(item) > 0);
    }

    get TotalItemsQuantity() {
        return this.#items.reduce(
            (sum, item) => sum + this.getItemQuantity(item),
            0,
        );
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
        this.#itemQuantity = {};
    }

    addShield(amount = 1) {
        this.#shields = +amount;
    }

    get HasShield() {
        return this.#shields > 0;
    }

    gainDepression(amount = 1) {
        this.#depression += amount;
    }
    get HasDepression() {
        return this.#depression > 0;
    }

    get Points() {
        return this.#points;
    }

    set Points(amount) {
        this.#points = amount;
    }

    addPoints(amount) {
        if (this.HasDepression) {
            this.#depression--;
            return;
        }
        const adjustment = this.#pointsAdjustment.add.pop() ?? 1;
        this.#points += amount * adjustment;
    }

    minusPoints(amount) {
        if (this.HasShield) {
            this.#shields--;
            return;
        }
        const adjustment = this.#pointsAdjustment.minus.pop() ?? 1;
        this.#points -= amount * adjustment;
    }
}

let fox = new Fox([0, 0]);
window.fox = () => fox;
const isekaiFox = () => {
    fox = new Fox([0, 0]);
};
export { fox, Fox, isekaiFox };
