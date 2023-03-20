import './SquareRow.css';
import Square from "./Square";
export default function Board({ width }) {
    let squareArray = [];
    for (let i = 0; i < width; i++) {
        squareArray.push(<Square key={i} />)
    }
    return (
        <div className="SquareRow">
            {squareArray}
        </div>
    );
}