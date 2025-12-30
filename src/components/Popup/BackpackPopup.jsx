import "./BackpackPopup.css";
import { fox } from "../../model/Fox";
import BackpackIcon from "../Shared/Icon/Backpack";
import { ITEM_RARITY } from "../../data/items";

const BackpackPopup = ({ onClose }) => {
    return (
        <div className="backpack-overlay" onClick={onClose}>
            <div
                className="backpack-popup"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="backpack-popup__header">
                    <BackpackIcon height="24px" width="24px" />
                    <h3 className="backpack-popup__title">Backpack</h3>
                    <button
                        className="backpack-popup__close"
                        onClick={onClose}
                        aria-label="Close backpack"
                    >
                        ✕
                    </button>
                </div>

                <div className="backpack-popup__content">
                    {fox.Items.length === 0 ? (
                        <div className="backpack-popup__empty">
                            Deos có coin card j cũng mở xem ???
                        </div>
                    ) : (
                        fox.Items.map((item, i) => {
                            const { name, description } = item;
                            return (
                                <div
                                    key={i}
                                    className={`backpack-item backpack-item--${item.rarity}`}
                                >
                                    <div className="backpack-item__name">
                                        {name}
                                    </div>
                                    <div className="backpack-item__description">
                                        {description}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BackpackPopup;
