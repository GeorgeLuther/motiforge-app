import React from 'react'
import './MotifDisplay.css'

export default function MotifDisplay(props) {
    return (
        <div className="motif-display">
            {!props.motif_id && <div className="motif-display-summary">
                <h3>How it works</h3>
                <p> It is recommended that a motif is somewhere between three and ten beats long. Each column represents a beat in the motif. Change the pitch of a note by clicking a different color option in the column. 
                    The red note represents the root note (tonic). The rows highlighted in white are chord tones. 
                    Chord tones imply resolution and work well as starting or ending notes. Non-chord tones tend to be more dissonant and imply tension. 
                    Then again, rules were made to be broken!</p>
            </div>}
            <div className="motif-editor">
                <button className="motif-btn" onClick={props.addNewMotif}>start new motif</button>
                {props.motif_id && 
                    <label  className="motif-name-label">motif name:
                    <input className="motif-name" defaultValue={props.motifName} onChange={props.onChangeName}></input>
                    </label>
                }
                <div className="motif-graph">
                {props.motif_id && props.motifArr.map((val,idx) => {
                    return (
                        <div 
                            className={`motif-column${(idx%2) ? ' dark' : ''}`}
                            key={`colum-${idx}`}
                            onChange={props.onChangeNote}
                        >
                            {Beat(val, idx)}
                        </div>
                    )
                })}
                </div>
                {props.motif_id &&
                <div className="motif-options">
                    <button className="motif-btn" onClick={props.onAddBeat}>add new beat</button>
                    <button className="motif-btn" onClick={props.onDeleteBeat}>delete last beat</button>
                    <button className="motif-btn" onClick={props.deleteMotif}>delete motif</button>
                </div>}
            </div>
        </div>
    )
}

const Beat=(val,idx)=>{
    const classArr = [
        "btn-root",
        "btn-7th",
        "btn-6th",
        "btn-5th",
        "btn-4th",
        "btn-3rd",
        "btn-2nd",
        "btn-root",
        "btn-7th",
        "btn-6th",
        "btn-5th"
    ]
    const valueArr = [7,6,5,4,3,2,1,0,-1,-2,-3]

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