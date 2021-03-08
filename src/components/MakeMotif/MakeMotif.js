import React, { Component } from 'react'
import MotifDisplay from './MotifDisplay/MotifDisplay'
import './MakeMotif.css'

export default class MakeMotif extends Component {
    //IS setState re-render necessary, since the visual isn't affected?
    state = {
        motif: [1,2,3,4,5]
    }
    onChangeNote=(e)=>{
        const newNote = Number(e.target.value)
        const newMotif = [...this.state.motif]
        let beatIdx = e.target.name
        beatIdx = Number(beatIdx.split("beat-")[1])
        newMotif.splice(beatIdx, 1, newNote)
        this.setState({motif: newMotif})
    }
    render(){
        return (
            <section className="make-motif"> 
                <MotifDisplay 
                    motifArr={this.state.motif}
                    onChangeNote={this.onChangeNote}
                />
            </section>
        )
    }
}
