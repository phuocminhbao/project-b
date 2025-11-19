export class NPC {
    #id;
    #name;
    #avatar;
    #texts;
    #currentText;
    constructor(id, name, avatar, texts) {
        this.#id = id;
        this.#name = name;
        this.#avatar = avatar;
        this.#texts = texts;
        this.#currentText = 0;
    }

    get Name() {
        return this.#name;
    }

    get Avatar() {
        return this.#avatar;
    }

    get CurrentText() {
        return this.#texts[this.#currentText];
    }

    get IsLastText() {
        return this.#currentText === this.#texts.length - 1;
    }

    get NextText() {
        this.#currentText = this.#currentText + 1;
        return this.CurrentText;
    }
}
