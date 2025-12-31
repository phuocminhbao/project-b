export class Character {
    #avatar;
    #name;
    #row;
    #col;
    constructor(name, avatar, possition) {
        this.#name = name;
        this.#avatar = avatar;
        const [row, col] = possition;
        this.#row = row;
        this.#col = col;
    }

    get Name() {
        return this.#name;
    }

    get Avatar() {
        return this.#avatar;
    }

    get Row() {
        return this.#row;
    }

    get Col() {
        return this.#col;
    }

    get Position() {
        return [this.Row, this.Col];
    }

    setPosition(row, col) {
        this.#row = row;
        this.#col = col;
    }
}
