import { Hider } from "./Hider";
import penguinAvatar from "../assets/penguin.jpg";
class Penguin extends Hider {
    constructor(possition) {
        super("Trinh Me", penguinAvatar, possition);
    }
}

const penguin = new Penguin([2, 2]);
export { penguin };
