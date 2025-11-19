import topHatDuck from "../assets/top-hat-duck.png";
import coolDuck from "../assets/cool-duck.jpg";
import { NPC } from "../model/NPC";

export const npcCharacters = [
    new NPC(1, "top hat duck", topHatDuck, [
        "Ta cừi trên nỗi đau, ta khox dưới niềm",
        "quack quackkkkkkkk quakkk",
    ]),
    new NPC(2, "cool duck", coolDuck, [
        "blabla blablablabla blablablabla",
        "quack quackkkkkkkk quakkk",
    ]),
];
