import "./InfoBox.css";
import { fox } from "../../model/Fox";
import { useState } from "react";
import BackpackPopup from "../Popup/BackpackPopup";
import BackpackIcon from "../Shared/Icon/Backpack";

const InfoBox = () => {
    const [isBackpackOpen, setIsBackpackOpen] = useState(false);
    const handleItemsClick = () => {
        setIsBackpackOpen(true);
    };

    return (
        <>
            <div className="info-box">
                <div>Points: {fox.Points}</div>

                <button
                    className="info-box__items"
                    onClick={handleItemsClick}
                    type="button"
                    aria-label="Open inventory"
                >
                    <BackpackIcon height="18px" width="18px" />
                    <span className="info-box__items-count">
                        {fox.Items.length}
                    </span>
                </button>
            </div>
            {isBackpackOpen && (
                <BackpackPopup
                    onClose={() => {
                        setIsBackpackOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default InfoBox;
