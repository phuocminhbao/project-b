import { getItem, ITEM_ID } from "../../../data/items";
import { CORNERS, mapData } from "../../../data/map";
import { CharacterPositionSynchronizer } from "../../../helper/CharacterPositionSynchronizer";
import { duck } from "../../../model/Duck";
import { fox } from "../../../model/Fox";
import { penguin } from "../../../model/Penguin";
import { getRandomElement } from "../../../utils/array";
import { getRandomInt, inChanceOf } from "../../../utils/numberUtils";

export const getItemEffectHandler = ({ roomEffectHandler, openPopup }) => {
    const { npc } = mapData[fox.Row][fox.Col];
    const itemHandlerMap = {
        [ITEM_ID.CURRENT_POSITION]: () => {
            openPopup({
                image: fox.Avatar,
                text: `Oh, mình đang ở phòng: ${fox.Row} - ${fox.Col}`,
            });
        },
        [ITEM_ID.SEE_THE_TRUTH]: () => {
            if (!npc) {
                openPopup({
                    image: fox.Avatar,
                    text: "Ụa ngu òi, phòng này làm j có NPC :(",
                });
                return;
            }
            const truthText = "Bro, I'm telling truth, trust me!";
            const liesText = `Heheeee t bịp m á, tại bị súi bởi ${penguin.Name} - Vua bịp`;
            openPopup({
                image: npc.Avatar,
                text: `${npc.IsTellingTruth ? truthText : liesText}`,
            });
            return;
        },
        [ITEM_ID.FREE_POINTS]: () => {
            const randomPoints = getRandomInt(0, 15);
            fox.addPoints(randomPoints);
            openPopup({
                image: fox.Avatar,
                text: `Nine sừ, cảm thấy hưng phấn dc tăng thêm ${randomPoints} điểm`,
            });
        },
        [ITEM_ID.GET_RANDOM_ITEM]: () => {
            const randomItem = getItem();
            fox.addItem(randomItem);
            openPopup({
                image: fox.Avatar,
                text: `Tuyệt vời, thêm đồ để chiến: ${randomItem.Name}`,
            });
        },
        [ITEM_ID.JUMP_CONNER]: () => {
            const corner = getRandomElement(CORNERS);
            const cost = mapData[corner[0]][corner[1]].cost;
            roomEffectHandler.tryToGoNextRoom(corner, cost);
        },
        [ITEM_ID.LOSING_POINTS_SHIELD]: () => {
            fox.addShield();
            roomEffectHandler.refreshScreen();
        },
        [ITEM_ID.GACHA_TELEPORT_OR_DEAD]: () => {
            const isWin = inChanceOf(15);
            if (!isWin) {
                fox.minusPoints(9999);
            } else if (CharacterPositionSynchronizer.IsFoundAll) {
                openPopup({
                    image: duck.Avatar,
                    text: "Ei bọn t ở ây sẵn mà, chơi lìu v bro!",
                });
            } else {
                !CharacterPositionSynchronizer.IsDuckFound &&
                    duck.jumpToFoxRoom();
                !CharacterPositionSynchronizer.IsPenguinFound &&
                    penguin.jumpToFoxRoom();
            }
            roomEffectHandler.refreshScreen();
        },
        [ITEM_ID.TELEPORT_HIDER]: () => {
            if (
                CharacterPositionSynchronizer.IsDuckFound &&
                CharacterPositionSynchronizer.IsPenguinFound
            ) {
                openPopup({
                    image: penguin.Avatar,
                    text: "Ei bọn t ở ây sẵn mà, m hơi giàu òi ấy!",
                });
            } else if (!CharacterPositionSynchronizer.IsFoundAll) {
                getRandomElement([duck, penguin]).jumpToFoxRoom();
            } else {
                !CharacterPositionSynchronizer.IsDuckFound &&
                    duck.jumpToFoxRoom();
                !CharacterPositionSynchronizer.IsPenguinFound &&
                    penguin.jumpToFoxRoom();
            }
            roomEffectHandler.refreshScreen();
        },
        [ITEM_ID.TELEPORT_HIDER_TO_EXIT]: () => {
            const [exitRow, exitCol] = CORNERS.find(
                (corner) => mapData[corner[0]][corner[1]].isExit
            );
            if (inChanceOf(5)) {
                duck.moveTo(exitRow, exitCol);
                penguin.moveTo(exitRow, exitCol);
            } else {
                const hider = getRandomElement([duck, penguin]);
                hider.moveTo(exitRow, exitCol);
            }
            roomEffectHandler.refreshScreen();
        },
        [ITEM_ID.QUESTION_RETURN_ITEM]: () => {
            roomEffectHandler.increaseQuestionsReturnItem();
            roomEffectHandler.refreshScreen();
        },
        [ITEM_ID.SAITAMA]: () => {
            roomEffectHandler.setIsGoToLastRoom(true);
        },
    };
    const handleItemSelect = (item) => {
        console.log(item.ID);
        fox.removeItem(item);
        itemHandlerMap[item.ID]();
    };
    return { handleItemSelect };
};
