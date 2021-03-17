import React, { Component } from 'react'

const PlaybackContext = React.createContext({
    
    isLoading: null,
    idea: {},
    playbackArr: [],
    beatIdx: 0,

    notesToMidi: ()=> {},
    phraseToNotes: ()=> {},
    FormToNotes: ()=> {},
})

export default PlaybackContext

export class PlaybackProvider extends Component {
    constructor(props) {
        super(props)
        const state = {
            isLoading: true,
            idea: {},
            
        }
    }
}