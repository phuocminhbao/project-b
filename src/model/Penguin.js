import { Hider } from "./Hider";
import penguinAvatar from "../assets/penguin.jpg";
class Penguin extends Hider {
    #spikedMacePosition = [0, 0];
    #isNeedSpikedMace = false;
    constructor(possition) {
        super("Trinh Me", penguinAvatar, possition);
    }

    get IsNeedSpikedMace() {
        return this.#isNeedSpikedMace;
    }

    needSpikedMace() {
        this.#isNeedSpikedMace = true;
    }

    set SpikedMacePosition(possition) {
        this.#spikedMacePosition = possition;
    }

    get IsFoundSpikedMace() {
        return (
            super.Row === this.#spikedMacePosition[0] &&
            super.Col === this.#spikedMacePosition[1]
        );
    }

    moveTo(row, col) {
        if (this.IsNeedSpikedMace && this.IsFoundSpikedMace) {
            this.#spikedMacePosition = [row, col];
        }
        super.moveTo(row, col);
    }
}

const penguin = new Penguin([2, 2]);
window.penguin = penguin;
export { penguin };
