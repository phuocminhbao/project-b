import EventIcon from "../components/Shared/Icon/Event";
import ItemIcon from "../components/Shared/Icon/Item";
import ShopIcon from "../components/Shared/Icon/Shop";
import { ITEM_RARITY } from "../constant/item";
import { getGoodRandomEvent } from "../data/events";
import { getItem } from "../data/items";
import { getRandomElement } from "../utils/array";
import { getRandomInt } from "../utils/numberUtils";

export const getShopItem = (rolls) => {
    const gameItem = formatGameItem(getItem(), rolls);
    const roomEvent = formatRoomEvent(getGoodRandomEvent(), rolls);
    const shopItem = formatShopItem({}, rolls);
    return getRandomElement([gameItem, roomEvent, shopItem]);
};

const formatGameItem = (gameItem, rolls) => {
    return {
        icon: ItemIcon,
        name: gameItem.Name,
        description: gameItem.Description,
        rollRemaining: rolls,
        type: "item",
        cost: getGameItemCost(gameItem),
        item: gameItem,
    };
};

const getGameItemCost = (gameItem) => {
    switch (gameItem.Rarity) {
        case ITEM_RARITY.COMMON:
            return getRandomInt(0, 5);
        case ITEM_RARITY.UNCOMMON:
            return getRandomInt(5, 10);
        case ITEM_RARITY.RARE:
            return getRandomInt(10, 15);
        case ITEM_RARITY.EPIC:
            return getRandomInt(15, 20);
        case ITEM_RARITY.LEGENDARY:
            return getRandomInt(20, 30);
    }
};

const formatRoomEvent = (roomEvent, rolls) => {
    return {
        icon: EventIcon,
        name: roomEvent.Name,
        description: roomEvent.Description,
        rollRemaining: rolls,
        type: "event",
        cost: getRandomInt(10, 40),
        event: roomEvent,
    };
};

const formatShopItem = (shopItem, rolls) => {
    return {
        icon: ShopIcon,
        name: "Shop's unique item",
        description:
            "under development (can be select but nothing gonna happen)",
        rollRemaining: rolls,
        type: "shop",
        cost: 1,
    };
};
