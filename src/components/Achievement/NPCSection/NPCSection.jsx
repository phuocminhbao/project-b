import LockedNPCCard from "./LockedNPCCard";
import NPCCard from "./NPCCard";

const NPCSection = ({ allNPCs, foundNpcIds }) => {
    return (
        <section className="achievement-section">
            <header className="section-header">
                <h2>🧍 NPC Encounters</h2>
                <span className="progress-text">
                    Met {foundNpcIds.length} / {allNPCs.length}
                </span>
            </header>

            <div className="npc-grid">
                {allNPCs.map((npc) => {
                    const isFound = foundNpcIds.includes(npc.ID);

                    if (!isFound) {
                        return <LockedNPCCard key={npc.ID} />;
                    }

                    return <NPCCard key={npc.ID} npc={npc} />;
                })}
            </div>
        </section>
    );
};

export default NPCSection;
