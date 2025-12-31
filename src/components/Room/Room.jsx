import "./Room.css";
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
import { Button } from "../Shared/Button/Button";
import NPCAvatar from "./NPCAvatar";
import { getNextRoomPosition, getKeyFromKeyCode } from "../../utils/room";
import DirectionArrows from "./DirectionArrows";
import QuestionButton from "./QuestionButton";
import { getItem, ITEM_ID } from "../../data/items";

const Room = () => {
    const [popupData, setPopupData] = useState();
    const [isAnswered, setIsAnswered] = useState(false);
    const [, updateScreen] = useState({});

    const refreshScreen = () => {
        updateScreen({});
    };
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
        refreshScreen();
    };
    const { npc, question, isExit } = mapData[fox.Row][fox.Col];
    const isEndGame = false;
    //(isExit && found.duck && found.penguin) || fox.Points <= 0;

    const tryToGoNextRoom = ([row, col], cost) => {
        if (popupData) return;
        fox.minusPoints(cost);

        if (row >= MAX_LENGTH || col >= MAX_LENGTH || row < 0 || col < 0) {
            setPopupData({
                text: `Ngõ cụt: ${getRandomElement(hitEndMessage)}`,
                children: (
                    <Button
                        onClick={() => {
                            closePopup();
                        }}
                    >
                        cái djtconmeeeee cuocdoi
                    </Button>
                ),
            });
            return;
        }
        assignRandomQuestion(fox.Row, fox.Col);
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
            getNextRoomPosition(direction, fox.Position),
            mapData[fox.Row]?.[fox.Col]?.cost ?? getRandomInt(1, 5)
        );
    };

    const handleAnswerQuestion = (answer) => {
        answer.isCorrect
            ? fox.addPoints(question.point)
            : fox.minusPoints(question.point);
    };

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

        const closeButton = (
            <Button
                onClick={() => {
                    closePopup();
                }}
            >
                Alright!
            </Button>
        );
        switch (item.ID) {
            case ITEM_ID.CURRENT_POSITION:
                setPopupData({
                    image: fox.Avatar,
                    text: `Oh, mình đang ở phòng: ${fox.Row} - ${fox.Col}`,
                    children: closeButton,
                });
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
            <img src={fox.Avatar} alt="fox" className="fox" />
            {found.penguin && (
                <img src={penguin.Avatar} alt="penguin" className="fox" />
            )}
            <DirectionArrows
                currentPosition={fox.Position}
                goNextRoom={tryToGoNextRoom}
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
            {question && <QuestionButton onClick={handleQuestionClick} />}
            <NPCAvatar
                npc={npc}
                setPopupData={setPopupData}
                closePopup={closePopup}
            />
        </div>
    );
};

export default Room;
