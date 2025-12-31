import { MAX_LENGTH } from "../data/map";

export const DIRECTION = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
};

export const getNextRoomPosition = (direction, [row, col]) => {
    switch (direction) {
        case DIRECTION.UP:
            return [row - 1, col];
        case DIRECTION.DOWN:
            return [row + 1, col];
        case DIRECTION.LEFT:
            return [row, col - 1];
        case DIRECTION.RIGHT:
            return [row, col + 1];
        default:
            throw new Error("No direction found");
    }
};

export const getLastRoomInDirectionPosition = (direction, [row, col]) => {
    switch (direction) {
        case DIRECTION.UP:
            return [0, col];
        case DIRECTION.DOWN:
            return [MAX_LENGTH - 1, col];
        case DIRECTION.LEFT:
            return [row, 0];
        case DIRECTION.RIGHT:
            return [row, MAX_LENGTH - 1];
        default:
            throw new Error("No direction found");
    }
};

export const getKeyFromKeyCode = (keyCode) => {
    switch (keyCode) {
        case 87: // W
        case 38: // ↑
            return DIRECTION.UP;
        case 65: // A
        case 37: // ←
            return DIRECTION.LEFT;
        case 83: // S
        case 40: // ↓
            return DIRECTION.DOWN;
        case 68: // D
        case 39: // →
            return DIRECTION.RIGHT;
        default:
            return null;
    }
};
