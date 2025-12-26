import { Button } from "../Shared/Button/Button";
import "./Popup.css";
import { useState, useEffect } from "react";

const Popup = ({ image, text, choices, children }) => {
    const [displayText, setDisplayText] = useState("");

    // Typing effect
    useEffect(() => {
        setDisplayText("");
        let index = 0;
        let t = "";

        const interval = setInterval(() => {
            t = t + text.charAt(index);
            setDisplayText(t);
            index++;

            if (index >= text.length) {
                clearInterval(interval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, [text]);
    return (
        <div className="popup-container">
            <div className="popup-flex">
                {image && (
                    <div className="popup-image-container">
                        <img
                            src={image}
                            alt="popup visual"
                            className="popup-image"
                        />
                    </div>
                )}

                <p className="popup-text">{displayText}</p>

                {choices ? (
                    <div className="popup-buttons">
                        {choices.map((c, i) => (
                            <Button key={i} onClick={c.onClick}>
                                {c.label}
                            </Button>
                        ))}
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
};

export default Popup;
