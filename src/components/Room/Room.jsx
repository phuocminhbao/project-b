import "./Room.css";
import Arrow from "../Arrow/Arrow";
import Popup from "../Popup/Popup";
import { useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import { mapData, MAX_LENGTH } from "../../data/map";
import { getRandomInt } from "../../utils/numberUtils";
import { getRandomElement } from "../../utils/array";
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

const Room = () => {
    const [popupData, setPopupData] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [posistion, setPosition] = useState({
        row: fox.Row,
        col: fox.Col,
    });
    const found = {
        duck: fox.Row === duck.Row && fox.Col === duck.Col,
        penguin: fox.Row === penguin.Row && fox.Col === penguin.Col,
    };
    const moveToNextRoom = (row, col) => {
        fox.setPossition(row, col);
        if (found.duck) {
            duck.setPossition(row, col);
        }
        if (found.penguin) {
            penguin.setPossition(row, col);
        }
        setPosition({ row, col });
    };
    const { cost, event, items, npc, question } =
        mapData[posistion.row][posistion.col];

    const tryToGoNextRoom = ([row, col], cost) => {
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
                        {"cái djtconmeeeee cuocdoi"}
                    </button>
                ),
            });
            return;
        }
        moveToNextRoom(row, col);
        setIsAnswered(false);
    };
    const closePopup = () => {
        setPopupData(undefined);
    };

    return (
        <div className="room">
            {found.duck && <img src={duck.Avatar} alt="duck" className="fox" />}
            <img src={fox.Avatar} alt="fox" className="fox" />
            {found.penguin && (
                <img src={penguin.Avatar} alt="penquin" className="fox" />
            )}

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
