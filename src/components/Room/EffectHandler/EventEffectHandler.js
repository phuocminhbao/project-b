import { EVENT_ID } from "../../../constant/event";
import { RoomEvent } from "../../../model/RoomEvent";

/**
 *
 * @param {{ roomEffectHandler: any; openPopup: any; }} param0
 * @param {*} param0.roomEffectHandler
 * @param {*} param0.openPopup
 * @returns {{ handleEventEffect: (event: any) => void; }}
 */
export const getEventEffectHandler = ({ roomEffectHandler, openPopup }) => {
    /**
     *
     * @type {{ [x: string]: (event: RoomEvent) => void; }}
     */
    const eventHandlerMap = {
        [EVENT_ID.FOX_OVERTHINKING]: (event) => {
            openPopup({
                text: event.Name,
            });
        },
    };
    const handleEventEffect = (event) => {};
    return { handleEventEffect };
};
