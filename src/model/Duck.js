import { Hider } from "./Hider";
import duckAvatar from "../assets/animalsduck.jpg";
class Duck extends Hider {
    constructor(possition) {
        super("Serious Duck", duckAvatar, possition);
    }
}

const duck = new Duck([1, 1]);
export { duck };
