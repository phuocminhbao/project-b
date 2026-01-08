import { assignRandomQuestion, MAX_LENGTH } from "../../../data/map";
import { CharacterPositionSynchronizer } from "../../../helper/CharacterPositionSynchronizer";
import { fox } from "../../../model/Fox";
import { getLastRoomInDirectionPosition } from "../../../utils/room";

export function createRoomEffectHandler({
    roomSpecialEffectRef,
    refreshScreen,
    openHitWallPopup,
}) {
    // "private" via closure
    const _roomSpecialEffectRef = roomSpecialEffectRef;

    const isQuestionsReturnItem = () => {
        return _roomSpecialEffectRef.current.itemQuestions > 0;
    };

    const increaseQuestionsReturnItem = (amount = 1) => {
        _roomSpecialEffectRef.current.itemQuestions += amount;
    };

    const decreaseQuestionsReturnItem = (amount = 1) => {
        increaseQuestionsReturnItem(-amount);
    };

    const isGoToLastRoom = () => {
        return _roomSpecialEffectRef.current.isGoToLastRoom;
    };

    const setIsGoToLastRoom = (value) => {
        _roomSpecialEffectRef.current.isGoToLastRoom = value;
    };

    const isAnswered = () => {
        return _roomSpecialEffectRef.current.isAnswered;
    };

    const setIsAnswered = (value) => {
        _roomSpecialEffectRef.current.isAnswered = value;
    };

    const goToRoom = (row, col) => {
        const { IsDuckFound, IsPenguinFound } = CharacterPositionSynchronizer;
        fox.moveTo(row, col);
        CharacterPositionSynchronizer.syncPosition(IsDuckFound, IsPenguinFound);
        refreshScreen();
    };

    const resetCurrentRoom = () => {
        assignRandomQuestion(fox.Row, fox.Col);
        setIsAnswered(false);
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

        resetCurrentRoom();
        goToRoom(row, col);
    };

    const goToLastRoomInDirection = (direction) => {
        const [row, col] = getLastRoomInDirectionPosition(
            direction,
            fox.Position
        );

        resetCurrentRoom();
        setIsGoToLastRoom(false);
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

        // actions
        goToRoom,
        tryToGoNextRoom,
        goToLastRoomInDirection,
        resetCurrentRoom,
        isHitWall,
        refreshScreen,
    };
}
