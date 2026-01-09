import { assignRandomQuestion, MAX_LENGTH } from "../../../data/map";
import { CharacterPositionSynchronizer } from "../../../helper/CharacterPositionSynchronizer";
import { fox } from "../../../model/Fox";
import { getLastRoomInDirectionPosition } from "../../../utils/room";

export function createRoomEffectHandler({
    roomSpecialEffectRef,
    refreshScreen,
    openHitWallPopup,
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
    };

    const goToRoom = (row, col) => {
        resetRoomStateBeforeMoving();
        const { IsDuckFound, IsPenguinFound } = CharacterPositionSynchronizer;
        fox.moveTo(row, col);
        CharacterPositionSynchronizer.syncPosition(IsDuckFound, IsPenguinFound);
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
            fox.Position
        );
        goToRoom(row, col);
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
    };
}
