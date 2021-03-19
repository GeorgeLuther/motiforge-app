
import {voices} from '../utils/audio-setup'

// the number of phrases to generate
let maxPhrases = 5
let minPhrases = 2
const totPhrases = Math.floor(Math.random()*(maxPhrases-minPhrases))+minPhrases


// the length of a phrase (randomize further later, now all phrases have the same length)
let maxPhraseLength = 6
let minPhraseLength = 4
let phraseLength = Math.floor(Math.random()*(maxPhraseLength-minPhraseLength))+minPhraseLength

// generate a set of phrases using random notes within an octave 
const allPhrases = []
const allVelicities = []
for (let k=0;k<totPhrases;k++){
    const newPhrase = []
    const newVelocity = []
    for (let i=0;i<phraseLength;i++){
        newPhrase.push(Math.floor(Math.random()*8))
        newVelocity.push(Math.floor(Math.random()*(120-70))+70)
    }
    allPhrases.push(newPhrase)
    allVelicities.push(newVelocity)
}

//generate the form or order in which the phrases are presented
var form = []
var formLength = Math.floor(Math.random()*10)+3
for (let i=0;i<formLength;i++) {
form.push(Math.floor(Math.random()*totPhrases))
}

//push all the notes in to one array
const allNotes = []
const allVolumes = []
for (let h=0;h<formLength;h++){
    const currPhrase = form[h]
    const realPhrase = allPhrases[currPhrase]
    const realVelocity = allVelicities[currPhrase]
    for (let i=0;i<realPhrase.length;i++){
        allNotes.push(realPhrase[i])
        allVolumes.push(realVelocity[i])
    }
}
//make arrays for the 5th of the chord
const TallNotes = []
const TallVolumes = []
for (let y=0; y<allNotes.length; y++){
    const botNote = allNotes[y]
    const botVol = allVolumes[y]
    const move = Math.floor(Math.random()*4)
    if (move === 0) {
        TallNotes.push(botNote+4)
        TallVolumes.push(botVol)
    } else if (move === 1) {
        TallNotes.push(botNote+3)
        TallVolumes.push(botVol-5)
    } else if (move === 2) {
        TallNotes.push(botNote+5)
        TallVolumes.push(botVol-10)
    } else if (move === 3) {
        TallNotes.push(botNote+4)
        TallVolumes.push(botVol+10)
    } else {
        TallNotes.push(botNote+7)
        TallVolumes.push(botVol-2)
    }
}

//count through the allNotes array at a ratio of the incoming bangs/beats
let ratio= (Math.floor(Math.random()*4)*2)+1
let change=0
let count=0

let Mratio = ratio/2
if (Mratio < 1) {Mratio = 1}
let Mchange=0
let Mcount=0

//for every bass note make (2) melody notes
const MallNotes = []
const MallVolumes = []
const WallNotes = []
const WallVolumes = []
for (let i=0; i<allNotes.length; i++) {
    const bassNote = allNotes[i]
    MallNotes.push(bassNote+2)
    WallNotes.push(bassNote+4)
    const bassVol = allVolumes[i]
    MallVolumes.push(bassVol+6)
    WallVolumes.push(bassVol+2)
    if (Mratio !== ratio){
    let jump = Math.floor(Math.random()*3)
    jump = jump-1
    MallNotes.push(bassNote+jump)
    WallNotes.push(bassNote+7-jump)
    MallVolumes.push(bassVol+6)
    WallVolumes.push(bassNote-3+jump)
    }
}

// the major scale expressed chromatically
const scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48]
//register adjustments for midi notes
let register = 48
let Mregister = 60

let loop = 0
let shift = 0
const shift1 = [1,3,5]
const shift2 = [4,-1]
const shift3 = [0,3,4]
const shift4 = [0,-2]
let modulate = 0
const modaMod = function(){
if (loop === 1 || loop === 5){
    shift = shift1[Math.floor(Math.random()*shift1.length)]
} else if (loop === 2 || loop === 4) {
    shift = shift2[Math.floor(Math.random()*shift2.length)]
    modulate = Math.floor(Math.random()*6)
} else if (loop === 3) {
    shift = shift3[Math.floor(Math.random()*shift3.length)]
    modulate=0
} else {
    loop=0
    shift = shift4[(Math.floor(Math.random()*2))]
    modulate = Math.floor(Math.random()*6)+2
    console.log('modulation', modulate)
}
}

function quartet(time){
    change++
    if (change>=ratio) {
        change=0
    }
    if (change===0) {
        count++
        if (count>=allNotes.length) {
            count=0
            loop++
            modaMod()
            console.log('loop', loop)
        }
        var pitch = allNotes[count]
        var Tpitch = TallNotes[count]
        var adjustedPitch = scale[pitch+shift]+register+modulate
        var TadjustedPitch = scale[Tpitch+shift]+register+modulate
        voices.voice_1.playNote(adjustedPitch, allVolumes[count], time);
        
        voices.voice_1.playNote(TadjustedPitch, TallVolumes[count], time)
    
    }
    Mchange++
    if (Mchange>=Mratio) {
        Mchange=0
    }
    if (Mchange===0) {
        Mcount++
        if (Mcount>=MallNotes.length) {
            Mcount=0
        }
        var Mpitch = MallNotes[Mcount]
        var MadjustedPitch = scale[Mpitch+shift]+Mregister+modulate
        voices.voice_1.playNote(MadjustedPitch, MallVolumes[Mcount], time)

        var Wpitch = WallNotes[Mcount]
        var WadjustedPitch = scale[Wpitch+shift]+Mregister+modulate
        voices.voice_1.playNote(WadjustedPitch, WallVolumes[Mcount], time)
    }
}

export default quartet