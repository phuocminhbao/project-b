import { getRandomEvent } from "../data/events";
import { getItem } from "../data/items";

export const generateItem = () => {
    const gameItem = getItem();
    const roomEvent = getRandomEvent();
};
