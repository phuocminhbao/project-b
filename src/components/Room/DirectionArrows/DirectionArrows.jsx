import { mapData } from "../../../data/map";
import { getRandomInt } from "../../../utils/numberUtils";
import { getNextRoomPosition } from "../../../utils/room";
import Arrow from "../../Arrow/Arrow";

const DirectionArrows = ({ currentPosition, goNextRoom }) => {
    return ["up", "down", "left", "right"].map((direction) => {
        const [row, col] = getNextRoomPosition(direction, currentPosition);
        const cost = mapData[row]?.[col]?.cost ?? getRandomInt(1, 5);
        return (
            <Arrow
                key={direction}
                direction={direction}
                cost={cost}
                onClick={() => {
                    goNextRoom([row, col], cost);
                }}
            />
        );
    });
};
export default DirectionArrows;
