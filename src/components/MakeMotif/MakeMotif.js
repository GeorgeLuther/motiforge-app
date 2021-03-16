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
    updateMotif=()=>{
        let newData = {
            name: this.state.motif_name,
            notes: this.state.motif
        }
        MotifService.editMotif(this.state.motif_id, newData)
    }
    onChangeNote=(e)=>{
        const newNote = Number(e.target.value)
        const newMotif = [...this.state.motif]
        let beatIdx = e.target.name
        beatIdx = Number(beatIdx.split("beat-")[1])
        newMotif.splice(beatIdx, 1, newNote)
        this.setState({motif: newMotif}, ()=> this.updateMotif())
    }
    onAddBeat=()=>{
        this.setState({motif: [...this.state.motif,0]}, ()=> this.updateMotif())
    }
    onDeleteBeat=()=>{
        if (this.state.motif.length > 2) {
            const newMotif =  [...this.state.motif]
            newMotif.pop()
            this.setState({motif: newMotif}, ()=> this.updateMotif())            
        } else {
            alert('motifs must have at least two notes')
        }
    }
    onChangeName=(e)=>{
        this.setState({motif_name: e.target.value},()=> this.updateMotif())
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
    deleteMotif=()=>{
        //TODO: Add alert modal to confirm 
        MotifService.deleteMotif(this.state.motif_id)
        this.setState({
            motif_name: null,
            motif_id: null,
            motif: null,
        })
    }

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
                        onChangeName={this.onChangeName}
                        onAddBeat={this.onAddBeat}
                        onDeleteBeat={this.onDeleteBeat}
                        addNewMotif={this.addNewMotif}
                        deleteMotif={this.deleteMotif}
                    />
                    <MotifGeneration
                        motifArr={this.state.motif}
                    />
                </Accordion>
            </section>
        )
    }
}
