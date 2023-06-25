import './App.css';
import Square from "./Square";
import { useState, useEffect } from 'react';
export default function Board() {
    const [state, setState] = useState({
        aliveArray: new Array(40 * 40).fill(false),
        boardWidth: 20,
        boardHeight: 20,
        active: false,
    });

    const reset = () => {
        const arr = [...state.aliveArray];
        arr.fill(false);
        setState({
            ...state,
            active: false,
            aliveArray: arr,
        })
    }

    const changeAlive = (index, alive) => {
        const arr = [...state.aliveArray];
        arr[index] = alive;
        setState({
            ...state,
            aliveArray: arr,
        })
    }

    const toggleActive = () => {
        setState({
            ...state,
            active: !state.active
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!state.active) return;
            const arr = [...state.aliveArray]
            for (let i = 0; i < state.boardHeight * state.boardWidth; i++) {
                const alive = state.aliveArray[i]
                let aliveNeighbors = 0;
                let neighborIndices = [
                    i - state.boardWidth - 1,
                    i - state.boardWidth,
                    i - state.boardWidth + 1,
                    i - 1,
                    i + 1,
                    i + state.boardWidth - 1,
                    i + state.boardWidth,
                    i + state.boardWidth + 1
                ];
                const rightEdge = (i + 1) % state.boardWidth === 0;
                const leftEdge = i % state.boardWidth === 0;
                const topEdge = i < state.boardWidth;
                const bottomEdge = i > state.boardWidth * state.boardHeight - state.boardWidth;
                if (rightEdge) {
                    neighborIndices[2] -= state.boardWidth
                    neighborIndices[4] -= state.boardWidth;
                    neighborIndices[7] = i + 1;
                }
                if (leftEdge) {
                    neighborIndices[0] = i - 1;
                    neighborIndices[3] += state.boardWidth;
                    neighborIndices[5] += state.boardWidth;
                }
                if (topEdge) {
                    neighborIndices[0] += state.boardWidth * state.boardHeight;
                    neighborIndices[1] += state.boardWidth * state.boardHeight;
                    neighborIndices[2] += state.boardWidth * state.boardHeight;
                }
                if (bottomEdge) {
                    neighborIndices[5] -= state.boardWidth * state.boardHeight;
                    neighborIndices[6] -= state.boardWidth * state.boardHeight;
                    neighborIndices[7] -= state.boardWidth * state.boardHeight;
                }
                neighborIndices.forEach(neighborIndex => {
                    if (neighborIndex < 0) return;
                    if (neighborIndex > state.boardHeight * state.boardWidth - 1) return;
                    if (state.aliveArray[neighborIndex]) aliveNeighbors++;
                })
                if (alive && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
                    arr[i] = false;
                }
                else if (!alive && aliveNeighbors === 3) {
                    arr[i] = true;
                }
            }
            setState({
                ...state,
                aliveArray: arr,
            })
        }, 50);
        return () => clearInterval(interval);
    }, [state]);

    let squareArray = [];
    for (let i = 0; i < state.boardHeight * state.boardWidth; i++) {
        squareArray.push(<Square active={state.active} changeAlive={changeAlive} alive={state.aliveArray[i]} index={i} key={i} />)
    }
    return (
        <div className="App">
            <div onDragStart={e => e.preventDefault()} className="Board" style={{ width: 20 * state.boardWidth + 18 }}>
                {squareArray}
            </div>
            <div className="Controls">
                <button onClick={() => toggleActive()}>{state.active ? 'STOP' : 'START'}</button>
                <button onClick={() => reset()}>RESET</button>
            </div>
        </div>
    );
}