import { getHints } from "../data/npcHints";
import { givingHintMessage } from "../data/texts";
import { HintGenerator } from "../helper/HintGenerator";
import { getRandomElement } from "../utils/array";
import { inChanceOf } from "../utils/numberUtils";

export class NPC {
    #id;
    #name;
    #avatar;
    #texts;
    #currentText;
    #isGivingHint = inChanceOf(50);
    #isTrueHint = inChanceOf(50);
    #hintGenerator;
    constructor(id, name, avatar, texts) {
        this.#id = id;
        this.#name = name;
        this.#avatar = avatar;
        this.#texts = this.#generateTexts(texts);
        this.#currentText = 0;
        this.#hintGenerator = new HintGenerator(this.#isTrueHint);
    }

    #generateTexts(intialTexts) {
        const texts = [...intialTexts];
        if (this.#isGivingHint) {
            texts.push(getRandomElement(givingHintMessage));
            texts.push(getHints());
        }
        return texts;
    }

    get Name() {
        return this.#name;
    }

    get Avatar() {
        return this.#avatar;
    }

    get CurrentText() {
        const text = this.#texts[this.#currentText];
        const isHint = Number.isInteger(text);
        if (isHint) {
            return `${this.#name}: ${this.#getHint(text)}`;
        }
        return `${this.#name}: ${text ?? "Chim cook dei"}`;
    }

    #getHint(hint) {
        return this.#hintGenerator.getHint(hint);
    }

    get IsTellingTruth() {
        return this.#isTrueHint;
    }

    get IsLastText() {
        return this.#currentText >= this.#texts.length - 1;
    }

    get NextText() {
        this.#currentText = this.#currentText + 1;
        return this.CurrentText;
    }

    visted() {
        this.#currentText = this.#texts.length + 1;
    }
}
