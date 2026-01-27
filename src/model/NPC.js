import { config } from "../config/gameConfig";
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
    #isGivingHint = false;
    #isTrueHint = false;
    #hintGenerator;
    constructor(id, name, avatar, texts) {
        this.#id = id;
        this.#name = name;
        this.#avatar = avatar;
        this.#isGivingHint = inChanceOf(config.npc.givingHint);
        this.#isTrueHint = inChanceOf(config.npc.trueHint);
        this.#texts = this.#generateTexts(texts);
        this.#currentText = 0;
        this.#hintGenerator = new HintGenerator(this.#isTrueHint);
    }

    get ID() {
        return this.#id;
    }

    get IsNganKien() {
        return this.#id === 12;
    }

    forceToGiveHint(isTrueHint) {
        this.#removeHintTexts();
        this.#isGivingHint = true;
        this.#isTrueHint = isTrueHint;
        this.#texts = this.#generateTexts(this.#texts);
        this.#hintGenerator = new HintGenerator(this.#isTrueHint);
    }

    forceToNotGiveHint() {
        this.#removeHintTexts();
        this.#isGivingHint = false;
        this.#isTrueHint = false;
        this.#texts.push("Hè đáng lẽ có hint á, mà bị /mute òi");
    }

    #removeHintTexts() {
        if (!this.#isGivingHint) {
            return;
        }
        let lastText = this.#texts[this.#texts.length - 1];
        while (Number.isInteger(lastText)) {
            this.#texts.pop();
            lastText = this.#texts[this.#texts.length - 1];
        }
        this.#texts.pop();
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
        return `${this.#name}: ${
            text ??
            (this.IsNganKien ? "Kiên nhớ đội mũ nhìu vào nha" : "Chim cook dei")
        }`;
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
