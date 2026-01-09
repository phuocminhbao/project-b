import { duck } from "../model/Duck";
import { fox } from "../model/Fox";
import { GameItem } from "../model/GameItem";
import { penguin } from "../model/Penguin";
import { MAX_LENGTH } from "./map";

export const ITEM_ID = {
    CURRENT_POSITION: "current_position",
    TELEPORT_HIDER: "teleport_hider",
    TELEPORT_HIDER_TO_EXIT: "teleport_hider_to_exit",
    FREE_POINTS: "free_points",
    JUMP_CONNER: "jump_conner",
    GACHA_TELEPORT_OR_DEAD: "gacha_teleport_or_dead",
    SEE_THE_TRUTH: "see_the_truth",
    LOSING_POINTS_SHIELD: "losing_points_shield",
    QUESTION_RETURN_ITEM: "question_return_item",
    GET_RANDOM_ITEM: "get_random_item",
    SAITAMA: "saitama",
};

export const ITEM_REGISTRY = [
    new GameItem({
        id: ITEM_ID.CURRENT_POSITION,
        name: "Người anh em ở đâu - Đầu cắt moi",
        description: "Knowing the current room position",
        chance: 60,
    }),

    new GameItem({
        id: ITEM_ID.TELEPORT_HIDER,
        name: "Kuchiyose no Jutsu",
        description: `Teleport ${duck.Name} or ${penguin.Name} to the current room`,
        chance: 4,
    }),

    new GameItem({
        id: ITEM_ID.TELEPORT_HIDER_TO_EXIT,
        name: "Room: Shambles",
        description: `Teleport ${duck.Name} or ${penguin.Name} to the exit, there is 5% both of them will go together`,
        chance: 10,
    }),

    new GameItem({
        id: ITEM_ID.FREE_POINTS,
        name: "Mỡ đấy húp đi",
        description: "Receive a random number of points (0-15)",
        chance: 60,
    }),

    new GameItem({
        id: ITEM_ID.JUMP_CONNER,
        name: "Về góc chơi đi con",
        description: `${fox.Name} jumps to a random corner room (0-0, 0-${MAX_LENGTH}, ${MAX_LENGTH}-0, ${MAX_LENGTH}-${MAX_LENGTH})`,
        chance: 35,
    }),

    new GameItem({
        id: ITEM_ID.GACHA_TELEPORT_OR_DEAD,
        name: "It's GACHA time",
        description: `High risk high reward: 15% that both ${duck.Name} and ${penguin.Name} summon to current room, else you lose 9999 points`,
        chance: 49,
    }),

    new GameItem({
        id: ITEM_ID.SEE_THE_TRUTH,
        name: "The Seer",
        description: "Knowing if the current NPC is telling truth",
        chance: 30,
    }),

    new GameItem({
        id: ITEM_ID.LOSING_POINTS_SHIELD,
        name: "Aaaaaa tao có khiênnn!",
        description:
            "The next time losing points, you will lose 0 points instead",
        chance: 40,
    }),

    new GameItem({
        id: ITEM_ID.QUESTION_RETURN_ITEM,
        name: "Knowledge is power",
        description:
            "Answering the next question, if it correct then you will get an item instead of points",
        chance: 20,
    }),

    new GameItem({
        id: ITEM_ID.GET_RANDOM_ITEM,
        name: "Random.org",
        description: "Receive a random item",
        chance: 15,
    }),

    new GameItem({
        id: ITEM_ID.SAITAMA,
        name: "Saitama",
        description:
            "One punch break through all ahead walls, the next move will take you to the last room in the same direction without any cost",
        chance: 10,
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
