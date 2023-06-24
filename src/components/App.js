import './App.css';
import Square from "./Square";
import { useState } from 'react';
export default function Board() {
    const [state, setState] = useState({
        aliveArray: new Array(40 * 40).fill(false),
        boardWidth: 40,
        boardHeight: 40,
    });

    const reset = () => {
        const arr = [...state.aliveArray];
        arr.fill(false);
        setState({
            ...state,
            aliveArray: arr,
        })
    }

    const changeAlive = (index) => {
        const arr = [...state.aliveArray];
        arr[index] = true;
        setState({
            ...state,
            aliveArray: arr,
        })
    }
    let squareArray = [];
    for (let i = 0; i < state.boardHeight * state.boardWidth; i++) {
        squareArray.push(<Square changeAlive={changeAlive} alive={state.aliveArray[i]} index={i} key={i} />)
    }
    return (
        <div className="App">
            <div className="Board" style={{ width: 20 * state.boardWidth + 18 }}>
                {squareArray}
            </div>
            <div className="Controls">
                <button>Start</button>
                <button onClick={() => reset()}>Reset</button>
            </div>
        </div>
    );
}