import './Square.css';
import { useState } from 'react';
export default function Square() {
    const [alive, setAlive] = useState(false);
    return (
        <div className={alive ? 'Square' : 'Square dead'} onClick={e => setAlive(!alive)}>
        </div>
    );
}