import { useRef, useState } from "react";
import EncounterCard from "./EncounterCard.jsx";
import "./Shop.css";
import ThreeCards from "../../Shared/Icon/ThreeCards.jsx";
import { fox } from "../../../model/Fox.js";
import { duck } from "../../../model/Duck.js";
import { penguin } from "../../../model/Penguin.js";
import { useCollision } from "../../../hooks/useCollision.js";
import ItemIcon from "../../Shared/Icon/Item.jsx";
import EventIcon from "../../Shared/Icon/Event.jsx";
import ShopIcon from "../../Shared/Icon/Shop.jsx";
import { getShopItem } from "../../../helper/ShopGenerator.js";

const Shop = ({ disableShop, maxRolls }) => {
    const [open, setOpen] = useState(false);
    const [encounters, setEncounters] = useState([
        getShopItem(maxRolls),
        getShopItem(maxRolls),
        getShopItem(maxRolls),
    ]);
    const buttonRef = useRef();
    const shopRef = useRef();

    const isColliding = useCollision(buttonRef, shopRef, open);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSelect = (encounter) => {
        console.log(encounter.name);
        setOpen(false);
        disableShop();
    };

    const handleReroll = (encounter) => {
        encounter.rollRemaining -= 1;
        setEncounters((preEncounters) => {
            preEncounters[encounter.index] = getShopItem(
                encounter.rollRemaining,
            );
            return [...preEncounters];
        });
    };

    return (
        <>
            <button className="shop-fab" onClick={handleClick} ref={buttonRef}>
                <ThreeCards size={32} />
            </button>
            {open && (
                <div className="shop-overlay">
                    <div
                        className={`shop-popup ${isColliding ? "shop-popup-colliding" : ""}`}
                        ref={shopRef}
                    >
                        <div className="shop-cards">
                            {encounters.map((e, i) => (
                                <EncounterCard
                                    key={i + e.name}
                                    data={{ ...e, index: i }}
                                    onSelect={handleSelect}
                                    onReroll={handleReroll}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Shop;
