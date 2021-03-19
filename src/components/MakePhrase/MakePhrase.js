import React, { Component } from 'react'
import PhraseService from '../../services/phrase-service'
import MotifService from '../../services/motif-service'
//import PhraseMethods from '../../utils/phrase-methods'
import { phraseToMidi } from '../../utils/audio-playback'
import Accordion from '../Accordion/Accordion'
import ControlPanel from '../ControlPanel/ControlPanel'
import PhrasePicker from './PhrasePicker/PhrasePicker'
import PhraseDisplay from './PhraseDisplay/PhraseDisplay'

// import MotifGeneration from './MotifGeneration/MotifGeneration'
import './MakePhrase.css'

export default class MakePhrase extends Component {
    state = {
        phrase_name: null,
        phrase_id: null,
        motifs: [],
        modal_shifts: [],
        allMotifs: [],
        motifOption: null,
    }
    componentDidMount(){
        MotifService.getMotifs()
            .then(motifArr => {
                const motifInfo = motifArr.map(motif => {
                    return { id: motif.id, name: motif.name }
                })
                this.setState({allMotifs: motifInfo})
            })
    }
    updatePhrase=()=>{
        phraseToMidi(this.state.motifs, this.state.modal_shifts)
        let newData = {
            name: this.state.phrase_name,
            motifs: this.state.motifs,
            modal_shifts: this.state.modal_shifts
        }
        PhraseService.editPhrase(this.state.phrase_id, newData)
    }
    onSelectPhrase=(e)=>{
        const newMotifs = e.currentTarget.getAttribute("motifs").split(',').map(motif => Number(motif))
        const newShifts = e.currentTarget.getAttribute("modal_shifts").split(',').map(modal_shifts => Number(modal_shifts))

        this.setState({
            phrase_name: e.currentTarget.getAttribute("motif_name"),
            phrase_id: Number(e.currentTarget.getAttribute("motif_id")),
            motifs: newMotifs,
            modal_shifts: newShifts,
        }, ()=> phraseToMidi(newMotifs, newShifts))
    }
    onChangeMode=(e)=>{
        console.log(e.target.value)
        const newMode = Number(e.target.value)
        const newModeArr = [...this.state.modal_shifts]
        let beatIdx = e.target.name
        beatIdx = Number(beatIdx.split("beat-")[1])
        newModeArr.splice(beatIdx, 1, newMode)
        this.setState({modal_shifts: newModeArr}, ()=> this.updatePhrase())
    }
    onSelectMotif=(e)=>{
        this.setState({motifOption: e.target.value})
    }
    onAddMotif=()=>{
        if (this.state.motifOption && this.state.phrase_id) {
            this.setState({motifs: [...this.state.motifs, Number(this.state.motifOption)]}, ()=> this.updatePhrase())
        } else {
            alert('Please select a motif from your motifs dropdown.')
        }
        
    }
    onDeleteMotif=()=>{
        if (this.state.motifs.length > 0 && this.state.phrase_id) {
            const newMotifs =  [...this.state.motifs]
            newMotifs.pop()
            this.setState({motifs: newMotifs}, ()=> this.updatePhrase())            
        } else {
            alert('Phrase cannot have any fewer motifs')
        }
    }
    onChangeName=(e)=>{
        if (this.state.phrase_id !== null) {
            this.setState({phrase_name: e.target.value},()=> this.updatePhrase())
        } else {
            alert('Please add or select a phrase first.')
        }
    }

    addNewPhrase=()=>{
        PhraseService.addNewPhrase()
            .then(phrase => {
                console.log(phrase.motifs)
                this.setState({
                    phrase: phrase.name,
                    phrase_id: phrase.id,
                    motifs: phrase.motifs,
                    modal_shifts: phrase.modal_shifts
                }, ()=> phraseToMidi(phrase.motifs, phrase.modal_shifts))
            })
            .catch(err => {
                console.log('Error adding motif',err)
            })
    }
    // deleteMotif=()=>{
    //     //TODO: Add alert modal to confirm 
    //     MotifService.deleteMotif(this.state.motif_id)
    //     this.setState({
    //         motif_name: null,
    //         motif_id: null,
    //         motif: null,
    //     })
    //     motifToMidi([])
    // }
    // applyNote=(e)=>{
    //     if (this.state.motif && this.state.motif.length > 0) {
    //         const motif = [...this.state.motif]
    //         const idea = MotifMethods[e.target.value](motif)
    //         motif.push(idea)
    //         this.setState({motif: motif}, ()=> this.updateMotif())    
    //     } else {
    //         alert('Select a motif from Select Motif or start a new motif in Draw Motif')
    //     }
    // }
    // generateMotif=(e)=>{
    //     MotifService.addNewMotif()
    //         .then(motif => {
    //             const renderedNotes = MotifMethods[e.target.value]()
    //             this.setState({
    //                 motif_name: `generated-${e.target.value}`,
    //                 motif_id: motif.id,
    //                 motif: renderedNotes
    //             }, ()=> this.updateMotif())
    //         })
    //         .catch(err => {
    //             console.log('Error generating motif',err)
    //         })
    // }
    // applyVariation=(e)=>{
    //     const variation = MotifMethods[e.target.value](this.state.motif)
    //     const originalName = this.state.motif_name
    //     MotifService.addNewMotif()
    //         .then(motif => {
    //             this.setState({
    //                 motif_name: `${originalName}-var-${e.target.value}`,
    //                 motif_id: motif.id,
    //                 motif: variation
    //             }, ()=> this.updateMotif())
    //         })
    //         .catch(err => {
    //             console.log('Error generating motif',err)
    //         })
    // }
    render(){
        return (
            <section className="make-phrase">
                <ControlPanel name={this.state.phrase_name}/>
                <Accordion 
                    groupName="make-phrase"
                    headerTextArr={["Select Phrase","Shift Phrase","Generate Phrase"]}
                >
                    <PhrasePicker 
                        selectedId={this.state.phrase_id}
                        onClickPhrase={this.onSelectPhrase}
                    />
                    <PhraseDisplay
                        phraseArr={this.state.motifs}
                        shiftArr={this.state.modal_shifts}
                        allMotifs={this.state.allMotifs}
                        phraseName={this.state.phrase_name}
                        onSelectMotif={this.onSelectMotif}
                        onAddMotif={this.onAddMotif}

                        addNewPhrase={this.addNewPhrase}

                        onChangeMode={this.onChangeMode}
                        onChangeName={this.onChangeName}
                        
                        onDeleteMotif={this.onDeleteMotif}
                        addNewMotif={this.addNewMotif}
                        deleteMotif={this.deleteMotif}
                    />
                    {/* <MotifGeneration
                        applyNote={this.applyNote}
                        applyMotif={this.generateMotif}
                        applyVariation={this.applyVariation}
                    /> */}
                </Accordion>
            </section>
        )
    }
}
