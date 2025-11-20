import "./InfoBox.css";
import { fox } from "../../model/Fox";

const InfoBox = () => {
    return <div className="info-box">Điểm: {fox.Points}</div>;
};

export default InfoBox;
