
import {voices} from '../utils/audio-setup'

let noteArray = []

let isOdd = function(num){
    return (num % 2) === 1
}

//Note generation types
let randomNote=function(){
    return (Math.floor(Math.random()*8))
}
let chordNote=function(){
    let chordTones = [0,2,4,7]
    return chordTones[Math.floor(Math.random()*4)]
}
let stepNote=function(noteArray){
    let lastNote = noteArray[noteArray.length-1]
    let step = Math.floor(Math.random()*2)
    if (step === 0) {
        step = -1
    }
    return lastNote + step
}
let skipNote=function(noteArray){
    let lastNote = noteArray[noteArray.length-1]
    let skip = Math.floor(Math.random()*2)
    if (skip === 0) {
        skip = -2
    } else {
        skip = 2
    }
    return lastNote + skip
}
let hopNote=function(noteArray){
    let lastNote = noteArray[noteArray.length-1]
    let hop = Math.floor(Math.random()*2)
    if (hop === 0) {
        hop = -4
    } else {
        hop = 3
    }
    return lastNote + hop
}
let jumpNote=function(noteArray){
    let lastNote = noteArray[noteArray.length-1]
    let jump = Math.floor(Math.random()*2)
    if (jump === 0) {
        jump = -3
    } else {
        jump = 4
    }
    return lastNote + jump
}

let choiceArray=[]

let maxPhraseLength = 16
let minPhraseLength = 8
let phraseLength = Math.floor(Math.random()*(maxPhraseLength-minPhraseLength))+minPhraseLength

//generate a phrase
for (let i=0; i<phraseLength; i++){
    let choice
    if (!isOdd(i)){
        noteArray.push(chordNote())
    } else {
        if (noteArray[noteArray.length-1] < 5){
            choice = Math.floor(Math.random()*3)
            choiceArray = [hopNote, jumpNote, randomNote]
            noteArray.push(choiceArray[choice](noteArray))
        } else {
            choice = Math.floor(Math.random()*3)
            choiceArray = [chordNote, stepNote, skipNote]
            noteArray.push(choiceArray[choice](noteArray))
        }
    }
}

//tonal shifts (progressions)

let shift1 = [1,3,5,-2]
let shift2 = [4,-1]
let shift3 = [0,3,4]
let shift4 = [0,-2]
let shift5 = [4,-3]
let shift6 = [0, -2]
let shift7 = [4,-3]
let shift8 = [1,3,5,-2]
let shift9 = [0]
let shiftArray = [shift1, shift2, shift3, shift4, shift5, shift6, shift7, shift8, shift9]

let maxShifts = 8
let minShifts = 4
let numShifts = Math.floor(Math.random()*(maxShifts-minShifts))+minShifts


//adds bass notes
let bassArray = []

bassArray.push(0)

for (let i=0; i<numShifts; i++){
    let decide = shiftArray[i]
    let shift = decide[Math.floor(Math.random()*(decide.length-1))]
    noteArray.forEach(function(item){
        noteArray.push(item+shift)
    })
    bassArray.push(shift)
}

let count = 0
let bassCount = 0
let scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36]
let registerArray = [36,48,60,72,84]
let register = registerArray[4]

//perform 
let trio=(time)=> {
let scaleDegree = noteArray[count]
let pitch = scale[scaleDegree]+register
if (pitch > 86) pitch = pitch - 12
voices.voice_1.playNote(pitch, 90, time)

let modCount = count%(phraseLength-1)
if (modCount === 0) {
let BscaleDegree = bassArray[bassCount]
let Bpitch = scale[BscaleDegree]+48
bassCount++
if (bassCount===bassArray.length-1){
    bassCount=0
}
voices.voice_1.playNote(Bpitch, 80, time)
}
count++
if (count>noteArray.length-1) {
    count = 0
    }
}

export default trio
