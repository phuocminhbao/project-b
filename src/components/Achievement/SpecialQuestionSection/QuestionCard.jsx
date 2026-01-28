const QuestionCard = ({ question, isCorrect }) => {
    const correctAnswer = question.answers.find((a) => a.isCorrect);

    return (
        <div className={`question-card ${isCorrect ? "correct" : "wrong"}`}>
            <div className="question-header">
                <img
                    className="hider-avatar"
                    src={question.hider.Avatar}
                    alt={question.hider.Name}
                />
                <span className="hider-name">{question.hider.Name}</span>
            </div>

            <div className="question-title">{question.title}</div>

            <div className="question-status">
                {isCorrect ? (
                    <span className="status-correct">
                        ✅ Answered Correctly
                    </span>
                ) : (
                    <span className="status-wrong">
                        ❌ Answered Incorrectly
                    </span>
                )}
            </div>

            <div className="correct-answer">
                <span className="label">Correct Answer:</span>
                <span className="answer">
                    {isCorrect ? correctAnswer?.title : ""}
                </span>
            </div>
        </div>
    );
};
export default QuestionCard;
