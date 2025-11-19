import animalstuck from "../assets/animalsduck.jpg";
export class Fox {
    /**
     * @type {number}
     */
    #points;
    #avatar;

    constructor() {
        this.#points = 20;
        this.#avatar = animalstuck;
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

    get Avatar() {
        return this.#avatar;
    }
}
