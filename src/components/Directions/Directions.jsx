import React from "react";
import "./Directions.css";

const Directions = () => {
    return (
        <>
            <button className="arrow-btn arrow-up">↑ (2)</button>
            <button className="arrow-btn arrow-down">↓ (1)</button>
            <button className="arrow-btn arrow-left">← (3)</button>
            <button className="arrow-btn arrow-right">→ (1)</button>

            <div className="cost-label cost-up">Cost: 2</div>
            <div className="cost-label cost-down">Cost: 1</div>
            <div className="cost-label cost-left">Cost: 3</div>
            <div className="cost-label cost-right">Cost: 1</div>
        </>
    );
};

export default Directions;
