import EventIcon from "../components/Shared/Icon/Event";
import ItemIcon from "../components/Shared/Icon/Item";
import ShopIcon from "../components/Shared/Icon/Shop";
import { getRandomEvent } from "../data/events";
import { getItem } from "../data/items";
import { getRandomElement } from "../utils/array";

export const getShopItem = (rolls) => {
    const gameItem = formatGameItem(getItem(), rolls);
    const roomEvent = formatRoomEvent(getRandomEvent(), rolls);
    const shopItem = formatShopItem({}, rolls);
    return getRandomElement([gameItem, roomEvent, shopItem]);
};

const formatGameItem = (gameItem, rolls) => {
    return {
        icon: ItemIcon,
        name: gameItem.Name,
        description: gameItem.Description,
        rollRemaining: rolls,
    };
};

const formatRoomEvent = (roomEvent, rolls) => {
    return {
        icon: EventIcon,
        name: roomEvent.Name,
        description: roomEvent.Description,
        rollRemaining: rolls,
    };
};

const formatShopItem = (shopItem, rolls) => {
    return {
        icon: ShopIcon,
        name: "shopItem.name",
        description: "shopItem.description",
        rollRemaining: rolls,
    };
};
