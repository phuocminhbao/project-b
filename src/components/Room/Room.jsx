import "./Room.css";
import Arrow from "../Arrow/Arrow";
import Popup from "../Popup/Popup";
import { use, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import { mapData, MAX_LENGTH } from "../../data/map";
import { FoxContext } from "../../context/fox/foxContext";
import { getRandomInt } from "../../utils/numberUtils";
import { getRandomElement } from "../../utils/array";
import { hitEndMessage } from "../../data/texts";

const getNextRoomPosition = (direction, { row, col }) => {
    switch (direction) {
        case "up":
            return [row - 1, col];
        case "down":
            return [row + 1, col];
        case "left":
            return [row, col - 1];
        case "right":
            return [row, col + 1];
        default:
            throw new Error("No direction found");
    }
};

const Room = () => {
    const [posistion, setPosition] = useState({
        row: 0,
        col: 0,
    });
    const [isAnswered, setIsAnswered] = useState(false);
    const [_, setFox] = use(FoxContext);
    const { cost, event, items, npc, question } =
        mapData[posistion.row][posistion.col];
    const [popupData, setPopupData] = useState();

    const tryToGoNextRoom = ([row, col], cost) => {
        setFox((fox) => {
            fox.minusPoints(cost);
            return fox;
        });
        if (row >= MAX_LENGTH || col >= MAX_LENGTH || row < 0 || col < 0) {
            setPopupData({
                text: getRandomElement(hitEndMessage),
            });
            return;
        }
        setPosition({ row, col });
    };
    const closePopup = () => {
        setPopupData(undefined);
    };

    return (
        <div className="room">
            {/* <img src={foxImg} alt="Cáo" className="fox" /> */}
            {/* <img src={foxImg} alt="Cáo" className="fox" /> */}
            {/* <img src={foxImg} alt="Cáo" className="fox" /> */}

            {["up", "down", "left", "right"].map((direction) => {
                const [row, col] = getNextRoomPosition(direction, posistion);
                const cost = mapData[row]?.[col]?.cost ?? getRandomInt(1, 5);
                return (
                    <Arrow
                        key={direction}
                        direction={direction}
                        cost={cost}
                        onClick={() => {
                            tryToGoNextRoom([row, col], cost);
                        }}
                    />
                );
            })}
            <InfoBox />
            {!!popupData && (
                <Popup
                    key={popupData.image}
                    image={popupData.image}
                    text={popupData.text}
                    choices={popupData.choices}
                >
                    <button
                        onClick={() => {
                            closePopup();
                        }}
                    >
                        {"cái djtconmeeeee cuocdoi"}
                    </button>
                </Popup>
            )}
            <button
                onClick={() => {
                    setPopupData({
                        text: question.title,
                        choices: question.answers.map((answer) => ({
                            label: answer.title,
                            onClick: () => {
                                if (isAnswered) {
                                    closePopup();
                                    return;
                                }
                                setFox((fox) => {
                                    answer.isCorrect
                                        ? fox.addPoints(question.point)
                                        : fox.minusPoints(question.point);
                                    return fox;
                                });
                                setIsAnswered(true);
                                setPopupData(undefined);
                            },
                        })),
                    });
                }}
            >
                Open popup
            </button>
            <img
                src={npc.avatar}
                alt="npc"
                className="npc"
                onClick={() => {
                    console.log("Npc ");
                }}
                onMouseEnter={() => {
                    console.log("hover");
                }}
            />
        </div>
    );
};

export default Room;
