import "./BackpackPopup.css";
import { fox } from "../../model/Fox";
import BackpackIcon from "../Shared/Icon/Backpack";

const BackpackPopup = ({ onClose, onItemSelect }) => {
    const handleItemSelect = (item) => {
        onClose();
        onItemSelect(item);
    };
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
                            return (
                                <div
                                    key={i}
                                    className={`backpack-item backpack-item--${item.Rarity}`}
                                    onClick={() => {
                                        handleItemSelect(item);
                                    }}
                                >
                                    <div className="backpack-item__qty">
                                        x{fox.getItemQuantity(item)}
                                    </div>
                                    <div className="backpack-item__name">
                                        {item.Name}
                                    </div>
                                    <div className="backpack-item__description">
                                        {item.Description}
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
