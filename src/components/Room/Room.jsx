import "./Room.css";
import Arrow from "../Arrow/Arrow";
import Popup from "../Popup/Popup";
import { Children, use, useState } from "react";
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
    const [fox, setFox] = use(FoxContext);
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
                text: `Ngõ cụt: ${getRandomElement(hitEndMessage)}`,
                children: (
                    <button
                        onClick={() => {
                            closePopup();
                        }}
                    >
                        {"cái djtconmeeeee cuocdoi"}
                    </button>
                ),
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
            <img src={fox.Avatar} alt="duck" className="fox" />
            <img src={fox.Avatar} alt="fox" className="fox" />
            <img src={fox.Avatar} alt="penquin" className="fox" />

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
                    {popupData.children}
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
                                        setPopupData((pre) => {
                                            pre.text = npc.NextText;
                                            return pre;
                                        });
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
