export class Fox {
    /**
     * @type {number}
     */
    #points;

    constructor() {
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
