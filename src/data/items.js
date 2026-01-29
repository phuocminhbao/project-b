import { config } from "../config/gameConfig";
import { ITEM_ID } from "../constant/item";
import { duck } from "../model/Duck";
import { fox } from "../model/Fox";
import { GameItem } from "../model/GameItem";
import { penguin } from "../model/Penguin";
import { MAX_LENGTH } from "./map";

const itemRarelity = config.item.rarelity;

export const ITEM_REGISTRY = [
    new GameItem({
        id: ITEM_ID.CURRENT_POSITION,
        name: "Người anh em ở đâu - Đầu cắt moi",
        description: "Knowing the current room position",
        chance: itemRarelity[ITEM_ID.CURRENT_POSITION],
    }),

    new GameItem({
        id: ITEM_ID.TELEPORT_HIDER,
        name: "Kuchiyose no Jutsu",
        description: `Teleport ${duck.Name} or ${penguin.Name} to the current room`,
        chance: itemRarelity[ITEM_ID.TELEPORT_HIDER],
    }),

    new GameItem({
        id: ITEM_ID.TELEPORT_HIDER_TO_EXIT,
        name: "Room: Shambles",
        description: `Teleport ${duck.Name} or ${penguin.Name} to the exit, there is ${config.item.probability[ITEM_ID.TELEPORT_HIDER_TO_EXIT]} both of them will go together`,
        chance: itemRarelity[ITEM_ID.TELEPORT_HIDER_TO_EXIT],
    }),

    new GameItem({
        id: ITEM_ID.FREE_POINTS,
        name: "Mỡ đấy húp đi",
        description: "Receive a random number of points (0-15)",
        chance: itemRarelity[ITEM_ID.FREE_POINTS],
    }),

    new GameItem({
        id: ITEM_ID.JUMP_CONNER,
        name: "Về góc chơi đi con",
        description: `${fox.Name} jumps to a random corner room (0-0, 0-${MAX_LENGTH}, ${MAX_LENGTH}-0, ${MAX_LENGTH}-${MAX_LENGTH})`,
        chance: itemRarelity[ITEM_ID.JUMP_CONNER],
    }),

    new GameItem({
        id: ITEM_ID.GACHA_TELEPORT_OR_DEAD,
        name: "It's Gamble time",
        description: `High risk high reward: ${config.item.probability[ITEM_ID.GACHA_TELEPORT_OR_DEAD]}% that both ${duck.Name} and ${penguin.Name} summon to current room, else you lose 9999 points`,
        chance: itemRarelity[ITEM_ID.GACHA_TELEPORT_OR_DEAD],
    }),

    new GameItem({
        id: ITEM_ID.SEE_THE_TRUTH,
        name: "The Seer",
        description: "Knowing if the current NPC is telling truth",
        chance: itemRarelity[ITEM_ID.SEE_THE_TRUTH],
    }),

    new GameItem({
        id: ITEM_ID.LOSING_POINTS_SHIELD,
        name: "Aaaaaa tao có khiênnn!",
        description:
            "The next time losing points, you will lose 0 points instead",
        chance: itemRarelity[ITEM_ID.LOSING_POINTS_SHIELD],
    }),

    new GameItem({
        id: ITEM_ID.QUESTION_RETURN_ITEM,
        name: "Knowledge is power",
        description:
            "Answering the next question, if it correct then you will get an item instead of points",
        chance: itemRarelity[ITEM_ID.QUESTION_RETURN_ITEM],
    }),

    new GameItem({
        id: ITEM_ID.GET_RANDOM_ITEM,
        name: "Random.org",
        description: "Receive a random item",
        chance: itemRarelity[ITEM_ID.GET_RANDOM_ITEM],
    }),

    new GameItem({
        id: ITEM_ID.SAITAMA,
        name: "Saitama",
        description:
            "One punch break through all ahead walls, the next move will take you to the last room in the same direction without any cost",
        chance: itemRarelity[ITEM_ID.SAITAMA],
    }),
    new GameItem({
        id: ITEM_ID.NPC_SUMMON,
        name: "Get over here!",
        description: "Summon an reliable NPC to the current room",
        chance: itemRarelity[ITEM_ID.NPC_SUMMON],
    }),
];

const TOTAL_CHANCE = ITEM_REGISTRY.reduce((sum, item) => sum + item.Chance, 0);

export const getItem = () => {
    const rolledChance = Math.random() * TOTAL_CHANCE;
    let currentChance = 0;

    for (const item of ITEM_REGISTRY) {
        currentChance += item.Chance;
        if (rolledChance <= currentChance) {
            return item;
        }
    }

    return ITEM_REGISTRY[0];
};

export const getItemById = (id) => ITEM_REGISTRY.find((item) => item.ID === id);
export const addAllItems = () => {
    ITEM_REGISTRY.forEach((item) => {
        fox.addItem(item);
    });
};

window.getItem = getItem;
window.getItemById = getItemById;
window.triggerFoxCheat = addAllItems;
