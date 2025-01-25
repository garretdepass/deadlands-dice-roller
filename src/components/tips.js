import React from "react";
import {tipsContainer} from './tips.module.css'

function Tips () {
    return (
        <div className={tipsContainer}>
            <h2>Title</h2>
            <p>Tip content. This eventually will rotate but for now it's just placeholder. The placeholder just needs to be long enough to give a general idea. You get the point.</p>
        </div>
    )
}

export default Tips