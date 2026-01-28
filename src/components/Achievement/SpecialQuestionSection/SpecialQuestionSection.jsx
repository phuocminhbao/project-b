import LockedQuestionCard from "./LockedQuestionCard";
import QuestionCard from "./QuestionCard";

const SpecialQuestionSection = ({ allQuestions, answeredMap }) => {
    const foundCount = Object.keys(answeredMap).length;

    return (
        <section className="achievement-section">
            <header className="section-header">
                <h2>📜 Special Questions</h2>
                <span className="progress-text">
                    Found {foundCount} / {allQuestions.length}
                </span>
            </header>

            <div className="question-grid">
                {allQuestions.map((question) => {
                    const isFound = answeredMap[question.id] !== undefined;

                    if (!isFound) {
                        return <LockedQuestionCard key={question.id} />;
                    }

                    return (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            isCorrect={answeredMap[question.id]}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default SpecialQuestionSection;
