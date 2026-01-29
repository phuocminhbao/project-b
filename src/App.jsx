import { useEffect, useState } from "react";
import "./App.css";
import Room from "./components/Room/Room";
import { SCREEN } from "./constant/screen";
import MainMenu from "./components/MainMenu/MainMenu";
import Achievement from "./components/Achievement/Achievement";
import Setting from "./components/Setting/Setting";
import HowToPlay from "./components/HowToPlay/HowToPlay";
import audio from "./audio/LemonDays.mp3";
import { playAudio, stopAudio } from "./helper/AudioManager";

function App() {
    const [screen, setScreen] = useState(SCREEN.MENU);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const navigate = (nextScreen) => {
        if (isTransitioning || nextScreen === screen) return;

        setIsTransitioning(true);

        setTimeout(() => {
            setScreen(nextScreen);

            requestAnimationFrame(() => {
                setIsTransitioning(false);
            });
        }, 300);
    };

    useEffect(() => {
        document.addEventListener(
            "click",
            () => {
                playAudio(audio, {
                    loop: true,
                    volume: 0.6,
                });
            },
            { once: true },
        );
        return () => stopAudio();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setScreen(SCREEN.MENU);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setScreen]);

    return (
        <div
            className={`screen-root ${isTransitioning ? "fade-out" : "fade-in"}`}
        >
            {screen === SCREEN.MENU && <MainMenu onNavigate={navigate} />}
            {screen === SCREEN.GAME && <Room />}
            {screen === SCREEN.ACHIEVEMENT && <Achievement />}
            {screen === SCREEN.SETTING && <Setting />}
            {screen === SCREEN.HOW_TO && <HowToPlay />}
        </div>
    );
}

export default App;
