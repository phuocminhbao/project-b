import Arrow from "../Arrow/Arrow";

const DirectionArrows = ({ nextRoomsInfos }) => {
    return nextRoomsInfos.map((roomInfo) => {
        const { direction, cost, go, isDisable } = roomInfo;
        return (
            <Arrow
                key={direction}
                direction={direction}
                cost={cost}
                onClick={go}
                isDisable={isDisable}
            />
        );
    });
};
export default DirectionArrows;
