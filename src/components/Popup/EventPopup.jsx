import { duck } from "../../model/Duck";
import { penguin } from "../../model/Penguin";
import { RoomEvent } from "../../model/RoomEvent";
import { Button } from "../Shared/Button/Button";
import "./EventPopup.css";

const EVENT_META = {
    good: {
        moment: `${duck.Name} hiện ra và ban "Phước"`,
        waterMark: duck.Avatar,
        icon: "🎁",
        closeText: "Quackk",
    },
    bad: {
        moment: `${penguin.Name}'s punishment`,
        waterMark: penguin.Avatar,
        icon: "⚠",
        closeText: "+1 quá khứ của pickme boi",
    },
};

/**
 * @param {{ event: RoomEvent; }}
 * @returns {JSX.Element}
 */
const EventPopup = ({ event, onClose }) => {
    if (!event) return null;

    const { Name, Description, Type } = event;
    const meta = EVENT_META[Type];

    return (
        <div className="event-overlay">
            <div className={`event-popup event-${Type}`}>
                <img
                    src={meta.waterMark}
                    alt=""
                    className="event-watermark-img"
                />
                <div className="event-icon">{meta.icon}</div>

                <div className="event-moment">{meta.moment}</div>

                <h2 className="event-title">{Name}</h2>
                <p className="event-description">{Description}</p>

                <button className="event-confirm-btn" onClick={onClose}>
                    {meta.closeText}
                </button>
            </div>
        </div>
    );
};

export default EventPopup;
