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

    const handleAnswerQuestion = (answer) => {
        answer.isCorrect
            ? fox.addPoints(question.point)
            : fox.minusPoints(question.point);
    };

    const handleSpecialQuestionAnswer = (answer) => {
        if (answer.isCorrect) {
            // Todo: random item
            fox.addItem();
            return;
        }
        alert(`${question.hider.Name} rất thất vọng về bạn!`);
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
                currentPosition={position}
                goNextRoom={tryToGoNextRoom}
            />
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
            <QuestionButton onClick={handleQuestionClick} />
            {/* <button className="quiz-btn" onClick={handleQuestionClick}>
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
            </button> */}
            <NPCAvatar
                npc={npc}
                setPopupData={setPopupData}
                closePopup={closePopup}
            />
        </div>
    );
};

export default Room;
