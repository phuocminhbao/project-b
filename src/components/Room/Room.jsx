import "./Room.css";
import Popup from "../Popup/Popup";
import { use, useEffect, useRef, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import {
    mapData,
    MAX_LENGTH,
    assignRandomQuestion,
    CORNERS,
} from "../../data/map";
import { getRandomInt, inChanceOf } from "../../utils/numberUtils";
import { getRandomElement, shuffle } from "../../utils/array";
import { hitEndMessage } from "../../data/texts";
import { fox } from "../../model/Fox";
import { penguin } from "../../model/Penguin";
import { duck } from "../../model/Duck";
import { Button } from "../Shared/Button/Button";
import NPCAvatar from "./NPCAvatar";
import {
    getNextRoomPosition,
    getKeyFromKeyCode,
    DIRECTION,
    getLastRoomInDirectionPosition,
} from "../../utils/room";
import DirectionArrows from "./DirectionArrows";
import QuestionButton from "./QuestionButton";
import { getItem, ITEM_ID } from "../../data/items";
import ShieldIcon from "../Shared/Icon/Shield";

class ItemEffectHandler {
    constructor({ setPopupData, refreshScreen, closePopupButton }) {}
    handleItemSelect(item) {
        console.log(item.ID);
        fox.removeItem(item);

        switch (item.ID) {
            case ITEM_ID.CURRENT_POSITION:
                this.setPopupData({
                    image: fox.Avatar,
                    text: `Oh, mình đang ở phòng: ${fox.Row} - ${fox.Col}`,
                    children: closePopupButton,
                });
                break;
            case ITEM_ID.SEE_THE_TRUTH: {
                if (!npc) {
                    setPopupData({
                        image: fox.Avatar,
                        text: "Ụa ngu òi, phòng này làm j có NPC :(",
                        children: closePopupButton,
                    });
                    break;
                }
                const truthText = "Bro, I'm telling truth, trust me!";
                const liesText = `Heheeee t bịp m á, tại bị súi bởi ${penguin.Name} - Vua bịp`;
                setPopupData({
                    image: npc.Avatar,
                    text: `${npc.IsTellingTruth ? truthText : liesText}`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.FREE_POINTS: {
                const randomPoints = getRandomInt(0, 15);
                fox.addPoints(randomPoints);
                setPopupData({
                    image: fox.Avatar,
                    text: `Nine sừ, cảm thấy hưng phấn dc tăng thêm ${randomPoints} điểm`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.GET_RANDOM_ITEM: {
                const randomItem = getItem();
                fox.addItem(randomItem);
                setPopupData({
                    image: fox.Avatar,
                    text: `Tuyệt vời, thêm đồ để chiến: ${randomItem.Name}`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.JUMP_CONNER: {
                const corner = getRandomElement(CORNERS);
                const cost = mapData[corner[0]][corner[1]].cost;
                tryToGoNextRoom(corner, cost);
                break;
            }
            case ITEM_ID.LOSING_POINTS_SHIELD:
                fox.addShield();
                refreshScreen();
                break;
            case ITEM_ID.GACHA_TELEPORT_OR_DEAD: {
                const isWin = inChanceOf(15);
                if (!isWin) {
                    fox.minusPoints(9999);
                } else if (found.duck && found.penguin) {
                    setPopupData({
                        image: duck.Avatar,
                        text: "Ei bọn t ở ây sẵn mà, chơi lìu v bro!",
                        children: closePopupButton,
                    });
                } else {
                    !found.duck && duck.jumpToFoxRoom();
                    !found.penguin && penguin.jumpToFoxRoom();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.TELEPORT_HIDER: {
                if (found.duck && found.penguin) {
                    setPopupData({
                        image: penguin.Avatar,
                        text: "Ei bọn t ở ây sẵn mà, m hơi giàu òi ấy!",
                        children: closePopupButton,
                    });
                } else if (!found.duck && !found.penguin) {
                    getRandomElement([duck, penguin]).jumpToFoxRoom();
                } else {
                    !found.duck && duck.jumpToFoxRoom();
                    !found.penguin && penguin.jumpToFoxRoom();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.TELEPORT_HIDER_TO_EXIT: {
                if (inChanceOf(5)) {
                    duck.jumpToExit();
                    penguin.jumpToExit();
                } else {
                    getRandomElement([duck, penguin]).jumpToExit();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.QUESTION_RETURN_ITEM:
                questionsReturnItem.current++;
                refreshScreen();
                break;
            case ITEM_ID.SAITAMA:
                isGoToLastRoom.current = true;
                break;
            default:
                break;
        }
    }
}

class CharacterPositionSynchronizer {
    static get IsDuckFound() {
        return fox.Row === duck.Row && fox.Col === duck.Col;
    }

    static get IsPenguinFound() {
        return fox.Row === penguin.Row && fox.Col === penguin.Col;
    }

    static get IsFoundAll() {
        return this.IsDuckFound && this.IsPenguinFound;
    }

    static syncPosition() {
        if (this.IsDuckFound) {
            duck.moveTo(fox.Row, fox.Col);
            duck.found();
        } else {
            duck.lost();
        }
        if (this.IsPenguinFound) {
            penguin.moveTo(fox.Row, fox.Col);
            penguin.found();
        } else {
            penguin.lost();
        }
    }
}

const Room = () => {
    const [popupData, setPopupData] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [, updateScreen] = useState({});
    const questionsReturnItem = useRef(0);
    const isGoToLastRoom = useRef(false);

    const found = {
        duck: CharacterPositionSynchronizer.IsDuckFound,
        penguin: CharacterPositionSynchronizer.IsPenguinFound,
    };

    const refreshScreen = () => {
        updateScreen({});
    };

    const closePopup = () => {
        setPopupData(undefined);
    };

    const ClosePopupButton = ({ text = "Alright!" }) => {
        return (
            <Button
                onClick={() => {
                    closePopup();
                }}
            >
                {text}
            </Button>
        );
    };

    const moveToNextRoom = (row, col) => {
        fox.moveTo(row, col);
        CharacterPositionSynchronizer.syncPosition();
        refreshScreen();
    };

    const { npc, question, isExit } = mapData[fox.Row][fox.Col];
    const isEndGame = false;
    // (isExit && found.duck && found.penguin) || fox.Points <= 0;

    const resetCurrentRoom = () => {
        assignRandomQuestion(fox.Row, fox.Col);
        setIsAnswered(false);
    };
    const goToLastRoomInDirection = (direction) => {
        const [row, col] = getLastRoomInDirectionPosition(
            direction,
            fox.Position
        );
        resetCurrentRoom();
        isGoToLastRoom.current = false;
        moveToNextRoom(row, col);
    };

    const tryToGoNextRoom = ([row, col], cost) => {
        if (popupData) return;
        fox.minusPoints(cost);

        if (row >= MAX_LENGTH || col >= MAX_LENGTH || row < 0 || col < 0) {
            setPopupData({
                text: `Ngõ cụt: ${getRandomElement(hitEndMessage)}`,
                children: <ClosePopupButton text="cái djtconmeeeee cuocdoi" />,
            });
            return;
        }
        resetCurrentRoom();
        moveToNextRoom(row, col);
    };

    const nextRoomsInfos = [
        DIRECTION.UP,
        DIRECTION.DOWN,
        DIRECTION.LEFT,
        DIRECTION.RIGHT,
    ].map((direction) => {
        const position = getNextRoomPosition(direction, fox.Position);
        const cost =
            mapData[position.row]?.[position.col]?.cost ?? getRandomInt(1, 5);
        const go = () => {
            if (isGoToLastRoom.current) {
                goToLastRoomInDirection(direction);
            } else {
                tryToGoNextRoom(position, cost);
            }
        };
        return { direction, position, cost, go };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (e) => {
        const { keyCode } = e;
        const direction = getKeyFromKeyCode(keyCode);
        if (!direction) return;
        return nextRoomsInfos
            .find((info) => info.direction === direction)
            ?.go();
    };

    const handleAnswerQuestion = (answer) => {
        const isRewardAsItem = questionsReturnItem.current > 0;
        if (questionsReturnItem.current > 0) {
            questionsReturnItem.current--;
        }
        if (!answer.isCorrect) {
            fox.minusPoints(question.point);
            return;
        }
        if (isRewardAsItem) {
            const item = getItem();
            fox.addItem(item);
            setTimeout(() => {
                setPopupData({
                    image: fox.Avatar,
                    text: `Cool, get a new toy: ${item.Name}`,
                    children: <ClosePopupButton />,
                });
            });
            return;
        }
        fox.addPoints(question.point);
    };

    // Todo: Open popup instead of alert
    const handleSpecialQuestionAnswer = (answer) => {
        if (answer.isCorrect) {
            fox.addItem(getItem());
            alert(
                `${question.hider.Name} is really proud and give you a gift!`
            );

            return;
        }
        alert(`${question.hider.Name} is really really disapointing!`);
    };

    const handleQuestionClick = () => {
        setPopupData({
            text: question.title,
            choices: shuffle(question.answers).map((answer) => ({
                label: answer.title,
                onClick: () => {
                    if (isAnswered) {
                        closePopup();
                        return;
                    }
                    question.isSpecial
                        ? handleSpecialQuestionAnswer(answer)
                        : handleAnswerQuestion(answer);
                    setIsAnswered(true);
                    setPopupData(undefined);
                },
            })),
        });
    };
    const handleItemSelect = (item) => {
        console.log(item.ID);
        fox.removeItem(item);

        switch (item.ID) {
            case ITEM_ID.CURRENT_POSITION:
                setPopupData({
                    image: fox.Avatar,
                    text: `Oh, mình đang ở phòng: ${fox.Row} - ${fox.Col}`,
                    children: closePopupButton,
                });
                break;
            case ITEM_ID.SEE_THE_TRUTH: {
                if (!npc) {
                    setPopupData({
                        image: fox.Avatar,
                        text: "Ụa ngu òi, phòng này làm j có NPC :(",
                        children: closePopupButton,
                    });
                    break;
                }
                const truthText = "Bro, I'm telling truth, trust me!";
                const liesText = `Heheeee t bịp m á, tại bị súi bởi ${penguin.Name} - Vua bịp`;
                setPopupData({
                    image: npc.Avatar,
                    text: `${npc.IsTellingTruth ? truthText : liesText}`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.FREE_POINTS: {
                const randomPoints = getRandomInt(0, 15);
                fox.addPoints(randomPoints);
                setPopupData({
                    image: fox.Avatar,
                    text: `Nine sừ, cảm thấy hưng phấn dc tăng thêm ${randomPoints} điểm`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.GET_RANDOM_ITEM: {
                const randomItem = getItem();
                fox.addItem(randomItem);
                setPopupData({
                    image: fox.Avatar,
                    text: `Tuyệt vời, thêm đồ để chiến: ${randomItem.Name}`,
                    children: closePopupButton,
                });
                break;
            }
            case ITEM_ID.JUMP_CONNER: {
                const corner = getRandomElement(CORNERS);
                const cost = mapData[corner[0]][corner[1]].cost;
                tryToGoNextRoom(corner, cost);
                break;
            }
            case ITEM_ID.LOSING_POINTS_SHIELD:
                fox.addShield();
                refreshScreen();
                break;
            case ITEM_ID.GACHA_TELEPORT_OR_DEAD: {
                const isWin = inChanceOf(15);
                if (!isWin) {
                    fox.minusPoints(9999);
                } else if (found.duck && found.penguin) {
                    setPopupData({
                        image: duck.Avatar,
                        text: "Ei bọn t ở ây sẵn mà, chơi lìu v bro!",
                        children: closePopupButton,
                    });
                } else {
                    !found.duck && duck.jumpToFoxRoom();
                    !found.penguin && penguin.jumpToFoxRoom();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.TELEPORT_HIDER: {
                if (found.duck && found.penguin) {
                    setPopupData({
                        image: penguin.Avatar,
                        text: "Ei bọn t ở ây sẵn mà, m hơi giàu òi ấy!",
                        children: closePopupButton,
                    });
                } else if (!found.duck && !found.penguin) {
                    getRandomElement([duck, penguin]).jumpToFoxRoom();
                } else {
                    !found.duck && duck.jumpToFoxRoom();
                    !found.penguin && penguin.jumpToFoxRoom();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.TELEPORT_HIDER_TO_EXIT: {
                if (inChanceOf(5)) {
                    duck.jumpToExit();
                    penguin.jumpToExit();
                } else {
                    getRandomElement([duck, penguin]).jumpToExit();
                }
                refreshScreen();
                break;
            }
            case ITEM_ID.QUESTION_RETURN_ITEM:
                questionsReturnItem.current++;
                refreshScreen();
                break;
            case ITEM_ID.SAITAMA:
                isGoToLastRoom.current = true;
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        if (found.duck) {
            duck.found();
        }
        if (found.penguin) {
            penguin.found();
        }
    }, [found.duck, found.penguin]);

    return (
        <div className="room">
            {found.duck && <img src={duck.Avatar} alt="duck" className="fox" />}
            <div className="fox-wrapper">
                <img src={fox.Avatar} alt="fox" className="fox" />
                {fox.HasShield && <ShieldIcon className="fox-shield" />}
            </div>
            {found.penguin && (
                <img src={penguin.Avatar} alt="penguin" className="fox" />
            )}
            <DirectionArrows
                currentPosition={fox.Position}
                goNextRoom={tryToGoNextRoom}
                nextRoomsInfos={nextRoomsInfos}
            />
            <InfoBox onItemSelect={handleItemSelect} />
            {popupData && (
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
            {question && (
                <QuestionButton
                    onClick={handleQuestionClick}
                    isRewardQuestion={
                        questionsReturnItem.current > 0 || question.isSpecial
                    }
                    isAnswered={isAnswered}
                />
            )}
            <NPCAvatar
                npc={npc}
                setPopupData={setPopupData}
                closePopup={closePopup}
            />
        </div>
    );
};

export default Room;
