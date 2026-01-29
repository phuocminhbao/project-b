import { SCREEN } from "../../constant/screen";
import { reLoadMap } from "../../data/map";
import { increaseTimePlayed, timePlayed } from "../../helper/GameStrorage";
import "./MainMenu.css";
import MenuButton from "./MenuButton";

const MainMenu = ({ onNavigate }) => {
    return (
        <div className="main-menu">
            <div className="menu-left">
                <MenuButton
                    onClick={() => {
                        increaseTimePlayed();
                        reLoadMap();
                        onNavigate(SCREEN.GAME);
                    }}
                >
                    Start
                </MenuButton>
                <MenuButton onClick={() => onNavigate(SCREEN.HOW_TO)}>
                    How to play
                </MenuButton>
                <MenuButton onClick={() => onNavigate(SCREEN.ACHIEVEMENT)}>
                    Achievement
                </MenuButton>
                <MenuButton
                    onClick={() => onNavigate(SCREEN.SETTING)}
                    disabled={timePlayed() <= 15}
                >
                    Cheat mode
                </MenuButton>
            </div>

            <div className="menu-right">
                <div className="menu-title">
                    <span className="menu-title-eyebrow">A GOTC GAME</span>

                    <h1 className="menu-title-main">
                        F*CK
                        <br />
                        D*CK
                        <br />
                        PEN*S
                    </h1>

                    <div className="menu-title-divider" />

                    <p className="menu-title-sub">
                        Will you eat cứt to save me?
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
