import React, { Component } from 'react'
import MotifDisplay from './MotifDisplay/MotifDisplay'
import Accordion from '../Accordion/Accordion'
import MotifGeneration from './MotifGeneration/MotifGeneration'
import MotifPicker from './MotifPicker/MotifPicker'
import MotifService from '../../services/motif-service'
import ControlPanel from '../ControlPanel/ControlPanel'
import { motifToMidi } from '../../utils/audio-playback'
import MotifMethods from '../../utils/motif-methods'
import './MakeMotif.css'
import UserContext from '../../contexts/UserContext'

export default class MakeMotif extends Component {

    static contextType = UserContext

    state = {
        motif_name: null,
        motif_id: null,
        motif: [],
    }
    updateMotif=()=>{
        motifToMidi(this.state.motif)
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
        if (this.state.motif.length < 17) {
        this.setState({motif: [...this.state.motif,0]}, ()=> this.updateMotif())
        } else {
            alert('Motifs should be brief and distinct musical ideas, consider turning your idea into multiple motifs. You can make it into a phrase later.')
        }
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
        if (this.state.motif_id !== null) {
            this.setState({motif_name: e.target.value},()=> this.updateMotif())
        } else {
            alert('Please add or select a motif first.')
        }
        
    }
    onSelectMotif=(e)=>{
        const newNotes = e.currentTarget.getAttribute("notes").split(',').map(note => Number(note))
    
        this.setState({
            motif_name: e.currentTarget.getAttribute("motif_name"),
            motif_id: Number(e.currentTarget.getAttribute("motif_id")),
            motif: newNotes
        }, ()=> motifToMidi(this.state.motif))
    }
    addNewMotif=()=>{
        MotifService.addNewMotif()
            .then(motif => {
                this.setState({
                    motif_name: motif.name,
                    motif_id: motif.id,
                    motif: motif.notes
                }, ()=> motifToMidi(this.state.motif))
            })
            .catch(err => {
                console.log('Error adding motif',err)
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
        motifToMidi([])
    }
    applyNote=(e)=>{
        if (this.state.motif && this.state.motif.length > 0) {
            const motif = [...this.state.motif]
            const idea = MotifMethods[e.target.value](motif)
            motif.push(idea)
            this.setState({motif: motif}, ()=> {
                this.updateMotif()
                this.context.setOpenTab(1)
            })  
            
        } else {
            alert('Select a motif from \'Select Motif\' or start a new motif in \'Draw Motif\'.')
        }
    }
    generateMotif=(e)=>{
        MotifService.addNewMotif()
            .then(motif => {
                const renderedNotes = MotifMethods[e.target.value]()
                this.setState({
                    motif_name: `generated-${e.target.value}`,
                    motif_id: motif.id,
                    motif: renderedNotes
                }, ()=> {
                    this.updateMotif()
                    this.context.setOpenTab(1)
                })
            })
            .catch(err => {
                console.log('Error generating motif',err)
            })
    }
    applyVariation=(e)=>{
        const variation = MotifMethods[e.target.value](this.state.motif)
        const originalName = this.state.motif_name
        MotifService.addNewMotif()
            .then(motif => {
                this.setState({
                    motif_name: `${originalName}-var-${e.target.value}`,
                    motif_id: motif.id,
                    motif: variation
                }, ()=> {
                    this.updateMotif()
                    this.context.setOpenTab(1)
                })
            })
            .catch(err => {
                console.log('Error generating variation motif',err)
            })
    }
    render(){
        return (
            <section className="make-motif">
                <ControlPanel name={this.state.motif_name}/>
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
                        motif_id={this.state.motif_id}
                        onChangeNote={this.onChangeNote}
                        onChangeName={this.onChangeName}
                        onAddBeat={this.onAddBeat}
                        onDeleteBeat={this.onDeleteBeat}
                        addNewMotif={this.addNewMotif}
                        deleteMotif={this.deleteMotif}
                    />
                    <MotifGeneration
                        motif_id={this.state.motif_id}
                        applyNote={this.applyNote}
                        applyMotif={this.generateMotif}
                        applyVariation={this.applyVariation}
                    />
                </Accordion>
            </section>
        )
    }
    componentWillUnmount(){
        this.context.setOpenTab(-1)
    }
}
