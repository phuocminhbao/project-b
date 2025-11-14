import "./Arrow.css";

const Arrow = ({ direction, cost, onClick }) => {
    const arrowText = {
        up: "↑",
        down: "↓",
        left: "←",
        right: "→",
    };

    return (
        <div className={`arrow arrow-${direction}`} onClick={onClick}>
            <span className="arrow-text">{arrowText[direction]}</span>
            <span className={`cost-badge badge-${direction}`}>{cost}</span>
        </div>
    );
};

export default Arrow;
