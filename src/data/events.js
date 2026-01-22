import { EVENT_ID, EVENT_SYMBOL } from "../constant/event";
import { CharacterPositionSynchronizer } from "../helper/CharacterPositionSynchronizer";
import { duck } from "../model/Duck";
import { fox } from "../model/Fox";
import { penguin } from "../model/Penguin";
import { EVENT_TYPE, RoomEvent } from "../model/RoomEvent";
import { getRandomElement } from "../utils/array";
const foxName = fox.Name;
const penguinName = penguin.Name;
const duckName = duck.Name;

/**
 * @param {string} eventID
 * @returns {boolean}
 */
const isEventAvailable = (eventID) => {
    const symbol = eventID.split("_");
    const { IsDuckFound, IsPenguinFound, IsFoundAll } =
        CharacterPositionSynchronizer;
    if (symbol === EVENT_SYMBOL.ALL) {
        return IsFoundAll;
    }
    if (symbol === EVENT_SYMBOL.FOX) {
        return !IsDuckFound && !IsPenguinFound;
    }
    if (symbol === EVENT_SYMBOL.DUCK) {
        return !IsFoundAll && IsDuckFound;
    }
    if (symbol == EVENT_SYMBOL.PENGUIN) {
        return !IsFoundAll && IsPenguinFound;
    }
    return true;
};

export const EVENT_REGISTRY = [
    new RoomEvent({
        id: EVENT_ID.FOX_OVERTHINKING,
        name: `${foxName} Overthinking`,
        description: `${foxName} is overthinking about life, panic then run into a random room.`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.FOX_DEPRESSION,
        name: `${foxName} Depression`,
        description: `${foxName} is depressed, can't gain any points for next 2 points reward`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.HAPPY_BIRTHDAY,
        name: `Happy Birthday ${foxName}!`,
        description: `It's ${foxName}'s birthday! A gift of every items is given to you.`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.FOX_GOING_HOME,
        name: "Going Home",
        description: `${foxName} is going home, the current room is now 0-0.`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.FOX_LOSE_ALL_ITEMS,
        name: "Có cho có trả",
        description: `${foxName} is so clumsy that all items are lost.`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.THANOS_SNAP,
        name: "Thanos Snap",
        description:
            "Thanos snapped his fingers, and half of all living beings disappeared INCLUDING your items and hints.",
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.MORE_ROLLS,
        name: "Rock and rolls",
        description: "You get an extra rolls in shop.",
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.DOUBLE_COST,
        name: "Double kill",
        description: "Next time losing points, you will lose x2",
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.FOX_COOL_GUY,
        name: "Cool Guy",
        description: `${foxName} is feeling cool, wherever he see or meet again Ngân Kiên or PS4, those guys will give truth hints`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.F_CREDIT_CARD,
        name: "Credit Card",
        description: `${foxName} use hit powerful credit card, can't lose points for next 3 moves`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.F_LAZY,
        name: "Lazy Day",
        description: `${foxName} is too lazy to continue the finding, quit the game`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.F_LONELY,
        name: "The lonely woft",
        description: `${foxName} don't need anyfriends, he now can ONLY win if find the exit by himself ALONE`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_P_EARTHQUAKE,
        name: "Earthquake",
        description: `An earthquake happened because of ${penguinName}'s weigth, ${duckName} and ${penguinName} are lost in random rooms`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_P_FIGHTING,
        name: "Internal fighting",
        description: `${duckName} and ${penguinName} are fighting, ${duckName} lose so he ran away`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_P_DIFFERENT_OPINIONS,
        name: "Different opinions",
        description: `${duckName} and ${penguinName} have different opinions, ${penguinName} want go bot while ${duckName} want go top. Choose the right one to get reward or else punishment`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_P_CHILDISH,
        name: "Childish behavior",
        description: `${duckName} and ${penguinName} are acting childish, lose 10 points to buy ice-cream for both of them`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_P_CURIOUS,
        name: "Anoying curious",
        description: `${duckName} and ${penguinName} are curious about ${foxName}'s points, next move points will cost triplely as ${duckName} and ${penguinName} also consume it`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.P_HEAVY,
        name: `${penguinName}'s weigth gain`,
        description: `${penguinName} is too heavy, can't move for next 2 moves`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.P_HURT_WORDS,
        name: "Hurt Words",
        description: `${penguinName} said bịp words that hurting ${foxName}, lose 5 points`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.P_LOST_WEAPON,
        name: "Chuỳ gai toi âu?",
        description: `${penguinName} lost her chuỳ gai her original spawn room, can't not win if not go back there and pick it up`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.P_JOIN_DUCK,
        name: "Join the duck side",
        description: `${penguinName} hearing ${duckName}'s whispers so she left ${foxName} and run to ${duckName}'s room`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.P_BIG_BOSS,
        name: "The big boss",
        description: `${penguinName} is a big boss, she force ${foxName} to go down`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_SILENT_TREATMENT,
        name: "Silent treatment",
        description: `${duckName} is performing silent treatment, he make presure on 2 next NPCs will sure not giving hints`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_MYSTERIOUS,
        name: "Mysterious Duck",
        description: `${duckName} is become a mysterious duck, some of your items being hidden by him`,
        type: EVENT_TYPE.BAD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_GENEROUS,
        name: "Genious Duck",
        description: `${duckName} is generous, he give ${foxName} 3 rolls in this room and 10 points`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_NO_COMMENT,
        name: "Không chính kiến",
        description: `${duckName} think should go top, but the choice is up to ${foxName}`,
        type: EVENT_TYPE.GOOD,
    }),
    new RoomEvent({
        id: EVENT_ID.D_DUCKING,
        name: "Quack quack",
        description: `${duckName} become a actual duck, next move he will go differently with ${foxName}`,
        type: EVENT_TYPE.BAD,
    }),
];

const getEventById = (eventId) => {
    return EVENT_REGISTRY.find((event) => event.ID === eventId);
};

export const getRandomEvent = () => {
    const availableEvents = EVENT_REGISTRY.filter((event) =>
        isEventAvailable(event.ID),
    );
    // return getRandomElement(availableEvents);
    return getEventById(EVENT_ID.P_LOST_WEAPON);
};
