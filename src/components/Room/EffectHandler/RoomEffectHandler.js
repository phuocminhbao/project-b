import { config } from "../../../config/gameConfig";
import { getItem } from "../../../data/items";
import { assignRandomQuestion, mapData, MAX_LENGTH } from "../../../data/map";
import { CharacterPositionSynchronizer } from "../../../helper/CharacterPositionSynchronizer";
import { duck } from "../../../model/Duck";
import { fox } from "../../../model/Fox";
import { penguin } from "../../../model/Penguin";
import { getRandomInt } from "../../../utils/numberUtils";
import { DIRECTION, getLastRoomInDirectionPosition } from "../../../utils/room";

export function createRoomEffectHandler({
    roomSpecialEffectRef,
    refreshScreen,
    openHitWallPopup,
    openPopup,
    disableShop,
    openShop,
}) {
    const isQuestionsReturnItem = () => {
        return roomSpecialEffectRef.current.itemQuestions > 0;
    };

    const increaseQuestionsReturnItem = (amount = 1) => {
        roomSpecialEffectRef.current.itemQuestions += amount;
    };

    const decreaseQuestionsReturnItem = (amount = 1) => {
        increaseQuestionsReturnItem(-amount);
    };

    const isGoToLastRoom = () => {
        return roomSpecialEffectRef.current.isGoToLastRoom;
    };
    const setIsGoToLastRoom = (value) => {
        roomSpecialEffectRef.current.isGoToLastRoom = value;
    };

    const isAnswered = () => {
        return roomSpecialEffectRef.current.isAnswered;
    };
    const setIsAnswered = (value) => {
        roomSpecialEffectRef.current.isAnswered = value;
    };

    const isEventProcessed = () => {
        return roomSpecialEffectRef.current.isEventProcessed;
    };
    const setIsEventProcessed = (value) => {
        roomSpecialEffectRef.current.isEventProcessed = value;
    };

    const resetRoomStateBeforeMoving = () => {
        assignRandomQuestion(fox.Row, fox.Col);
        setIsAnswered(false);
        setIsEventProcessed(false);
        setIsGoToLastRoom(false);
        openShop();
        resetRolls();
    };

    const goToRoom = (row, col) => {
        resetRoomStateBeforeMoving();
        const { IsDuckFound, IsPenguinFound } = CharacterPositionSynchronizer;
        fox.moveTo(row, col);
        CharacterPositionSynchronizer.syncPosition(IsDuckFound, IsPenguinFound);
        makeNextNpcNoHint([row, col]);
        refreshScreen();
    };

    const isHitWall = (row, col) => {
        return row >= MAX_LENGTH || col >= MAX_LENGTH || row < 0 || col < 0;
    };

    const tryToGoNextRoom = ([row, col], cost) => {
        fox.minusPoints(cost);

        if (isHitWall(row, col)) {
            openHitWallPopup();
            return;
        }

        goToRoom(row, col);
    };

    const goToLastRoomInDirection = (direction) => {
        const [row, col] = getLastRoomInDirectionPosition(
            direction,
            fox.Position,
        );
        goToRoom(row, col);
    };

    const setRewardDirection = (direction, giver) => {
        if (!direction || !giver) {
            roomSpecialEffectRef.current.rewardDirection = undefined;
            return;
        }
        roomSpecialEffectRef.current.rewardDirection = { direction, giver };
    };

    const goWrapper = (direction, go) => {
        const { rewardDirection } = roomSpecialEffectRef.current;
        if (!rewardDirection) {
            return go;
        }
        if (direction === rewardDirection?.direction) {
            return () => {
                openPopup({
                    image: rewardDirection.giver.Avatar,
                    text: `${rewardDirection.giver.Name}: Đù chọn đúng nè, để thưởng cho tí items xài chơi`,
                    closeText: "Bú!",
                    closeAction: () => {
                        fox.addItem(getItem());
                        setRewardDirection();
                        go();
                    },
                });
            };
        } else {
            const punisher =
                rewardDirection.giver.Name === duck.Name ? penguin : duck;
            return () => {
                openPopup({
                    image: punisher.Avatar,
                    text: `${punisher.Name}: Hãy chọn giá đúng, m chọn hướng sai thì t bú m ít điểm`,
                    closeText: "Oh mannn, fak u!",
                    closeAction: () => {
                        fox.minusPoints(getRandomInt(1, fox.Points));
                        setRewardDirection();
                        go();
                    },
                });
            };
        }
    };

    const disableDirection = (direction) => {
        roomSpecialEffectRef.current.disableDirection[direction] = true;
    };

    const resetDisableDirection = () => {
        roomSpecialEffectRef.current.disableDirection[DIRECTION.UP] = false;
        roomSpecialEffectRef.current.disableDirection[DIRECTION.DOWN] = false;
        roomSpecialEffectRef.current.disableDirection[DIRECTION.LEFT] = false;
        roomSpecialEffectRef.current.disableDirection[DIRECTION.RIGHT] = false;
    };

    const increaseNPCNoHint = (amount = 1) => {
        roomSpecialEffectRef.current.forceNPCNoHintRemaining += amount;
    };

    const makeNextNpcNoHint = ([row, col]) => {
        const npc = mapData[row][col].npc;
        if (roomSpecialEffectRef.current.forceNPCNoHintRemaining > 0) {
            roomSpecialEffectRef.current.forceNPCNoHintRemaining -= 1;
            !!npc && npc.forceToNotGiveHint();
        }
    };

    const increaseRolls = (amount = 1) => {
        roomSpecialEffectRef.current.maxRolls += amount;
    };

    const decreaseRolls = (amount = 1) => {
        roomSpecialEffectRef.current.maxRolls -= amount;
    };

    const resetRolls = () => {
        roomSpecialEffectRef.current.maxRolls = config.map.rolls;
    };

    return {
        // state accessors
        isQuestionsReturnItem,
        increaseQuestionsReturnItem,
        decreaseQuestionsReturnItem,

        isGoToLastRoom,
        setIsGoToLastRoom,

        isAnswered,
        setIsAnswered,

        isEventProcessed,
        setIsEventProcessed,

        // actions
        goToRoom,
        tryToGoNextRoom,
        goToLastRoomInDirection,
        resetRoomStateBeforeMoving,
        isHitWall,
        refreshScreen,
        setRewardDirection,
        goWrapper,
        disableDirection,
        resetDisableDirection,
        increaseNPCNoHint,
        makeNextNpcNoHint,
        increaseRolls,
        decreaseRolls,
        resetRolls,
    };
}
