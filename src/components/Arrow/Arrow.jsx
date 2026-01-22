import "./Arrow.css";

const Arrow = ({ direction, cost, onClick, isDisable = false }) => {
    const rotation = {
        up: 0,
        right: 90,
        down: 180,
        left: 270,
    }[direction];

    return (
        <div
            className={`arrow arrow-${direction} ${isDisable ? "arrow--disabled" : ""}`}
            onClick={isDisable ? undefined : onClick}
            aria-disabled={isDisable}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    display: "block",
                }}
            >
                <path d="M12 19V5" />
                <path d="M5 12l7-7 7 7" />
            </svg>

            <span className={`cost-badge badge-${direction}`}>{cost}</span>
        </div>
    );
};

export default Arrow;
