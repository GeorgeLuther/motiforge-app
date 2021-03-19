import React from 'react'
//import './PhraseDisplay.css'

export default function PhraseDisplay(props) {
    return (
        <div className="motif-display">
            {!props.phrase_id && <div className="motif-display-summary">
                <h3>How it works</h3>
                <p> To make a phrase, first add a few motifs from the dropdown. It is a good idea to have some ideas to repeat at some point as this adds a sense of familiarity and structure. Each column represents a motif. Shift the harmonic context (mode) of a motif by clicking a different color option in the column. 
                    The red note represents the root note (tonic). Experiment with these positions to create tension and release. One common progression would be red (I), green (IV), turquoise (V), red (I). The color coding matches that of Boomwhackers.
                    Remember, rules were made to be broken!</p>
            </div>}
            <div className="motif-editor">
                <button className="motif-btn" onClick={props.addNewPhrase}>start new phrase</button>
                {props.phraseArr && 
                    <label  className="motif-name-label">phrase name:
                    <input className="motif-name" defaultValue={props.phraseName} onChange={props.onChangeName}></input>
                    </label>
                }
                <div className="motif-graph">
                {props.phraseArr && props.phraseArr.map((val,idx) => {
                    return (
                        <div 
                            className={`motif-column${(idx%2) ? ' dark' : ''}`}
                            key={`colum-${idx}`}
                            onChange={props.onChangeMode}
                        >
                            <p>motif {val}</p>
                            {Beat(props.shiftArr[idx], idx)}
                        </div>
                    )
                })}
                </div>
                {props.phraseArr &&
                <div className="motif-options">
                    <label className="motif-dropdown">
                        Your motifs:
                        <select name="motif-options" onChange={props.onSelectMotif}>
                            {props.allMotifs.map(idea => <option key={idea.name+idea.id} value={idea.id}>{idea.name}</option>)}
                        </select>
                    </label>
                    <button className="motif-btn" onClick={props.onAddMotif}>add selected motif</button>
                    <button className="motif-btn" onClick={props.onDeleteMotif}>delete last motif</button>
                    <button className="motif-btn" onClick={props.deletePhrase}>delete phrase</button>
                </div>}
            </div>
        </div>
    )
}

const Beat=(val,idx)=>{
    const classArr = [
        "btn-7th",
        "btn-6th",
        "btn-5th",
        "btn-4th",
        "btn-3rd",
        "btn-2nd",
        "btn-root",
    ]
    const valueArr = [6,5,4,3,2,1,0]

    return valueArr.map((value, index) => {
        const scaleDegree = (value+1 > 0) ? value+1 : 8+value
        if (value === val) {
            return (
                <label htmlFor={`beat-${idx}`} key={`beat-${index}-${idx}`}
                className={(index===0 || index===3 || index===5 || index===7 || index===10) ? 'light' : 'reg'}>
                    {`beat: ${idx+1}, scale degree: ${scaleDegree}`}
                    <input 
                        type="radio"
                        name={`beat-${idx}`}
                        id={`beat-${index}-${idx}`}
                        className={classArr[index]}
                        value={value}
                        defaultChecked
                    >
                    </input>
                </label>                
            )
        }
        return (
            <label htmlFor={`beat-${idx}`} key={`beat-${index}_${idx}`}
            className={(index===0 || index===3 || index===5 || index===7 || index===10) ? 'light' : 'reg'}>
                {`beat: ${idx+1}, scale degree: ${scaleDegree}`}
                <input 
                    type="radio"
                    name={`beat-${idx}`}
                    id={`beat-${index}-${idx}`}
                    className={classArr[index]}
                    value={valueArr[index]}
                >
                </input>
            </label>
        )        
    })
}