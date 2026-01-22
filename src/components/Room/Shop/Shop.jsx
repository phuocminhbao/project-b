import { useState } from "react";
import EncounterCard from "./EncounterCard.jsx";
import "./Shop.css";
import { Button } from "../../Shared/Button/Button.js";
import ThreeCards from "../../Shared/Icon/ThreeCards.jsx";
import { fox } from "../../../model/Fox.js";
import { duck } from "../../../model/Duck.js";
import { penguin } from "../../../model/Penguin.js";

const mock = [
    {
        icon: duck.Avatar,
        name: "Pickme boi",
        description: "Pickme boi",
        rollRemaining: 1,
    },
    {
        icon: fox.Avatar,
        name: "Pickme boi",
        description: "Pickme boi",
        rollRemaining: 1,
    },
    {
        icon: penguin.Avatar,
        name: "Pickme boi",
        description: "Pickme boi",
        rollRemaining: 1,
    },
];

const Shop = () => {
    const [open, setOpen] = useState(false);
    const [encounters, setEncounters] = useState(mock);

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSelect = (encounter) => {
        console.log(encounter.name);
        setOpen(false);
    };

    return (
        <>
            <button className="shop-fab" onClick={handleOpen}>
                <ThreeCards size={32} />
            </button>
            {open && (
                <div className="shop-overlay">
                    <div className="shop-popup">
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
