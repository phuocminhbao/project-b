import "./InfoBox.css";
import { fox } from "../../model/Fox";
import { useEffect, useRef, useState } from "react";
import BackpackPopup from "../Popup/BackpackPopup";
import BackpackIcon from "../Shared/Icon/Backpack";

const InfoBox = ({ onItemSelect }) => {
    const [isBackpackOpen, setIsBackpackOpen] = useState(false);
    const [floatingText, setFloatingText] = useState(null);

    const prevPointsRef = useRef(fox.Points);
    const pointsRef = useRef(null);

    useEffect(() => {
        const prev = prevPointsRef.current;
        const current = fox.Points;

        if (prev !== current) {
            const diff = current - prev;
            const element = pointsRef.current;

            if (element) {
                element.classList.remove("points-inc", "points-dec");

                void element.offsetWidth;

                element.classList.add(diff > 0 ? "points-inc" : "points-dec");
            }

            setFloatingText({
                value: diff,
                id: Date.now(),
            });

            prevPointsRef.current = current;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fox.Points]);

    useEffect(() => {
        if (!floatingText) return;

        const timer = setTimeout(() => {
            setFloatingText(null);
        }, 800);

        return () => clearTimeout(timer);
    }, [floatingText]);

    return (
        <>
            <div className="info-box">
                <div className="info-box__points-wrapper">
                    <div ref={pointsRef} className="info-box__points">
                        Points: {fox.Points}
                    </div>

                    {floatingText && (
                        <span
                            key={floatingText.id}
                            className={`points-float ${
                                floatingText.value > 0
                                    ? "points-float--inc"
                                    : "points-float--dec"
                            }`}
                        >
                            {floatingText.value > 0
                                ? `+${floatingText.value}`
                                : floatingText.value}
                        </span>
                    )}
                </div>

                <button
                    className="info-box__items"
                    onClick={() => setIsBackpackOpen(true)}
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
                    onClose={() => setIsBackpackOpen(false)}
                    onItemSelect={onItemSelect}
                />
            )}
        </>
    );
};

export default InfoBox;
