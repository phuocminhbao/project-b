import { CORNERS, mapData } from "../data/map";
import { Character } from "./Character";
import { fox } from "./Fox";

export class Hider extends Character {
    #isFound = false;
    #blockingMoves = 0;
    constructor(name, avatar, possition) {
        super(name, avatar, possition);
    }

    get IsMoveAble() {
        return this.#blockingMoves <= 0;
    }

    increaseBlockingMoves(amount) {
        this.#blockingMoves += amount;
    }

    get IsFound() {
        return this.#isFound;
    }

    jumpToFoxRoom() {
        this.moveTo(fox.Row, fox.Col);
        this.found();
    }

    jumpToExit() {
        const exit = CORNERS.find(
            (corner) => mapData[corner[0]][corner[1]].isExit,
        );
        this.moveTo(exit[0], exit[1]);
    }

    found() {
        this.#isFound = true;
    }
    lost() {
        this.#isFound = false;
    }
    moveTo(row, col) {
        if (this.IsMoveAble) {
            super.moveTo(row, col);
            return;
        }
        this.#blockingMoves--;
    }
}
