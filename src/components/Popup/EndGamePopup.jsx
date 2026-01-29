import { useEffect, useState } from "react";
import "./EndGamePopup.css";
import { playAudio } from "../../helper/AudioManager";
import bgm from "../../audio/LemonDays.mp3";
import gay from "../../audio/gay.m4a";
import friends from "../../audio/friends.mp3";
import { fox } from "../../model/Fox";

const IMAGE_FADE_IN = 800;
const IMAGE_VISIBLE = 1200;
const IMAGE_FADE_OUT = 800;

const credits = [
    "Game Director",
    "Lead Developer",
    "Backend Engineer",
    "Frontend Engineer",
    "UI / UX Designer",
    "Game Designer",
    "Narrative Designer",
    "Dialogue Writer",
    "Dialogue Rewriter",
    "Dialogue Rewriter (Again)",
    "Bug Producer",
    "Bug Fixer",
    "Bug Reproducer",
    "Final Boss Designer",
    "RNG Whisperer",
    "Achievement Architect",
    "Achievement Hoarder",
    "NPC Personality Engineer",
    "Duck Wrangler",
    "Rubber Duck Debugging Specialist",
    "Console.log Engineer",
    "StackOverflow Archaeologist",
    "“It Works On My Machine” Specialist",
    "Coffee-to-Code Converter",
    "Late Night Debugger",
    "Memory Leak Hunter",
    "Balance Breaker",
    "I missed her",
    "Yêu lại từ đầu",
    "Balance Fixer",
    "Balance Breaker Again",
    "Patch Notes Writer",
    "Patch Notes Ignorer",
    "Git Commit Poet",
    "Merge Conflict Survivor",
    "Feature Creep Enabler",
    "Feature Creep Victim",
    "Player Confuser",
    "Player Entertainer",
    "Emotional Damage Consultant",
    "QA (Self-Inflicted)",
    "Keyboard Abuser",
    "Mouse Click Enthusiast",
    "Game Feel Alchemist",
    "Serious Duck",
    "Still Serious Duck",
    "Very Serious Duck",
];

const EndGamePopup = ({ images = [] }) => {
    const [index, setIndex] = useState(0);
    const [imageState, setImageState] = useState("fade-in");
    const [showCredits, setShowCredits] = useState(false);

    useEffect(() => {
        if (index >= images.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowCredits(true);
            return;
        }

        setImageState("fade-in");

        const fadeInTimer = setTimeout(() => {
            setImageState("visible");
        }, IMAGE_FADE_IN);

        const visibleTimer = setTimeout(() => {
            setImageState("fade-out");
        }, IMAGE_FADE_IN + IMAGE_VISIBLE);

        const nextTimer = setTimeout(
            () => {
                setIndex((i) => i + 1);
            },
            IMAGE_FADE_IN + IMAGE_VISIBLE + IMAGE_FADE_OUT,
        );

        return () => {
            clearTimeout(fadeInTimer);
            clearTimeout(visibleTimer);
            clearTimeout(nextTimer);
        };
    }, [index, images.length]);

    useEffect(() => {
        playAudio(fox.IsAlone ? gay : friends, {
            loop: false,
            volume: 1,
        });
        return () => {
            playAudio(bgm, {
                loop: true,
                volume: 0.6,
            });
        };
    }, []);

    return (
        <div className="popup-container">
            <div className="popup-flex endgame-popup">
                {!showCredits && images[index] && (
                    <div className={`endgame-image ${imageState}`}>
                        <img src={images[index]} alt="ending scene" />
                    </div>
                )}

                {showCredits && (
                    <div className="credits-container">
                        <div className="credits-scroll start">
                            <span className="credit-line">
                                Created & Presented by
                            </span>
                            <div className="serious-duck">Serious Duck</div>
                            {credits.map((line, i) => (
                                <div key={i} className="credit-row">
                                    <span className="credit-role">{line}</span>
                                    <span className="credit-gap"></span>
                                    <span className="credit-name">
                                        Serious Duck
                                    </span>
                                </div>
                            ))}
                            <div className="credit-row">
                                <span className="credit-role">
                                    Special thanks to
                                </span>
                                <span className="credit-gap"></span>
                                <span className="credit-name">
                                    Chat GPT, Gemini
                                </span>
                            </div>
                            <div className="credit-row">
                                <span className="credit-role">
                                    And yes you no credit to
                                </span>
                                <span className="credit-gap"></span>
                                <span className="credit-name">
                                    Ching Me ofcourse
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EndGamePopup;
