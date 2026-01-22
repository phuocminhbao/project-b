import "./Room.css";
import Popup from "../Popup/Popup";
import { useMemo, useRef, useState } from "react";
import InfoBox from "../InfoBox/InfoBox";
import { mapData } from "../../data/map";
import { getRandomInt, inChanceOf } from "../../utils/numberUtils";
import { getRandomElement, shuffle } from "../../utils/array";
import { hitEndMessage } from "../../data/texts";
import { fox } from "../../model/Fox";
import { penguin } from "../../model/Penguin";
import { duck } from "../../model/Duck";
import { Button } from "../Shared/Button/Button";
import NPCAvatar from "./NPCAvatar";
import { getNextRoomPosition, DIRECTION } from "../../utils/room";
import DirectionArrows from "./DirectionArrows";
import QuestionButton from "./QuestionButton";
import { getItem } from "../../data/items";
import ShieldIcon from "../Shared/Icon/Shield";
import { CharacterPositionSynchronizer } from "../../helper/CharacterPositionSynchronizer";
import { createRoomEffectHandler } from "./EffectHandler/RoomEffectHandler";
import { getItemEffectHandler } from "./EffectHandler/ItemEffectHandler";
import EventPopup from "../Popup/EventPopup";
import { EVENT_REGISTRY, getRandomEvent } from "../../data/events";
import { getRoomEventHandler } from "./EffectHandler/RoomEventHandler";
import { config } from "../../config/gameConfig";
import SpikedMace from "../Shared/Icon/SpikedMace";
import Shop from "./Shop/Shop";

const Room = () => {
    const [popupData, setPopupData] = useState();
    const [, updateScreen] = useState({});

    const roomSpecialEffectRef = useRef({
        isAnswered: false,
        itemQuestions: 0,
        isGoToLastRoom: false,
        isEventProcessed: false,
        rewardDirection: undefined,
        disableDirection: {
            [DIRECTION.UP]: false,
            [DIRECTION.DOWN]: false,
            [DIRECTION.LEFT]: false,
            [DIRECTION.RIGHT]: false,
        },
        forceNPCNoHintRemaining: 0,
    });

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

    const ClosePopupButton = ({ text = "Alright!", closeAction }) => {
        return (
            <Button
                onClick={() => {
                    closeAction && closeAction();
                    closePopup();
                }}
            >
                {text}
            </Button>
        );
    };

    const openPopup = ({ image, text, closeText, closeAction }) => {
        setPopupData({
            image,
            text,
            children: (
                <ClosePopupButton text={closeText} closeAction={closeAction} />
            ),
        });
    };

    const { npc, question, isExit } = mapData[fox.Row][fox.Col];
    const isEndGame = false;
    // (isExit && found.duck && found.penguin && !fox.IsAlone) || fox.Points <= 0;

    const event = useMemo(() => {
        if (inChanceOf(config.map.probability.generateEvent)) {
            return getRandomEvent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fox.Row, fox.Col]);

    const openHitWallPopup = () => {
        setTimeout(() => {
            openPopup({
                text: `Ngõ cụt: ${getRandomElement(hitEndMessage)}`,
                closeText: "cái djtconmeeeee cuocdoi",
            });
        });
    };

    const roomEffectHandler = createRoomEffectHandler({
        roomSpecialEffectRef,
        refreshScreen,
        openHitWallPopup,
        openPopup,
    });

    const {
        isAnswered,
        isGoToLastRoom,
        isQuestionsReturnItem,
        isEventProcessed,
        goToLastRoomInDirection,
        tryToGoNextRoom,
        decreaseQuestionsReturnItem,
        goWrapper,
        resetDisableDirection,
    } = roomEffectHandler;

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
            resetDisableDirection();
            if (isGoToLastRoom()) {
                goToLastRoomInDirection(direction);
            } else {
                tryToGoNextRoom(position, cost);
            }
        };
        return {
            direction,
            position,
            cost,
            go: goWrapper(direction, go),
            isDisable: roomSpecialEffectRef.current.disableDirection[direction],
        };
    });

    const handleAnswerQuestion = (answer) => {
        const isRewardAsItem = isQuestionsReturnItem();
        if (isRewardAsItem) {
            decreaseQuestionsReturnItem();
        }
        if (!answer.isCorrect) {
            fox.minusPoints(question.point);
            return;
        }
        if (isRewardAsItem) {
            const item = getItem();
            fox.addItem(item);
            setTimeout(() => {
                openPopup({
                    image: fox.Avatar,
                    text: `Cool, get a new toy: ${item.Name}`,
                });
            });
            return;
        }
        fox.addPoints(question.point);
    };

    const handleSpecialQuestionAnswer = (answer) => {
        const openHiderPopup = (message) => {
            const { hider } = question;
            setTimeout(() => {
                openPopup({
                    image: hider.Avatar,
                    text: message,
                    closeText: "Bye!",
                });
            });
        };
        if (answer.isCorrect) {
            fox.addItem(getItem());
            openHiderPopup(
                `${question.hider.Name}: Check kho đồ dei, ms cho m con hàng á`
            );
            return;
        }
        openHiderPopup(
            `${question.hider.Name}: Bn bè coin card j deos bít j về nhau à?`
        );
    };

    const handleAnswerClick = (answer) => {
        if (!isAnswered()) {
            question.isSpecial
                ? handleSpecialQuestionAnswer(answer)
                : handleAnswerQuestion(answer);
            roomEffectHandler.setIsAnswered(true);
        }
        closePopup();
    };

    const handleQuestionClick = () => {
        setPopupData({
            text: question.title,
            choices: shuffle(question.answers).map((answer) => ({
                label: answer.title,
                onClick: () => {
                    handleAnswerClick(answer);
                },
            })),
        });
    };
    const { handleItemSelect } = getItemEffectHandler({
        roomEffectHandler,
        openPopup,
    });

    const { handleRoomEvent } = getRoomEventHandler({
        roomEffectHandler,
        openPopup,
    });

    return (
        <div className="room">
            {found.duck && <img src={duck.Avatar} alt="duck" className="fox" />}
            <div className="fox-wrapper">
                <img src={fox.Avatar} alt="fox" className="fox" />
                {fox.HasShield && <ShieldIcon className="fox-shield" />}
            </div>
            {found.penguin && (
                <div className="fox-wrapper">
                    <img src={penguin.Avatar} alt="penguin" className="fox" />
                    {penguin.IsNeedSpikedMace && penguin.IsFoundSpikedMace && (
                        <SpikedMace className="fox-shield" />
                    )}
                </div>
            )}
            <DirectionArrows nextRoomsInfos={nextRoomsInfos} />
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
            {event && !isEventProcessed() && (
                <EventPopup
                    event={event}
                    onClose={() => {
                        handleRoomEvent(event);
                    }}
                />
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
                        isQuestionsReturnItem() || question.isSpecial
                    }
                    isAnswered={isAnswered()}
                />
            )}
            <NPCAvatar
                npc={npc}
                setPopupData={setPopupData}
                closePopup={closePopup}
            />
            <Shop />
        </div>
    );
};

export default Room;
