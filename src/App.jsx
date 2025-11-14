import { useState } from "react";
import "./App.css";
import Room from "./components/Room/Room";
import { FoxContext } from "./context/fox/foxContext";
import { Fox } from "./model/fox";

function App() {
    const [fox, setFox] = useState(new Fox());

    return (
        <FoxContext value={[fox, setFox]}>
            <Room></Room>;
        </FoxContext>
    );
}

export default App;
