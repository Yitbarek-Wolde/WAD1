import React, { useState } from 'react';
import './App.css';

function RandmonNum() {


    const [RandNum, setRand] = useState(1);
    const Randomize = () => {
        
        setRand(Math.floor(Math.random() * 100));
    }

    return (
        <div>
            {RandNum}
            <button onClick={Randomize}>Generate random</button>
        </div>
    );

}

export default RandmonNum;
