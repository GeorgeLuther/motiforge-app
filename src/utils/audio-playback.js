//import MotifService from '../services/motif-service'
import { voices } from './audio-setup'

// convert idea to notes array
        
    //convert modal_shift to mode
    //convert transposition to midi
// allow play button
// perform song

// const phraseToNotes=(phrase)=>{
//     phrase.motifs.forEach
// }
let playbackArr = []

const motifToMidi=(notes)=>{
    console.log(notes)
    playbackArr = notes.map(note => note + 60)
    console.log(playbackArr)
}

// const phraseToMidi=(phrase)=>{
//     return phrase.motifs.map((motifId, idx)=>{
//         MotifService.getMotifById(motifId)
//             .then(res => {
//                 console.log(res.body)
//             })
//         return phrase.modal_shifts[idx] + motifId
//     })
// }


let beatCount = 0
let beatIdx = beatCount % playbackArr.length

const performBeat=(time)=>{
    console.log(beatIdx)
    console.log(playbackArr[beatIdx])
    voices.voice_1.playNote(playbackArr[beatIdx], .9, time)
    beatCount++
}


export { performBeat, motifToMidi }