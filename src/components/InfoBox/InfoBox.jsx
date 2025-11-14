import React from "react";
import "./InfoBox.css";
import { FoxContext } from "../../context/fox/foxContext";
import { use } from "react";

const InfoBox = () => {
    const [fox] = use(FoxContext);

    return <div className="info-box">Điểm: {fox.Points}</div>;
};

export default InfoBox;
