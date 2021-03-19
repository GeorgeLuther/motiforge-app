//import MotifService from '../services/motif-service'
import MotifService from '../services/motif-service'
import { voices } from './audio-setup'

// convert idea to notes array        
//convert modal_shift to mode
//convert transposition to midi
// allow play button/ prevent errors?
// perform song

// const phraseToMidi=(phrase)=>{
//     return phrase.motifs.map((motifId, idx)=>{
//         MotifService.getMotifById(motifId)
//             .then(res => {
//                 console.log(res.body)
//             })
//         return phrase.modal_shifts[idx] + motifId
//     })
// }

//ISSUE : ACCIDENTIAL INSTANCES OR FORGETTING ARR??


let playbackArr = []

const scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48]

const motifToMidi=(notes)=>{
    playbackArr = notes.map(note => scale[note+7]+60)

    playbackArr.push(null)
}

const phraseToMidi=(motifs, modal_shifts)=>{
    motifs.forEach((motif, idx) => {
        MotifService.getMotifById(motif)
            .then(motif => {
                motif.notes.forEach(note => {
                    playbackArr.push(note + modal_shifts[idx])
                })
                playbackArr.push(null)
            })
    })
}

let beatCount = 0

const performBeat=(time)=>{
    
    let beatIdx = beatCount % playbackArr.length
    voices.voice_1.playNote(playbackArr[beatIdx], .9, time)
    //voices.voice_1.playNote(60, .1, time)
    beatCount++
}

const clearPlaybackArr=()=>{
    playbackArr = []
}

export { performBeat, motifToMidi, clearPlaybackArr }