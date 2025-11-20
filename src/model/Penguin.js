import { Hider } from "./Hider";
import penguinAvatar from "../assets/penguin.jpg";
class Penguin extends Hider {
    constructor(possition) {
        super("Penguin", penguinAvatar, possition);
    }
}

const penguin = new Penguin([2, 2]);
export { penguin };
