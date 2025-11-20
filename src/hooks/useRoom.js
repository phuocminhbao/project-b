import { use } from "react";
import { FoxContext } from "../context/fox/foxContext";
export const useRoom = () => {
    const [fox, setFox] = use(FoxContext);
    return {
        possition: {
            row: fox.Row,
            col: fox.Col,
        },
    };
};
