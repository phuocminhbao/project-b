import { HINT } from "../constant/hint";
import { ITEM_ID } from "../constant/item";

const config = {
    map: {
        size: 5,
        probability: {
            notGetNPC: 40,
            getSpecialQuestion: 20,
            // Todo: 30 chance
            generateEvent: 0,
        },
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
        },
        probability: {
            [ITEM_ID.GACHA_TELEPORT_OR_DEAD]: 15,
            [ITEM_ID.TELEPORT_HIDER_TO_EXIT]: 5,
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
};

export { config };
