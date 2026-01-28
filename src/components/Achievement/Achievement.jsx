import { npcCharacters } from "../../data/npcCharacters";
import { specialQuestions } from "../../data/questions";
import {
    getAnsweredSpecialQuestions,
    getFoundNPCs,
} from "../../helper/GameStrorage";
import "./AchievementPage.css";
import NPCSection from "./NPCSection/NPCSection";
import SpecialQuestionSection from "./SpecialQuestionSection/SpecialQuestionSection";

export default function AchievementPage() {
    const answeredMap = getAnsweredSpecialQuestions();
    const foundNpcIds = getFoundNPCs();

    return (
        <div className="achievement-page">
            <h1 className="achievement-title">Achievements</h1>

            <SpecialQuestionSection
                allQuestions={specialQuestions}
                answeredMap={answeredMap}
            />

            <NPCSection allNPCs={npcCharacters} foundNpcIds={foundNpcIds} />
        </div>
    );
}
