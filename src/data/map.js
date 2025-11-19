import { getRandomElement } from "../utils/array";
import { getRandomInt } from "../utils/numberUtils";
import { npcCharacters } from "./npcCharacters";
import { questions } from "./questions";

const MAX_LENGTH = 5;

const added = {
    npc: {},
    questions: {},
};

const mapData = [
    [
        {
            cost: 0,
            npc: npcCharacters[0],
            question: questions[0],
            event: undefined,
            items: [],
        },
    ],
];

const loadMap = () => {
    for (let row = 0; row < MAX_LENGTH; row++) {
        mapData[row] = [];
        for (let col = 0; col < MAX_LENGTH; col++) {
            mapData[row][col] = {
                cost: getRandomInt(0, 9),
                npc:
                    getRandomInt(1, 4) === 2
                        ? getRandomElement(npcCharacters)
                        : undefined,
                question: getRandomElement(questions),
                event: undefined,
                items: [],
            };
        }
    }
};

const reLoadMap = () => {
    added.npc = {};
    added.questions = {};
    loadMap();
};
loadMap();
export { mapData, MAX_LENGTH, reLoadMap };
