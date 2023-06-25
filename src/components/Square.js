import './Square.css';
export default function Square({ active, alive, changeAlive, index }) {
    const clickSquare = () => {
        if (active) return;
        changeAlive(index, true);
    }
    const contextSquare = (e = null) => {
        if (e !== null) e.preventDefault();
        changeAlive(index, false);
    }
    const hoverSquare = (e) => {
        const leftMouseDown = e.buttons === 1;
        const rightMouseDown = e.buttons === 2;
        if (leftMouseDown) clickSquare();
        if (rightMouseDown) contextSquare();
    }
    return (
        <div className={alive ? 'Square' : 'Square dead'} onClick={e => clickSquare()} onMouseOver={e => hoverSquare(e)} onContextMenu={e => contextSquare(e)}>
        </div>
    );
}