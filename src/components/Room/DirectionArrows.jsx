import Arrow from "../Arrow/Arrow";

const DirectionArrows = ({ nextRoomsInfos }) => {
    return nextRoomsInfos.map((roomInfo) => {
        const { direction, cost, go } = roomInfo;
        return (
            <Arrow
                key={direction}
                direction={direction}
                cost={cost}
                onClick={go}
            />
        );
    });
};
export default DirectionArrows;
