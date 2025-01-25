import React, {useState} from "react";
import { statValue } from './characterStats.module.css'


function WindCounter ({totalWind}) {
    
    let currentWind = totalWind;

    const [count, setCount] = useState(totalWind);
        currentWind = count;
    return (
        <>
            <div>Wind: <span className={statValue}>{currentWind}</span> / <span className={statValue}>{totalWind}</span></div>
            <button onClick={() => count > 0 ? setCount(count - 1) : setCount(count - 0)}>-</button>
            <button onClick={() => count < totalWind ? setCount(count + 1) : setCount(count + 0)}>+</button>
            <button onClick={() => setCount(count + totalWind - currentWind)}>rest</button>
        </>
    )
};

export default WindCounter;