import React from 'react'
import './MotifDisplay.css'

export default function MotifDisplay(props) {
    return (
        <div className="motif-display">
            {props.motifArr.map((val,idx) => {
                return (
                    <div 
                        className={`motif-column`}
                        key={`colum-${idx}`}
                        onChange={props.onChangeNote}
                    >
                        {Beat(val, idx)}
                    </div>
                )
            })}
        </div>
    )
}

const Beat=(val,idx)=>{
    const classArr = [
        "btn-octave",
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
        if (value === val) {
            return (
                <label htmlFor={`beat-${idx}`} key={`beat-${index}-${idx}`}>
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
            <label htmlFor={`beat-${idx}`} key={`beat-${index}_${idx}`}>
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