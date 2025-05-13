import React, { useState } from "react";

const Die = ({dieSides, dieFace}) => {

    return (
        <div className={`d${dieSides}`}>{dieFace}</div>
    )
}

export default Die