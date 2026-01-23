import { useRef, useState } from "react";
import EncounterCard from "./EncounterCard.jsx";
import "./Shop.css";
import ThreeCards from "../../Shared/Icon/ThreeCards.jsx";
import { fox } from "../../../model/Fox.js";
import { duck } from "../../../model/Duck.js";
import { penguin } from "../../../model/Penguin.js";
import { useCollision } from "../../../hooks/useCollision.js";

const Shop = ({ disableShop, maxRolls }) => {
    const mock = [
        {
            icon: duck.Avatar,
            name: "Pickme boi",
            description: "Pickme boi 1 ",
            rollRemaining: maxRolls,
        },
        {
            icon: fox.Avatar,
            name: "Pickme boi",
            description: "Pickme boi 2 ",
            rollRemaining: maxRolls,
        },
        {
            icon: penguin.Avatar,
            name: "Pickme boi",
            description: "Pickme boi 3 ",
            rollRemaining: maxRolls,
        },
    ];
    const [open, setOpen] = useState(false);
    const [encounters, setEncounters] = useState(mock);
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
                                    key={i}
                                    data={e}
                                    onSelect={handleSelect}
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
