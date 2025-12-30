import { duck } from "../model/Duck";
import { fox } from "../model/Fox";
import { penguin } from "../model/Penguin";
import { MAX_LENGTH } from "./map";

export const ITEM = {
    CURRENT_POSITION: "current_position",
    TELEPORT_HIDER: "teleport_hider",
    FREE_POINTS: "free_points",
    JUMP_CONNER: "jump_conner",
    GACHA_TELEPORT_OR_DEAD: "gacha_teleport_or_dead",
    SEE_THE_TRUTH: "see_the_truth",
    LOSING_POINTS_SHIELD: "losing_points_shield",
    QUESTION_RETURN_ITEM: "question_return_item",
    GET_RANDOM_ITEM: "get_random_item",
    SAITAMA: "saitama",
};

const ITEM_DESCRIPTIONS = {
    [ITEM.CURRENT_POSITION]: "Knowing the current room position",
    [ITEM.TELEPORT_HIDER]: `Teleport ${duck.Name} or ${penguin.Name} to the current room`,
    [ITEM.FREE_POINTS]: "Receive a random number of points (0-15)",
    [ITEM.JUMP_CONNER]: `${fox.Name} jumps to a random corner room (0-0, 0-${MAX_LENGTH}, ${MAX_LENGTH}-0, ${MAX_LENGTH}-${MAX_LENGTH})`,
    [ITEM.GACHA_TELEPORT_OR_DEAD]: `High risk high reward: 15% that both ${duck.Name} and ${penguin.Name} summon to current room, else you lose 9999 points`,
    [ITEM.SEE_THE_TRUTH]: "Knowing if the current NPC is telling truth",
    [ITEM.LOSING_POINTS_SHIELD]:
        "The next time losing points, you will lose 0 points instead",
    [ITEM.QUESTION_RETURN_ITEM]:
        "Answering the next question, if it correct then you will get an item instead of points",
    [ITEM.GET_RANDOM_ITEM]: "Receive a random item",
    [ITEM.SAITAMA]:
        "One punch break through all ahead walls, the next move will take you to the last room in the same direction",
};

const ITEM_NAME = {
    [ITEM.CURRENT_POSITION]: "Người anh em ở đâu - Đầu cắt moi",
    [ITEM.TELEPORT_HIDER]: "Kuchiyose no Jutsu",
    [ITEM.FREE_POINTS]: "Mỡ đấy húp đi",
    [ITEM.JUMP_CONNER]: "Về góc chơi đi con",
    [ITEM.GACHA_TELEPORT_OR_DEAD]: "It's GACHA time",
    [ITEM.SEE_THE_TRUTH]: "The Seer",
    [ITEM.LOSING_POINTS_SHIELD]: "Aaaaaa tao có khiênnn!",
    [ITEM.QUESTION_RETURN_ITEM]: "Knowledge is power",
    [ITEM.GET_RANDOM_ITEM]: "Random.org",
    [ITEM.SAITAMA]: "Saitama",
};

const items = [
    {
        name: ITEM.CURRENT_POSITION,
        chance: 60,
    },
    {
        name: ITEM.TELEPORT_HIDER,
        chance: 4,
    },
    {
        name: ITEM.FREE_POINTS,
        chance: 60,
    },
    {
        name: ITEM.JUMP_CONNER,
        chance: 35,
    },
    {
        name: ITEM.GACHA_TELEPORT_OR_DEAD,
        chance: 60,
    },
    {
        name: ITEM.SEE_THE_TRUTH,
        chance: 30,
    },
    {
        name: ITEM.LOSING_POINTS_SHIELD,
        chance: 40,
    },
    {
        name: ITEM.QUESTION_RETURN_ITEM,
        chance: 20,
    },
    {
        name: ITEM.GET_RANDOM_ITEM,
        chance: 15,
    },
    {
        name: ITEM.SAITAMA,
        chance: 10,
    },
];

export const ITEM_RARITY = {
    COMMON: "common",
    UNCOMMON: "uncommon",
    RARE: "rare",
    EPIC: "epic",
    LEGENDARY: "legendary",
};

const RARITY_THRESHOLDS = {
    LEGENDARY_MAX: 5,
    EPIC_MAX: 10,
    RARE_MAX: 20,
    UNCOMMON_MAX: 50,
    COMMON_MAX: 100,
};

const getItemRarity = (chance) => {
    if (chance < 0 || chance > RARITY_THRESHOLDS.COMMON_MAX) {
        throw new Error("Chance must be between 0 and 100");
    }

    if (chance <= RARITY_THRESHOLDS.LEGENDARY_MAX) {
        return ITEM_RARITY.LEGENDARY;
    }

    if (chance <= RARITY_THRESHOLDS.EPIC_MAX) {
        return ITEM_RARITY.EPIC;
    }

    if (chance <= RARITY_THRESHOLDS.RARE_MAX) {
        return ITEM_RARITY.RARE;
    }

    if (chance <= RARITY_THRESHOLDS.UNCOMMON_MAX) {
        return ITEM_RARITY.UNCOMMON;
    }

    return ITEM_RARITY.COMMON;
};

const totalChances = items.reduce((total, item) => total + item.chance, 0);

const getItemInfo = (item) => {
    return {
        name: ITEM_NAME[item.name] ?? "Unknown Item",
        description: ITEM_DESCRIPTIONS[item.name] ?? "Unknown Item",
        rarity: getItemRarity(item.chance),
    };
};

export const getItem = () => {
    const randomChance = Math.random() * totalChances;
    let currentChance = 0;
    for (let i = 0; i < items.length; i++) {
        currentChance += items[i].chance;
        if (randomChance <= currentChance) {
            return getItemInfo(items[i]);
        }
    }
    return getItemInfo(ITEM.FREE_POINTS);
};
