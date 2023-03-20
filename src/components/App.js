import './App.css';
import SquareRow from "./SquareRow";
import { useState } from 'react';
export default function Board() {
    const [reset, setReset] = useState(false);
    const boardWidth = 40;
    const boardHeight = 40;
    let rowArray = [];
    for (let i = 0; i < boardHeight; i++) {
        rowArray.push(<SquareRow width={boardWidth} key={i} />)
    }
    const resetDebounce = () => {
        setReset(true)
        setTimeout(() => {
            setReset(false)
        }, 500)
    }
    return (
        <div className="App">
            <div className="Board">
                {rowArray}
            </div>,
            <div className="Controls">
                <button>Start</button>
                <button onClick={() => resetDebounce()} disabled={reset}>Reset</button>
            </div>
        </div>
    );
}