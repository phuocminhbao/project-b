const LockedQuestionCard = () => {
    return (
        <div className="question-card locked">
            <div className="locked-content">
                <span className="locked-icon">❓</span>
                <span className="locked-text">
                    You haven’t found this question yet
                </span>
            </div>
        </div>
    );
};

export default LockedQuestionCard;
