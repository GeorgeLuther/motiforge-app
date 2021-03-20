import React, { Component } from 'react'
// import MotifDisplay from './MotifDisplay/MotifDisplay'
import Accordion from '../Accordion/Accordion'
// import MotifGeneration from './MotifGeneration/MotifGeneration'
// import MotifPicker from './MotifPicker/MotifPicker'
// import MotifService from '../../services/motif-service'
// import ControlPanel from '../ControlPanel/ControlPanel'
// import { motifToMidi } from '../../utils/audio-playback'
// import MotifMethods from '../../utils/motif-methods'
import { Transport, start } from 'tone'
import { masterVolume } from '../../utils/audio-setup'
import duo from '../../composers/phrase-form-trio'
import trio from '../../composers/simple-trio'
import quartet from '../../composers/simple-quartet'
import performer from '../../composers/motific'

import './MakeForm.css'

export default class MakeForm extends Component {
    state = {
        selection: 2,
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
        masterVolume.volume.value = -35
        start()
        Transport.toggle()
    }

    setSelection=(e)=>{
        this.setState({selection: Number(e.target.value)})
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
                        <p>While the advanced features are not yet available, the options below will compose a brand new song using approaches similar to those you can expect to have access to in future versions.
                        </p>
                        <button onClick={this.toggleTransport}>
                            play / pause
                        </button>

                        <button value={0} onClick={this.setSelection}>
                            robot one
                        </button>

                        <button value={1} onClick={this.setSelection}>
                            robot two
                        </button>


                        <button value={2} onClick={this.setSelection}>
                            robot three
                        </button>

                        <button value={3} onClick={this.setSelection}>
                            robot four
                        </button>

                        <a href="/forms">new composition</a>

                </div>
            </section>
        )
    }
    componentWillUnmount(){
        Transport.cancel()
        Transport.stop()
    }
}
