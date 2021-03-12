import React, { Component } from 'react'
import MotifDisplay from './MotifDisplay/MotifDisplay'
import './MakeMotif.css'
import Accordion from '../Accordion/Accordion'
import MotifGeneration from './MotifGeneration/MotifGeneration'
import MotifPicker from './MotifPicker/MotifPicker'
import MotifService from '../../services/motif-service'

export default class MakeMotif extends Component {
    //IS setState re-render necessary, since the visual isn't affected?
    state = {
        motif_name: null,
        motif_id: null,
        motif: null,
    }
    onChangeNote=(e)=>{
        const newNote = Number(e.target.value)
        const newMotif = [...this.state.motif]
        let beatIdx = e.target.name
        beatIdx = Number(beatIdx.split("beat-")[1])
        newMotif.splice(beatIdx, 1, newNote)
        this.setState({motif: newMotif})
    }
    onSelectMotif=(e)=>{
        const newNotes = e.currentTarget.getAttribute("notes").split(',').map(note => Number(note))
    
        this.setState({
            motif_name: e.currentTarget.getAttribute("motif_name"),
            motif_id: Number(e.currentTarget.getAttribute("motif_id")),
            motif: newNotes
        }, () => console.log(this.state))
    }
    addNewMotif=(e)=>{
        MotifService.addNewMotif()
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    //addNote=()=>{

    //F}
    render(){
        return (
            <section className="make-motif">
    
                <Accordion 
                    groupName="make-motif"
                    headerTextArr={["Select Motif","Draw Motif","Generate Motif"]}
                >
                    <MotifPicker 
                        selectedId={this.state.motif_id}
                        onClickMotif={this.onSelectMotif}
                    />
                    <MotifDisplay
                        motifArr={this.state.motif}
                        motifName={this.state.motif_name}
                        onChangeNote={this.onChangeNote}
                        addNewMotif={this.addNewMotif}
                    />
                    <MotifGeneration
                        motifArr={this.state.motif}
                    />
                </Accordion>
            </section>
        )
    }
}
