import { noHintNeededMessage } from "../data/texts";
import { duck } from "../model/Duck";
import { penguin } from "../model/Penguin";
import { getRandomElement, shuffle } from "../utils/array";
import { Hider } from "../model/Hider";
import { getRandomInt, inChanceOf } from "../utils/numberUtils";
import { MAX_LENGTH } from "../data/map";
import { fox } from "../model/Fox";
import { HINT } from "../constant/hint";
export class HintGenerator {
    #isTruth;

    /**
     * @type {Hider}
     */
    #hider;
    constructor(isTruth) {
        this.#isTruth = isTruth;
    }

    #getRandomRoom() {
        return [
            getRandomInt(0, MAX_LENGTH - 1),
            getRandomInt(0, MAX_LENGTH - 1),
        ];
    }

    #getExtractPosition() {
        const getText = (row, col) => {
            return `${this.#hider.Name} đang trốn ở phòng: ${row} - ${col}`;
        };
        if (this.#isTruth) {
            return getText(this.#hider.Row, this.#hider.Col);
        }
        return getText(...this.#getRandomRoom());
    }

    #getRangeOfRooms() {
        const getText = (rooms) => {
            return `${
                this.#hider.Name
            } đang trốn ở 1 trong những phòng này: ${shuffle(rooms)
                .map((room) => room.join(" - "))
                .join(", ")}`;
        };
        const fakeRooms = [
            this.#getRandomRoom(),
            this.#getRandomRoom(),
            this.#getRandomRoom(),
        ];
        if (this.#isTruth) {
            fakeRooms.push([this.#hider.Row, this.#hider.Col]);
        } else {
            fakeRooms.push(this.#getRandomRoom());
        }
        return getText(fakeRooms);
    }

    #getRelativeDirection() {
        const getText = (direction) => {
            return `${this.#hider.Name} đang ở âu đó bên: ${direction}`;
        };
        const trueDirection = (([x1, y1], [x2, y2]) => {
            if (inChanceOf(50)) {
                if (y2 > y1) return "phải";
                if (y2 < y1) return "trái";
            }
            if (x2 < x1) return "trên";
            if (x2 > x1) return "dưới";
            return "phải";
        })([fox.Row, fox.Col], [this.#hider.Row, this.#hider.Col]);
        if (this.#isTruth) {
            return getText(trueDirection);
        }
        const fakeDirection = ["trên", "dưới", "trái", "phải"].filter(
            (direction) => direction !== trueDirection,
        );
        return getText(getRandomElement(fakeDirection));
    }

    #getRelativeDirectionWithDiagonal() {
        const getText = (direction) => {
            return `${this.#hider.Name} đang âu đó ở góc: ${direction}`;
        };
        const trueDirection = (([x1, y1], [x2, y2]) => {
            if (y1 === y2) {
                return x2 < x1 ? "trên" : "dưới";
            }

            // Same row → horizontal only
            if (x1 === x2) {
                return y2 < y1 ? "trái" : "phải";
            }

            const vertical = x2 < x1 ? "trên" : "dưới";
            const horizontal = y2 < y1 ? "trái" : "phải";
            return `${vertical} và ${horizontal}`;
        })([fox.Row, fox.Col], [this.#hider.Row, this.#hider.Col]);
        if (this.#isTruth) {
            return getText(trueDirection);
        }
        const fakeDirection = [
            "trên và trái",
            "trên và phải",
            "dưới và trái",
            "dưới và phải",
        ].filter((direction) => direction !== trueDirection);
        return getText(getRandomElement(fakeDirection));
    }

    #getDistance() {
        const getText = (distance) => {
            return `${this.#hider.Name} đang trốn cách bạn ${distance} phòng`;
        };
        const trueDistance =
            Math.abs(this.#hider.Row - fox.Row) +
            Math.abs(this.#hider.Col - fox.Col);
        if (this.#isTruth) {
            return getText(trueDistance);
        }
        const fakeDistance = getRandomInt(0, MAX_LENGTH * MAX_LENGTH - 1);
        return getText(fakeDistance);
    }

    #getRowColumnAlignmentFox() {
        const [sameColumn, sameRow, noAlignment] = [
            `fox đang ở trên cùng hàng với ${this.#hider.Name}`,
            `fox đang ở trong cùng cột với ${this.#hider.Name}`,
            `fox đang ko ở cùng hàng và cột với ${this.#hider.Name}`,
        ];
        let text;
        if (fox.Row === this.#hider.Row) {
            text = sameColumn;
        }
        if (fox.Col === this.#hider.Col) {
            text = sameRow;
        }
        text = noAlignment;
        if (this.#isTruth) {
            return text;
        }
        const fakeAlignments = [sameColumn, sameRow, noAlignment].filter(
            (t) => t !== text,
        );
        return getRandomElement(fakeAlignments);
    }

    #getRowColumnAlignmentHiders() {
        const [sameColumn, sameRow, noAlignment] = [
            `${duck.Name} đang ở trên cùng hàng với ${penguin.Name}`,
            `${duck.Name} đang ở trong cùng cột với ${penguin.Name}`,
            `${duck.Name} đang ko ở cùng hàng và cột với ${penguin.Name}`,
        ];
        let text;
        if (duck.Row === penguin.Row) {
            text = sameRow;
        }
        if (duck.Col === penguin.Col) {
            text = sameColumn;
        }
        text = noAlignment;
        if (this.#isTruth) {
            return text;
        }
        const fakeAlignments = [sameColumn, sameRow, noAlignment].filter(
            (t) => t !== text,
        );
        return getRandomElement(fakeAlignments);
    }

    #getRowColumnDiff() {
        const getText = (
            [vertical, verticalDistance],
            [horizontal, horizontalDistance],
        ) => {
            return `${
                this.#hider.Name
            } is ${verticalDistance} tiles ${vertical} you and ${horizontalDistance} tiles to your ${horizontal}`;
        };
        const res = (([x1, y1], [x2, y2]) => {
            const rowDir = x2 < x1 ? "above" : x2 > x1 ? "bellow" : "above";
            const colDir = y2 < y1 ? "left" : y2 > y1 ? "right" : "right";

            const rowDist = Math.abs(x2 - x1);
            const colDist = Math.abs(y2 - y1);

            return [
                [rowDir, rowDist],
                [colDir, colDist],
            ];
        })([fox.Row, fox.Col], [this.#hider.Row, this.#hider.Col]);
        if (this.#isTruth) {
            return getText(...res);
        }
        return getText(
            [
                getRandomElement(["above", "bellow"]),
                getRandomInt(0, MAX_LENGTH),
            ],
            [getRandomElement(["left", "right"]), getRandomInt(0, MAX_LENGTH)],
        );
    }

    #getHidingAtConner() {
        const getText = (conner) => {
            if (!conner) {
                return `${this.#hider.Name} is not hiding at any conner`;
            }
            return `${this.#hider.Name} is hiding at conner: ${conner}`;
        };
        const conner = (() => {
            if (this.#hider.Row === 0 && this.#hider.Col === 0) {
                return "top left";
            }
            if (this.#hider.Row === 0 && this.#hider.Col === MAX_LENGTH) {
                return "top right";
            }
            if (this.#hider.Row === MAX_LENGTH && this.#hider.Col === 0) {
                return "down left";
            }
            if (
                this.#hider.Row === MAX_LENGTH &&
                this.#hider.Col === MAX_LENGTH
            ) {
                return "down right";
            }
            return;
        })();
        if (this.#isTruth) {
            return getText(conner);
        }
        return getText(
            getRandomElement([
                "top left",
                "top right",
                "down left",
                "down right",
            ]),
        );
    }

    /**
     * @param {HINT} hint - The type of hint to generate.
     * @returns {string} - The generated hint string.
     */
    getHint(hint) {
        if (duck.IsFound && penguin.IsFound) {
            return getRandomElement(noHintNeededMessage);
        }
        this.#assignHider();
        switch (hint) {
            case HINT.EXTRACT_POSITION:
                return this.#getExtractPosition();
            case HINT.RANGE_OF_ROOMS:
                return this.#getRangeOfRooms();
            case HINT.RELATIVE_DIRECTION:
                return this.#getRelativeDirection();
            case HINT.RELATIVE_DIRECTION_DIAGONAL:
                return this.#getRelativeDirectionWithDiagonal();
            case HINT.DISTANCE:
                return this.#getDistance();
            case HINT.ROW_COLUMN_ALIGNMENT_FOX:
                return this.#getRowColumnAlignmentFox();
            case HINT.ROW_COLUMN_ALIGNMENT_HIDERS:
                return this.#getRowColumnAlignmentHiders();
            case HINT.ROW_COLUMN_DIFF:
                return this.#getRowColumnDiff();
            case HINT.HIDING_AT_CONNER:
                return this.#getHidingAtConner();
        }
        return "Something wrong no hint right now";
    }

    #assignHider() {
        if (duck.IsFound && !penguin.IsFound) {
            this.#hider = penguin;
        } else if (!duck.IsFound && penguin.IsFound) {
            this.#hider = duck;
        } else {
            this.#hider = getRandomElement([duck, penguin]);
        }
    }
}
