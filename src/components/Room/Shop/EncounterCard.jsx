import { useState } from "react";
import "./EncounterCard.css";
import RerollIcon from "../../Shared/Icon/reroll";

const EncounterCard = ({ data, onSelect, onReroll }) => {
    const [rerollLeft, setRerollLeft] = useState(data.rollRemaining);

    const handleReroll = (e) => {
        e.stopPropagation();
        if (rerollLeft <= 0) return;
        onReroll(data);
        setRerollLeft(data.rollRemaining);
    };
    return (
        <div className="encounter-frame" onClick={() => onSelect(data)}>
            <div className="encounter-icon-wrapper">
                <data.icon />
            </div>

            <div className="encounter-title">{data.name}</div>

            <div className="encounter-description">{data.description}</div>

            <button
                className="reroll-btn"
                disabled={rerollLeft === 0}
                onClick={handleReroll}
            >
                <RerollIcon />
                <span className="reroll-badge">{rerollLeft}</span>
            </button>
        </div>
    );
};

export default EncounterCard;
