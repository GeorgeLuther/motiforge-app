import {voices} from '../utils/audio-setup'


//LOGIC FUNCTIONS

const rand=(min,max)=>{  
    min=Math.ceil(min) 
    max=Math.floor(max) 
    return Math.floor(Math.random()*(max-min+1))+min 
}
const flipCoin=()=>rand(0,1)
//const isOdd=(num)=>num%2!==0
const nearest=(arr,n)=>arr.reduce((prev,curr)=> Math.abs(curr-n) < Math.abs(prev-n) ? curr : prev)

//NOTE GENERATION TECHNIQUES

const randNote=()=>(rand(0,7))
const chordTones=[0,2,4,7,9]
const chordNote=()=>{
    return chordTones[rand(0,3)]
}
const nearNote=(arr)=>{
    let lastNote=arr[arr.length-1]
    return nearest(chordTones,lastNote)
}
const addNote=(arr,a,b)=>{
    let lastNote=arr[arr.length-1]
    let move= flipCoin()===0 ? a : b
    return lastNote+move
}
const stepNote=(arr)=>addNote(arr,-1,1)
const skipNote=(arr)=>addNote(arr,-2,2)
const hopNote=(arr)=>addNote(arr,-4,3)
const jumpNote=(arr)=>addNote(arr,-3,4)

const noteArr=[randNote,chordNote,nearNote,stepNote,skipNote,hopNote,jumpNote]

//MOTIF GENERATION TECHNIQUES

const motifs=[]

const makeMotif=()=>{
    const motif=[]
    const length=rand(2,5)
    let shouldResolve = false
    for (let i=0;i<length;i++){
        if (i===0) {
            shouldResolve = flipCoin() 
            !shouldResolve ? motif.push(randNote()) : motif.push(chordNote())
        }
        else if (i>0 && i<length-1) motif.push(noteArr[rand(0,6)](motif))
        else {
            shouldResolve ? motif.push(noteArr[rand(0,6)](motif)) : motif.push(nearNote(motif))
        }}
    motifs.push([motif])
}

// const linearMotif=()=>{
//     const motif=[]
//     const multiplier = rand(1,5)
//     const length = multiplier===1 ? rand(2,7)
//                 : multiplier===2 ? rand(2,5)
//                 : multiplier===3 ? rand(2,4)
//                 : multiplier===4 ? rand(2,3)
//                 : 2
//     for (let i=0;i<length;i++){
//         motif.push(i*multiplier)
//     }
//     if (flipCoin()) motif.reverse()
//     motifs.push([motif])
// }
// //TODO: encircleMotif= generate a motif by symmetrically surrounding chord-tones

//MOTIF MANIPULATION

const reverse=(idx)=> motifs[idx].push([...motifs[idx][0]].reverse())

const mirror=(idx, hasApex)=>{
    const newArr = [...motifs[idx][0]]
    const revArr = [...newArr].reverse()
    if (!hasApex) {
        newArr.pop()
    }
    motifs[idx].push(newArr.concat(revArr))
}

const negate=(idx)=>{
    const newArr = motifs[idx][0].map(note => note)
    motifs[idx].push(newArr)
}

const invert=(idx)=>{
    const axis = motifs[idx][0][0]
    const newArr = motifs[idx][0].map(note => {
        return axis + (axis - note)
    })
    motifs[idx].push(newArr)
}

const upend=(idx)=>{
    const axis = motifs[idx][0][motifs[idx][0].length-1]
    const newArr = motifs[idx][0].map(note => {
        return axis + (axis - note)
    })
    motifs[idx].push(newArr)
}

const overturn=(idx)=>{
    //TODO: method/argument to use mean, median, mode, or midpoint of range?
    const max = Math.max(...motifs[idx][0]), min = Math.min(...motifs[idx][0])
    const midpoint = Math.ceil((min+max)/2)
    const newArr = motifs[idx][0].map(note => midpoint + (midpoint - note))
    motifs[idx].push(newArr)
}

//TODO: put more thought into maintaining a semblance of the parent motif
const shuffle=(idx, numToShuffle)=>{
    const motifLength = motifs[idx][0].length
    if (!numToShuffle) {
        numToShuffle = rand(1, motifLength)
    }
    if (numToShuffle === 'all') {
        numToShuffle = motifLength
    }
    const newArr = [...motifs[idx][0]]
    const valuesToMove = []
    for (let i = 0; i < numToShuffle; i++) {
        const currIdx = rand( 0, newArr.length-1 )
        valuesToMove.push(newArr[currIdx])
        newArr.splice(currIdx, 1)
    }
    valuesToMove.forEach(val => newArr.splice(rand(0, newArr.length-1), 0, val))
    motifs[idx].push(newArr)
}
//TODO: Finish the methods and add methods that combine motifs

const motifVariation = [reverse, mirror, negate, invert, upend, overturn, shuffle]


//generate an oasis of motifs
const numMotifs = rand(4, 16)
let lastMotifIdx = numMotifs-1
for (let i=0; i<numMotifs; i++) {
    makeMotif()
    motifVariation[rand(0,6)](i)
    motifVariation[rand(0,6)](i)
}


const harmonicShifts = [
    [1,3,5,-2],
    [4,-1,-3],
    [0,0, 3,4],
    [4,-3],
    [0, -2],
]

const makePhrase=()=>{   
    const numMotifsInPhrase = rand(2,5)
    const motifReferenceArray = []
    for (let i=0; i<numMotifsInPhrase; i++) {
        const coin = flipCoin()
        let motifIdx = 234
        if (i>0) {
            motifIdx = coin ? rand(1, lastMotifIdx) : motifReferenceArray[rand(0,motifReferenceArray.length-1)][0]
        }
        else {
            motifIdx = rand(0, lastMotifIdx)
        }
        
        const variationIdx = coin ? rand(0, 2) : 0
        const modalShift = harmonicShifts[i][rand(0, harmonicShifts[i].length-1)]

        motifReferenceArray.push([motifIdx, variationIdx, modalShift])
    }
    return motifReferenceArray
}
const makeSection=()=>{
    const numPhrasesInSection = rand(2,5)
    const phraseArr = []
    for (let i=0; i<numPhrasesInSection; i++) {

        if (i>0 && flipCoin()) {
            phraseArr.push(phraseArr[rand(0, phraseArr.length-1)])
        }
        else {
            phraseArr.push(makePhrase())
        }
    }
    return phraseArr
}
const makeForm=()=>{
    const numSectionsInForm = rand(2,6)
    const formArr = []
    for (let i=0; i<numSectionsInForm; i++) {
        if (i > 2 && flipCoin()){
            formArr.push(formArr[rand(0,formArr.length-1)])
        }
        else {
            formArr.push(makeSection())
        }
    }
    return formArr 
}
const melody = []
const harmony = []
const bass = []



const form = makeForm()

form.forEach((section, idx) => {
    //section may be at root, fourth, fifth, or enharmonic minor
    // let modulation
    // if (idx < form.length-1) {
    //     modulation = [0, 3, 4,-2][rand(0,3)]
    // }
    // else modulation = 0

    section.forEach(phrase => {
        melody.push(0)
        harmony.push(2) 
        bass.push(0)
        phrase.forEach(ref => {
            motifs[ref[0]][ref[1]].forEach((note, index)=> {
                melody.push(note + ref[2])
                if (index===0) {
                    bass.push(ref[2])
                    flipCoin() ? harmony.push('rest') : harmony.push(ref[2]+4)
                }
                else {
                    flipCoin() ? bass.push(ref[2]) : bass.push(ref[2]+2)
                    harmony.push('rest')
                }
            })
            melody.push('rest')
            harmony.push('rest')  
            bass.push('rest') 
        })
        melody.push('rest')
        harmony.push('rest') 
        bass.push('rest') 
        melody.push('rest')
        harmony.push('rest') 
        bass.push('rest') 
    })
    melody.push('rest')
    harmony.push('rest') 
    bass.push('rest') 
    melody.push('rest')
    harmony.push('rest') 
    bass.push('rest') 
    melody.push('rest')
    harmony.push('rest') 
    bass.push('rest') 
})
bass.push(4) 
melody.push(1)
harmony.push(6) 
bass.push(0) 
melody.push(2)
harmony.push(4) 
bass.push(0) 
melody.push(2)
harmony.push(4) 
bass.push(0) 
melody.push(2)
harmony.push(4) 


// console.log('motifs',motifs)
// console.log('melody',melody)
// console.log('bass',bass)




let count = 0
const scale = [0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48]
const melodyRegister = 60
const harmonyRegister = 48
const bassRegister = 36


const performer=(time)=> {
    if (count < melody.length-1) {
        voices.voice_1.playNote( scale[melody[count]+7] + melodyRegister, 80, time)
        if (bass[count] !== 'rest') {
            voices.voice_1.playNote( scale[(bass[count]%48)+7] + bassRegister, 80, time)
        }
        if (harmony[count] !== 'rest') {
            voices.voice_1.playNote( scale[(harmony[count]%48)+7] + harmonyRegister, 80, time)
        }

        count++            
    }
}

export default performer