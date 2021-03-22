import React, { Component } from 'react'
// import MotifDisplay from './MotifDisplay/MotifDisplay'
import Accordion from '../Accordion/Accordion'
// import MotifGeneration from './MotifGeneration/MotifGeneration'
// import MotifPicker from './MotifPicker/MotifPicker'
// import MotifService from '../../services/motif-service'
// import ControlPanel from '../ControlPanel/ControlPanel'
// import { motifToMidi } from '../../utils/audio-playback'
// import MotifMethods from '../../utils/motif-methods'
import { Transport, start, loaded } from 'tone'
import { masterVolume } from '../../utils/audio-setup'
import duo from '../../composers/phrase-form-trio'
import trio from '../../composers/simple-trio'
import quartet from '../../composers/simple-quartet'
import performer from '../../composers/motific'

import './MakeForm.css'

export default class MakeForm extends Component {
    state = {
        selection: null,
    }
    playNote=(time)=>{
        if (this.state.selection === 0) {
          duo(time)
        }
        if (this.state.selection === 1) {
          trio(time)
        }
        if (this.state.selection === 2) {
          quartet(time)
        }
        if (this.state.selection === 3) {
          performer(time)
        }
    }

    toggleTransport=()=>{
        if (this.state.selection === null ){
            alert('please select a composition style')
        }
        loaded().then(()=>{
            masterVolume.volume.value = -35
            start()
            Transport.toggle()
    
        })
    }

    setSelection=(e)=>{
        const selection = Number(e.target.value)
        this.setState({selection: selection})

        // if (selection === 3) {
        //     console.log('boom')
        //     motific.makeMotifs()
        //     motific.notate()
        // }
    }

    
    componentDidMount() {

        Transport.scheduleRepeat((time)=>{
            this.playNote(time)
        }, "8n")
    }
    render(){
        return (
            <section className="make-form">
                {/* <ControlPanel name={this.state.motif_name}/> */}
                <Accordion 
                    groupName="make-motif"
                    headerTextArr={["Generate Forms"]}
                    // headerTextArr={["Select Motif","Draw Motif","Generate Motif"]}
                >   
                    <div></div>
                    {/* <MotifPicker 
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
                        applyNote={this.applyNote}
                        applyMotif={this.generateMotif}
                        applyVariation={this.applyVariation}
                    /> */}
                </Accordion>
                <div className="form-info">
                        <p>Form is the big-picture of a song; the overall structure. The form creation tools are currently in development. The options and available approaches here will be much like the existing creation tools.
                        Eventually users should be able to guide the composition process or leave it completely up to the machine. For more information visit the info page or explore the<a href='https://github.com/GeorgeLuther/motiforge-app'>readme.</a> 
                        </p>
                        <p>While the advanced features are not yet available, the options below will compose a brand new song using approaches similar to those you can expect to have access to in future versions. Each think of each channel as a radio performing music. You can switch between them to notice the differences in techniques or listen to a full performance. When you're ready for new compositions, choose 'generate new compositions'. These algorithms can sound erratic and should be considered experimental sketches.
                        </p>
                        <button className='method-btn' onClick={this.toggleTransport}>
                            play / pause
                        </button>
                        <div className="robot-radios">
                            <p>
                                Robot Radios:       
                            </p>
                            
                            <button className='method-btn' value={0} onClick={this.setSelection}>
                                robot one
                            </button>

                            <button className='method-btn' value={1} onClick={this.setSelection}>
                                robot two
                            </button>


                            <button className='method-btn' value={2} onClick={this.setSelection}>
                                robot three
                            </button>

                            <button className='method-btn' value={3} onClick={this.setSelection}>
                                robot four
                            </button>
                        </div>
                        <a href="/form">generate new compositions</a>

                </div>
            </section>
        )
    }
    componentWillUnmount(){
        Transport.cancel()
        Transport.stop()
    }
}
