import React, { useState } from "react";

const Die = ({dieSides, dieFace}) => {
    const generateKey = () => `${Date.now()}-${Math.random()}`;

    return (
        <div key={generateKey()} className={`d${dieSides}`}>{dieFace}</div>
    )
}

export default Die