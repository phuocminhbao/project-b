import "./MenuButton.css";

const MenuButton = ({ onClick, disabled = false, children }) => {
    return (
        <button
            className={`menu-button ${disabled ? "disabled" : ""}`}
            onClick={disabled ? undefined : onClick}
        >
            <span className="menu-button-text">{children}</span>
            <span className="menu-button-indicator" />
        </button>
    );
};

export default MenuButton;
