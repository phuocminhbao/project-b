import { duck } from "../model/Duck";
import { fox } from "../model/Fox";
import { penguin } from "../model/Penguin";

export class CharacterPositionSynchronizer {
    static get IsDuckFound() {
        return fox.Row === duck.Row && fox.Col === duck.Col;
    }

    static get IsPenguinFound() {
        return fox.Row === penguin.Row && fox.Col === penguin.Col;
    }

    static get IsFoundAll() {
        return this.IsDuckFound && this.IsPenguinFound;
    }

    static syncPosition(isDuckFound, isPenguinFound) {
        if (isDuckFound) {
            duck.moveTo(fox.Row, fox.Col);
            duck.found();
        } else {
            duck.lost();
        }
        if (isPenguinFound) {
            penguin.moveTo(fox.Row, fox.Col);
            penguin.found();
        } else {
            penguin.lost();
        }
    }
}
