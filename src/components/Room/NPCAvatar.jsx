import { saveNPCAsFound } from "../../helper/GameStrorage";
import { Button } from "../Shared/Button/Button";
const NPCAvatar = ({ npc, setPopupData, closePopup }) => {
    if (!npc) return <></>;
    return (
        <img
            style={{
                cursor: "pointer",
            }}
            src={npc.Avatar}
            alt="npc"
            className="npc"
            onClick={() => {
                saveNPCAsFound(npc.ID);
                setPopupData({
                    image: npc.Avatar,
                    text: npc.CurrentText,
                    children: (
                        <Button
                            onClick={() => {
                                if (npc.IsLastText) {
                                    npc.visted();
                                    closePopup();
                                    return;
                                }
                                const nextText = npc.NextText;
                                setPopupData((pre) => ({
                                    ...pre,
                                    text: nextText,
                                }));
                            }}
                        >
                            Okiiiii
                        </Button>
                    ),
                });
            }}
        />
    );
};
export default NPCAvatar;
