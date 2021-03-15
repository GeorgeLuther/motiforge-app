import React, { Component } from 'react'
import MotifDisplay from './MotifDisplay/MotifDisplay'
import './MakeMotif.css'
import Accordion from '../Accordion/Accordion'
import MotifGeneration from './MotifGeneration/MotifGeneration'
import MotifPicker from './MotifPicker/MotifPicker'
import MotifService from '../../services/motif-service'

export default class MakeMotif extends Component {
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
        })
    }
    addNewMotif=()=>{
        MotifService.addNewMotif()
            .then(motif => {
                this.setState({
                    motif_name: motif.name,
                    motif_id: motif.id,
                    motif: motif.notes
                })
            })
            .catch(err => {
                console.log('add mot err',err)
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
