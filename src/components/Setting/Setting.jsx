import { useState } from "react";
import "./Setting.css";
import { config, configLable } from "../../config/gameConfig";
import { getItemById } from "../../data/items";
import { HINT_NAME } from "../../constant/hint";

const Section = ({ title, children }) => (
    <div className="section">
        <h2>{title}</h2>
        {children}
    </div>
);

const Field = ({ label, value, type = "number", onChange }) => (
    <label className="field">
        <span>{label}</span>
        <input
            type={type}
            value={value}
            onChange={(e) =>
                onChange(
                    type === "number" ? Number(e.target.value) : e.target.value,
                )
            }
        />
    </label>
);
const Setting = () => {
    const [, forceUpdate] = useState({});

    const rerender = () => forceUpdate({});

    return (
        <div className="admin-config">
            <h1>Game Config</h1>

            <Section title="Map">
                <Field
                    label="Map size"
                    value={config.map.size}
                    onChange={(v) => {
                        config.map.size = v;
                        rerender();
                    }}
                />
                <Field
                    label="Max room's cost"
                    value={config.map.maxRoomCost}
                    onChange={(v) => {
                        config.map.maxRoomCost = v;
                        rerender();
                    }}
                />
                <Field
                    label="Shop rolls"
                    value={config.map.rolls}
                    onChange={(v) => {
                        config.map.rolls = v;
                        rerender();
                    }}
                />
                {Object.entries(config.map.probability).map(([k, v]) => (
                    <Field
                        key={k}
                        label={configLable[k]}
                        value={v}
                        onChange={(nv) => {
                            config.map.probability[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>

            <Section title="Fox">
                {Object.entries(config.fox).map(([k, v]) => (
                    <Field
                        key={k}
                        label={configLable[k]}
                        value={v}
                        onChange={(nv) => {
                            config.fox[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>

            <Section title="Items – Rarity">
                {Object.entries(config.item.rarelity).map(([k, v]) => (
                    <Field
                        key={k}
                        label={getItemById(k).Name}
                        value={v}
                        onChange={(nv) => {
                            config.item.rarelity[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>

            <Section title="Items – Probability">
                {Object.entries(config.item.probability).map(([k, v]) => (
                    <Field
                        key={k}
                        label={getItemById(k).Name}
                        value={v}
                        onChange={(nv) => {
                            config.item.probability[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>

            <Section title="Hints – Rarity">
                {Object.entries(config.hint.rarelity).map(([k, v]) => (
                    <Field
                        key={k}
                        label={HINT_NAME[k]}
                        value={v}
                        onChange={(nv) => {
                            config.hint.rarelity[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>

            <Section title="NPC">
                {Object.entries(config.npc).map(([k, v]) => (
                    <Field
                        key={k}
                        label={configLable[k]}
                        value={v}
                        onChange={(nv) => {
                            config.npc[k] = nv;
                            rerender();
                        }}
                    />
                ))}
            </Section>
        </div>
    );
};

export default Setting;
