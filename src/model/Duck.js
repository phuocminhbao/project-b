import { Hider } from "./Hider";
import duckAvatar from "../assets/animalsduck.jpg";
import { getRandomElement } from "../utils/array";
import { MAX_LENGTH } from "../data/map";
class Duck extends Hider {
    #goDifferentWay = false;
    constructor(possition) {
        super("Serious Duck", duckAvatar, possition);
    }

    goDifferentWay() {
        this.#goDifferentWay = true;
    }

    moveTo(row, col) {
        if (!this.#goDifferentWay) {
            super.moveTo(row, col);
            return;
        }
        const randomSteps = [-1, 0, 1];
        const newRow = row + getRandomElement(randomSteps);
        const newCol = col + getRandomElement(randomSteps);
        super.moveTo(
            newRow <= MAX_LENGTH && newRow >= 0 ? newRow : row,
            newCol <= MAX_LENGTH && newCol >= 0 ? newCol : col,
        );
        this.#goDifferentWay = false;
    }
}

let duck = new Duck([1, 1]);
window.duck = () => duck;
const isekaiDuck = () => {
    duck = new Duck([1, 1]);
};
export { duck, isekaiDuck };
