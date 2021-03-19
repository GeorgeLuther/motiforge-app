//import MotifService from '../services/motif-service'
import MotifService from '../services/motif-service'
import { voices } from './audio-setup'

let playbackArr = []

const scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48]

const motifToMidi=(notes)=>{
    playbackArr = notes.map(note => scale[note+7]+60)

    playbackArr.push(null)
}

const phraseToMidi=(motifs, modal_shifts)=>{
    playbackArr = []
    let motifPromise = motifs.map((motif) => {
            return MotifService.getMotifById(motif)
    })
    Promise.all(motifPromise).then(motifs => {
        motifs.forEach((motif, idx) => {
            const chord = []
            chord.push(scale[modal_shifts[idx] + 4] + 48)
            chord.push(scale[modal_shifts[idx] + 2] + 60)
            chord.push(scale[modal_shifts[idx]] + 48)
            playbackArr.push(chord)

            motif.notes.forEach(note => {    
                playbackArr.push(scale[note + modal_shifts[idx] + 7] + 60)
            })
        })
        playbackArr.push(null)
        playbackArr.push(null)  
    })
}

let beatCount = 0

const performBeat=(time)=>{
    
    let beatIdx = beatCount % playbackArr.length
    if (typeof playbackArr[beatIdx] === 'number') {
        voices.voice_1.playNote(playbackArr[beatIdx], .9, time)
    } else if (Array.isArray(playbackArr[beatIdx])) {
        voices.voice_1.playNote(playbackArr[beatIdx][0], .4, time)
        voices.voice_1.playNote(playbackArr[beatIdx][1], .5, time)
        voices.voice_1.playNote(playbackArr[beatIdx][2], .9, time)
        //voices.voice_1.playNote(playbackArr[beatIdx][3], .6, time)
    }
    beatCount++
}

const clearPlaybackArr=()=>{
    playbackArr = []
}

export { performBeat, motifToMidi, phraseToMidi, clearPlaybackArr }