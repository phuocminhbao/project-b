import { getRandomElement } from "../utils/array";
import { getRandomInt } from "../utils/numberUtils";
import { npcCharacters } from "./npcCharacters";
import { questions } from "./questions";
import { fox } from "../model/Fox";
import { duck } from "../model/Duck";
import { penguin } from "../model/Penguin";

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

const getRandomPosition = () => {
    const row = getRandomInt(0, MAX_LENGTH - 1);
    const col = getRandomInt(0, MAX_LENGTH - 1);
    return [row, col];
};

const assignExit = () => {
    const corners = [
        [0, 0],
        [0, MAX_LENGTH - 1],
        [MAX_LENGTH - 1, 0],
        [MAX_LENGTH - 1, MAX_LENGTH - 1],
    ];
    const [randomRow, randomCol] = getRandomElement(corners);
    mapData[randomRow][randomCol].isExit = true;
};

const assignFox = () => {
    const [row, col] = getRandomPosition();
    fox.setPossition(row, col);
};

const assignDuck = () => {
    let [row, col] = getRandomPosition();
    while (row === fox.Row && col === fox.Col) {
        [row, col] = getRandomPosition();
    }
    duck.setPossition(row, col);
};

const assignPenguin = () => {
    let [row, col] = getRandomPosition();
    while (
        (row === fox.Row && col === fox.Col) ||
        (row === duck.Row && col === duck.Col)
    ) {
        [row, col] = getRandomPosition();
    }
    penguin.setPossition(row, col);
};

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
    assignExit();
    assignFox();
    assignDuck();
    assignPenguin();
};

const reLoadMap = () => {
    added.npc = {};
    added.questions = {};
    loadMap();
};
loadMap();
export { mapData, MAX_LENGTH, reLoadMap };
