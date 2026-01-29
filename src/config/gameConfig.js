import { HINT } from "../constant/hint";
import { ITEM_ID } from "../constant/item";

export const configLable = {
    notGetNPC: "Percent of NPC not appear when enter a room",
    getSpecialQuestion:
        "Percent of a special question is replace the normal question when enter a room",
    generateEvent: "Percent of an event appear when enter a room",

    points: "Starting points",
    shield: "Starting shield",
    depression: "Starting depression",

    givingHint: "Percent of an NPC is giving hint when enter a room",
    trueHint: "Percent of appeared hint will be true",
};

const defaultConfig = {
    map: {
        size: 5,
        probability: {
            notGetNPC: 40,
            getSpecialQuestion: 20,
            generateEvent: 30,
        },
        rolls: 1,
        maxRoomCost: 15,
    },
    fox: {
        points: 20,
        shield: 0,
        depression: 0,
    },
    item: {
        rarelity: {
            [ITEM_ID.CURRENT_POSITION]: 60,
            [ITEM_ID.TELEPORT_HIDER]: 4,
            [ITEM_ID.TELEPORT_HIDER_TO_EXIT]: 10,
            [ITEM_ID.FREE_POINTS]: 60,
            [ITEM_ID.JUMP_CONNER]: 35,
            [ITEM_ID.GACHA_TELEPORT_OR_DEAD]: 49,
            [ITEM_ID.SEE_THE_TRUTH]: 30,
            [ITEM_ID.LOSING_POINTS_SHIELD]: 40,
            [ITEM_ID.QUESTION_RETURN_ITEM]: 20,
            [ITEM_ID.GET_RANDOM_ITEM]: 15,
            [ITEM_ID.SAITAMA]: 10,
            [ITEM_ID.NPC_SUMMON]: 35,
        },
        probability: {
            [ITEM_ID.GACHA_TELEPORT_OR_DEAD]: 15,
            [ITEM_ID.TELEPORT_HIDER_TO_EXIT]: 15,
        },
    },
    hint: {
        rarelity: {
            [HINT.EXTRACT_POSITION]: 1.69,
            [HINT.RANGE_OF_ROOMS]: 40,
            [HINT.RELATIVE_DIRECTION]: 35,
            [HINT.RELATIVE_DIRECTION_DIAGONAL]: 25,
            [HINT.DISTANCE]: 30,
            [HINT.ROW_COLUMN_ALIGNMENT_FOX]: 30,
            [HINT.ROW_COLUMN_ALIGNMENT_HIDERS]: 50,
            [HINT.ROW_COLUMN_DIFF]: 10,
            [HINT.HIDING_AT_CONNER]: 60,
        },
    },
    npc: {
        givingHint: 50,
        trueHint: 50,
    },
};

const createDeepProxy = (obj, onChange) => {
    return new Proxy(obj, {
        get(target, key) {
            const value = target[key];

            if (typeof value === "object" && value !== null) {
                return createDeepProxy(value, onChange);
            }

            return value;
        },
        set(target, key, value) {
            target[key] = value;
            onChange();
            return true;
        },
    });
};

let saveScheduled = false;

const save = () => {
    if (saveScheduled) return;
    saveScheduled = true;

    queueMicrotask(() => {
        localStorage.setItem("config", JSON.stringify(config));
        console.log("config saved");
        saveScheduled = false;
    });
};

const config = (() => {
    const localStorageConfig = localStorage.getItem("config");
    if (!localStorageConfig) {
        return structuredClone(defaultConfig);
    }
    return JSON.parse(localStorageConfig);
})();

const confixProxy = createDeepProxy(config, save);

export { confixProxy as config };
