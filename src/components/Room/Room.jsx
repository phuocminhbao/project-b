import "./Room.css";
import foxImg from "../../assets/animalsduck.jpg";

const Room = () => {
    return (
        <div className="room">
            <img src={foxImg} alt="Cáo" className="fox" />

            <div className="arrow arrow-up">
                <span className="arrow-text">↑</span>
                <span className="cost-badge badge-down">2</span>
            </div>
            <div className="arrow arrow-down">
                <span className="arrow-text">↓</span>
                <span className="cost-badge badge-up">1</span>
            </div>
            <div className="arrow arrow-left">
                <span className="arrow-text">←</span>
                <span className="cost-badge badge-right">3</span>
            </div>
            <div className="arrow arrow-right">
                <span className="arrow-text">→</span>
                <span className="cost-badge badge-left">1</span>
            </div>
        </div>
    );
};

export default Room;
