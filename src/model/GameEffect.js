export class GameEffect {
    #id;
    #name;
    #description;
    constructor({ id, name, description }) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
    }

    get ID() {
        return this.#id;
    }

    get Name() {
        return this.#name;
    }

    get Description() {
        return this.#description;
    }
}
