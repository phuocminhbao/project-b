const NPCCard = ({ npc }) => {
    return (
        <div className="npc-card">
            <img className="npc-avatar" src={npc.Avatar} alt={npc.Name} />

            <div className="npc-name">{npc.Name}</div>

            <div className="npc-texts">
                {npc.Texts.map((text, index) => (
                    <p key={index} className="npc-text">
                        “{text}”
                    </p>
                ))}
            </div>
        </div>
    );
};

export default NPCCard;
