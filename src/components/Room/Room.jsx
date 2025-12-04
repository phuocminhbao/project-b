import "./Room.css";
import Arrow from "../Arrow/Arrow";
import Popup from "../Popup/Popup";
import { useEffect, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import { mapData, MAX_LENGTH, assignRandomQuestion } from "../../data/map";
import { getRandomInt } from "../../utils/numberUtils";
import { getRandomElement, shuffle } from "../../utils/array";
import { hitEndMessage } from "../../data/texts";
import { fox } from "../../model/Fox";
import { penguin } from "../../model/Penguin";
import { duck } from "../../model/Duck";

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

const getKeyFromKeyCode = (keyCode) => {
    switch (keyCode) {
        case 87: // W
        case 38: // ↑
            return "up";
        case 65: // A
        case 37: // ←
            return "left";
        case 83: // S
        case 40: // ↓
            return "down";
        case 68: // D
        case 39: // →
            return "right";
        default:
            return null;
    }
};

const Room = () => {
    const [popupData, setPopupData] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [position, setPosition] = useState({
        row: fox.Row,
        col: fox.Col,
    });
    const found = {
        duck: fox.Row === duck.Row && fox.Col === duck.Col,
        penguin: fox.Row === penguin.Row && fox.Col === penguin.Col,
    };
    const moveToNextRoom = (row, col) => {
        fox.setPosition(row, col);
        if (found.duck) {
            duck.setPosition(row, col);
        }
        if (found.penguin) {
            penguin.setPosition(row, col);
        }
        setPosition({ row, col });
    };
    const { npc, question, isExit } = mapData[position.row][position.col];
    const isEndGame =
        (isExit && found.duck && found.penguin) || fox.Points <= 0;

    const tryToGoNextRoom = ([row, col], cost) => {
        if (popupData) return;
        fox.minusPoints(cost);

        if (row >= MAX_LENGTH || col >= MAX_LENGTH || row < 0 || col < 0) {
            setPopupData({
                text: `Ngõ cụt: ${getRandomElement(hitEndMessage)}`,
                children: (
                    <button
                        onClick={() => {
                            closePopup();
                        }}
                    >
                        cái djtconmeeeee cuocdoi
                    </button>
                ),
            });
            return;
        }
        assignRandomQuestion(position.row, position.col);
        moveToNextRoom(row, col);
        setIsAnswered(false);
    };
    const closePopup = () => {
        setPopupData(undefined);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (e) => {
        const { keyCode } = e;
        const direction = getKeyFromKeyCode(keyCode);
        if (!direction) return;
        tryToGoNextRoom(
            getNextRoomPosition(direction, position),
            mapData[position.row]?.[position.col]?.cost ?? getRandomInt(1, 5)
        );
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="room">
            {found.duck && <img src={duck.Avatar} alt="duck" className="fox" />}
            <img src={fox.Avatar} alt="fox" className="fox" />
            {found.penguin && (
                <img src={penguin.Avatar} alt="penquin" className="fox" />
            )}

            {["up", "down", "left", "right"].map((direction) => {
                const [row, col] = getNextRoomPosition(direction, position);
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
                    {popupData.children}
                </Popup>
            )}
            {isEndGame && (
                <Popup text="The end">
                    <p>Mún chơi lại thì f5 chớ t lừi làm feature reload</p>
                </Popup>
            )}
            <button
                className="quiz-btn"
                onClick={() => {
                    setPopupData({
                        text: question.title,
                        choices: shuffle(question.answers).map((answer) => ({
                            label: answer.title,
                            onClick: () => {
                                if (isAnswered) {
                                    closePopup();
                                    return;
                                }
                                answer.isCorrect
                                    ? fox.addPoints(question.point)
                                    : fox.minusPoints(question.point);
                                setIsAnswered(true);
                                setPopupData(undefined);
                            },
                        })),
                    });
                }}
            >
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
            {npc && (
                <img
                    src={npc.Avatar}
                    alt="npc"
                    className="npc"
                    onClick={() => {
                        setPopupData({
                            image: npc.Avatar,
                            text: npc.CurrentText,
                            children: (
                                <button
                                    onClick={() => {
                                        if (npc.IsLastText) {
                                            closePopup();
                                            return;
                                        }
                                        setPopupData((pre) => ({
                                            ...pre,
                                            text: npc.NextText,
                                        }));
                                    }}
                                >
                                    sủa tips dei
                                </button>
                            ),
                        });
                    }}
                />
            )}
        </div>
    );
};

export default Room;
