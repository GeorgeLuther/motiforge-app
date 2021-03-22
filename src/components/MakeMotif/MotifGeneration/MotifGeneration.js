import React from 'react'
import './MotifGeneration.css'

export default function MotifGeneration(props) {    
    //TODO: refactor as accordion with drop-downs, display info on option hover
    return (
        <div className="motif-generation">
            {props.motif_id &&
            <div className="note-by-note">
                <div className="about-method">
                    <h3>Add a note</h3>
                    <p>Picks the next note in a motif based on the current note.</p>
                </div>
                
                <div className="method-options">
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="randNote">random note</button>
                    Any note in the scale.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="chordNote">chord tone</button>
                    A harmonious note that tends to sound resolving.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="nearNote">near note</button>
                    The nearest 'resolving' note to the previous note.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="stepNote">step note</button>
                    Up or down one note.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="skipNote">skip note</button>
                    A note two notes away. (3rd interval)
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="hopNote">hop note</button>
                    A fourth up or a fifth down.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyNote} value="jumpNote">jump note</button>
                    A fifth up or a fourth down.
                    </label>
                </div>
            </div>}


            <div className="spawn-motif">
                <div className="about-method">
                    <h3>Generate a motif</h3>
                    <p>Having trouble coming up with an idea? Choose an option below and we'll make a motif for you.</p>
                </div>
                <div className="method-options">
                    <label>
                        <button className="method-btn" onClick={props.applyMotif} value="randMotif">random</button>
                    Generates a motif between two and seven notes long using random notes in the scale.
                    </label>
                    <label>
                        <button className="method-btn" onClick={props.applyMotif} value="makeMotif">resolving</button>
                    Generates a motif between two and seven notes long using the note generation techniques above. It will always start or end with a chord tone.
                    </label>
                    <label>
                        <button className="method-btn" onClick={props.applyMotif} value="linearMotif">linear</button>
                    Generates a motif moving up or down by a fixed interval. For example moving upwards playing every third note.
                    </label>
                    {/* <label>
                        <button className="method-btn" onClick={props.applyMethod} value="encircleMotif">encircling</button>
                    Generates a motif by symmetrically surrounding the ending note. For example if the end note was 5 it might be 3, 4, 7, 6, 5.
                    </label> */}
                </div>
            </div>
            {props.motif_id &&
            <div className="alter-motif">
                <div className="about-method">
                    <h3>Alter a motif</h3>
                    <p>One way to create interest a sense of development is to present variations of a motif. 
                        The options below will create an altered version of the currently selected motif.</p>
                </div>
                <div className="method-options">
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="reverse">reverse</button>
                        Flips a motif from start to end.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="mirror">mirror</button>
                        The original motif followed by its reverse.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="negate">negative</button>
                    Each note becomes its negative (relative to the tonal center).
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="invert">invert</button>
                    Each note becomes its negative relative to the starting note.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="upend">upend</button>
                    Each note becomes its negative relative to the end note.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="overturn">overturn</button>
                    Each note becomes its negative relative to the midpoint of the pitch range used.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="shuffle">shuffle</button>
                    Randomly redistributes some or all of the notes in a motif.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="trunk">truncate</button>
                    Takes (a) section(s) out of the motif.
                    </label>
                    <label>
                    <button className="method-btn" onClick={props.applyVariation} value="noise">noise</button>
                    Randomly replaces some non-chord tones.
                    </label>
                </div>
            </div>}
        </div>
    )
}
