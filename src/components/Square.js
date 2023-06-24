import './Square.css';
export default function Square({ alive, changeAlive, index }) {
    return (
        <div className={alive ? 'Square' : 'Square dead'} onClick={e => changeAlive(index)}>
        </div>
    );
}