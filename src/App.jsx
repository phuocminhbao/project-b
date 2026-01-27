import { useState } from "react";
import "./App.css";
import Room from "./components/Room/Room";
import { SCREEN } from "./constant/screen";
import MainMenu from "./components/MainMenu/MainMenu";
import Achievement from "./components/Achievement/Achievement";
import Setting from "./components/Setting/Setting";
import HowToPlay from "./components/HowToPlay/HowToPlay";

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
