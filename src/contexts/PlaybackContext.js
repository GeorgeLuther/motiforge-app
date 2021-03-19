import React, { Component } from 'react'
import { Transport, loaded, start} from 'tone'


// confirm tone.js audioCtx is loaded
// since tone is loaded, transport is too. create scheduleRepeat (can only happen once!!!!)
// confirm scheduleRepeat is loaded
// confirm sampler is loaded

// gets current idea from active page
// converts idea's arrays into a playback array
    // motif scale degrees to scalar midi
    // if phrase, get motifs, move scale degrees by modal modulation, do above step
    // if form, for each phrase, do above steps, then transpose by transposition

// confirm playbackArr is loaded

// if tone, transport, sampler, playbackArr, free the play button

// on play perf

const PlaybackContext = React.createContext({
    
    isToneLoaded: null,
    isTransportLoaded: null,
    isSamplerLoaded: null,
    isArrayLoaded: null,
    isPlaying: null,
    idea: {},
    playbackArr: [],
    beatIdx: 0,

    notesToMidi: ()=> {},
    phraseToNotes: ()=> {},
    formToNotes: ()=> {},
    playTransport: ()=> {},
})

export default PlaybackContext

export class PlaybackProvider extends Component {
    constructor(props) {
        super(props)
        const state = {
            isToneLoaded: false,
            isSamplerLoaded: false,
            isTransportLoaded: null,
            isArrayLoaded: false,
            idea: {},

        }
    }

    componentDidMount() {
        
        loaded().then(() => {
            this.setState({isToneLoaded: true})
        });

        Transport.scheduleRepeat((time)=>{
            performBeat(time)
        }, "8n")

    }
}