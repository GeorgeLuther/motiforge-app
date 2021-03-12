import React from 'react'

export default function MotifGeneration(props) {

    //TODO: pass option to parent component, dynamically call function to edit motif.

    return (
        <div className="motif-generation">
            <div className="note-by-note">
                <h3>Add a note</h3>
                <p>Helps pick the next note in a motif based on the current note.</p>
                <label>sound: 
                    <select 
                    className="note-dropdown"
                    //onChange={handleChangeSound}
                    >
                        <option value="randNote">random</option>
                    </select>
                </label>
                <div>
                    <button>random</button>
                    <button>any chord tone</button>
                    <button>nearest chord tone</button>
                    <button>Up or down one scale degree</button>
                    <button>Up a fourth or down a fifth</button>
                    
                </div>
            </div>
            <div className="spawn-motif">
                <h3>Generate a motif</h3>
                <div>
                   <button>random</button>
                   <button>resolving</button>
                   <button>linear</button>
                   <button>circling</button>
                </div>
            </div>
            <div className="alter-motif">
                <h3>Alter a motif</h3>
                <div>
                   <button>reverse</button>
                   <button>mirror</button>
                   <button>negate</button>
                   <button>invert</button>
                   <button>upend</button>
                   <button>overturn</button>
                   <button>shuffle</button>
                </div>
            </div>
        </div>
    )
}
