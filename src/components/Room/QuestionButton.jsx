const QuestionButton = ({
    onClick,
    isRewardQuestion = false,
    isAnswered = false,
}) => {
    const className = [
        "quiz-btn",
        !isAnswered && isRewardQuestion && "quiz-btn--reward",
        !isAnswered && !isRewardQuestion && "quiz-btn--unanswered",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button className={className} onClick={onClick}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span>Question</span>
        </button>
    );
};

export default QuestionButton;
