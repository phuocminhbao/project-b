import { EVENT_ID } from "../../../data/events";
import { addAllItems } from "../../../data/items";
import {
    assignDuck,
    assignFox,
    assignPenguin,
    mapData,
    MAX_LENGTH,
} from "../../../data/map";
import { duck } from "../../../model/Duck";
import { fox } from "../../../model/Fox";
import { penguin } from "../../../model/Penguin";
import { getRandomElement } from "../../../utils/array";
import { getRandomInt } from "../../../utils/numberUtils";
import { DIRECTION } from "../../../utils/room";

export const getRoomEventHandler = ({ roomEffectHandler, openPopup }) => {
    const closeEventPopup = () => {
        roomEffectHandler.setIsEventProcessed(true);
        roomEffectHandler.refreshScreen();
    };

    const itemHandlerMap = {
        [EVENT_ID.FOX_OVERTHINKING]: () => {
            assignFox();
        },
        [EVENT_ID.FOX_DEPRESSION]: () => {
            fox.gainDepression(2);
        },
        [EVENT_ID.HAPPY_BIRTHDAY]: () => {
            addAllItems();
        },
        [EVENT_ID.FOX_GOING_HOME]: () => {
            roomEffectHandler.goToRoom(0, 0);
        },
        [EVENT_ID.FOX_LOSE_ALL_ITEMS]: () => {
            fox.resetItems();
        },
        [EVENT_ID.THANOS_SNAP]: () => {
            for (let i = 1; i < fox.TotalItemsQuantity; i++) {
                const randomItem = getRandomElement(fox.Items);
                fox.removeItem(randomItem);
            }
            // Todo remove hints in note
        },
        [EVENT_ID.MORE_ROLLS]: () => {
            // Todo
        },
        [EVENT_ID.DOUBLE_COST]: () => {
            fox.addMinusPointAdjustment(2);
        },
        [EVENT_ID.FOX_COOL_GUY]: () => {
            const ps4AndNgan = [];
            for (let i = 0; i < MAX_LENGTH; i++) {
                for (let j = 0; j < MAX_LENGTH; j++) {
                    const roomData = mapData[i][j];
                    if ([12, 13].includes(roomData.npc?.ID)) {
                        ps4AndNgan.push(roomData.npc);
                    }
                }
            }
            ps4AndNgan.forEach((npc) => {
                npc.forceToGiveHint(true);
            });
        },
        [EVENT_ID.F_CREDIT_CARD]: () => {
            fox.addShield(3);
        },
        [EVENT_ID.F_LAZY]: () => {
            fox.minusPoints(999999);
        },
        [EVENT_ID.F_LONELY]: () => {
            // Todo
        },
        [EVENT_ID.D_P_EARTHQUAKE]: () => {
            assignDuck();
            assignPenguin();
        },
        [EVENT_ID.D_P_FIGHTING]: () => {
            assignDuck();
        },
        [EVENT_ID.D_P_DIFFERENT_OPINIONS]: () => {
            const correctDirection = getRandomElement([
                DIRECTION.UP,
                DIRECTION.DOWN,
            ]);
            roomEffectHandler.setRewardDirection(
                correctDirection,
                correctDirection === DIRECTION.UP ? duck : penguin
            );
        },
        [EVENT_ID.D_P_CHILDISH]: () => {
            fox.minusPoints(10);
        },
        [EVENT_ID.D_P_CURIOUS]: () => {
            fox.addMinusPointAdjustment(3);
        },
        [EVENT_ID.P_HEAVY]: () => {
            // Todo
        },
        [EVENT_ID.P_HURT_WORDS]: () => {
            fox.minusPoints(5);
        },
        [EVENT_ID.P_LOST_WEAPON]: () => {
            // Todo
        },
        [EVENT_ID.P_JOIN_DUCK]: () => {
            penguin.moveTo(duck.Row, duck.Col);
        },
        [EVENT_ID.P_BIG_BOSS]: () => {
            // Todo
        },
        [EVENT_ID.D_SILENT_TREATMENT]: () => {
            // Todo
        },
        [EVENT_ID.D_MYSTERIOUS]: () => {
            const randomHideTimes = getRandomInt(0, fox.TotalItemsQuantity);
            for (let i = 1; i < randomHideTimes; i++) {
                const randomItem = getRandomElement(fox.Items);
                fox.removeItem(randomItem);
            }
        },
        [EVENT_ID.D_GENEROUS]: () => {
            // Todo
        },
        [EVENT_ID.D_NO_COMMENT]: () => {
            const randomDirection = getRandomElement([
                DIRECTION.UP,
                DIRECTION.DOWN,
                DIRECTION.LEFT,
                DIRECTION.RIGHT,
            ]);
            roomEffectHandler.setRewardDirection(randomDirection, duck);
        },
        [EVENT_ID.D_DUCKING]: () => {
            // Todo
        },
    };

    const handleRoomEvent = (event) => {
        itemHandlerMap[event.ID]();
        closeEventPopup();
    };
    return { handleRoomEvent };
};
