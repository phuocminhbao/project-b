import { getRandomElement, generateUniqueRandomArray } from "../utils/array";
import { getRandomInt, inChanceOf } from "../utils/numberUtils";
import { npcCharacters } from "./npcCharacters";
import { questions, specialQuestions } from "./questions";
import { fox } from "../model/Fox";
import { duck } from "../model/Duck";
import { penguin } from "../model/Penguin";

const MAX_LENGTH = 5;

const mapData = [
    [
        {
            cost: 0,
            npc: npcCharacters[0],
            question: questions[0],
            event: undefined,
            items: [],
            isExit: false,
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
    fox.setPosition(row, col);
};

const assignDuck = () => {
    let [row, col] = getRandomPosition();
    while (row === fox.Row && col === fox.Col) {
        [row, col] = getRandomPosition();
    }
    duck.setPosition(row, col);
};

const assignPenguin = () => {
    let [row, col] = getRandomPosition();
    while (
        (row === fox.Row && col === fox.Col) ||
        (row === duck.Row && col === duck.Col)
    ) {
        [row, col] = getRandomPosition();
    }
    penguin.setPosition(row, col);
};

const getNPC = (NPCs) => {
    if (inChanceOf(60)) {
        return undefined;
    }

    return npcCharacters[NPCs.pop()];
};

const getQuestion = (questionIndexs, specialQuestionsIndexs) => {
    // Special questions from duck and penguin
    if (inChanceOf(20) && specialQuestionsIndexs.length > 0) {
        return specialQuestions[specialQuestionsIndexs.pop()];
    }
    return questions[questionIndexs.pop()];
};

const loadMap = () => {
    const randomNPCs = generateUniqueRandomArray(
        npcCharacters.length,
        MAX_LENGTH * MAX_LENGTH,
        true
    );
    const randomQuestions = generateUniqueRandomArray(
        questions.length,
        MAX_LENGTH * MAX_LENGTH,
        true
    );
    const randomSpecialQuestions = generateUniqueRandomArray(
        specialQuestions.length,
        MAX_LENGTH * MAX_LENGTH,
        true
    );
    for (let row = 0; row < MAX_LENGTH; row++) {
        mapData[row] = [];
        for (let col = 0; col < MAX_LENGTH; col++) {
            mapData[row][col] = {
                cost: getRandomInt(0, 9),
                npc: getNPC(randomNPCs),
                question: getQuestion(randomQuestions, randomSpecialQuestions),
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
    loadMap();
};
const assignRandomQuestion = (row, col) => {
    mapData[row][col].question = getRandomElement(questions);
};
loadMap();
export { mapData, MAX_LENGTH, reLoadMap, assignRandomQuestion };
