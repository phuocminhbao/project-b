export const getNextRoomPosition = (direction, { row, col }) => {
    switch (direction) {
        case "up":
            return [row - 1, col];
        case "down":
            return [row + 1, col];
        case "left":
            return [row, col - 1];
        case "right":
            return [row, col + 1];
        default:
            throw new Error("No direction found");
    }
};

export const getKeyFromKeyCode = (keyCode) => {
    switch (keyCode) {
        case 87: // W
        case 38: // ↑
            return "up";
        case 65: // A
        case 37: // ←
            return "left";
        case 83: // S
        case 40: // ↓
            return "down";
        case 68: // D
        case 39: // →
            return "right";
        default:
            return null;
    }
};
