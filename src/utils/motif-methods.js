import {rand, flipCoin, nearest} from './utils'
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
    if (lastNote > 7) {
        return lastNote + a
    } else if (lastNote < -4) {
        return lastNote + b
    }
    let move = flipCoin() ? a : b
    return lastNote + move
}
const stepNote=(arr)=>addNote(arr,-1,1)
const skipNote=(arr)=>addNote(arr,-2,2)
const hopNote=(arr)=>addNote(arr,-4,3)
const jumpNote=(arr)=>addNote(arr,-3,4)

const noteArr=[randNote,chordNote,nearNote,stepNote,skipNote,hopNote,jumpNote]

//MOTIF GENERATION TECHNIQUES

const randMotif=()=>{
    const motif=[]
    const len = rand(2,8)
    for (let i = 0; i < len; i++) {
        motif.push(rand(-4, 7))
    }
    return motif
}

const makeMotif=()=>{
    const motif=[]
    const length=rand(2,7)
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
    return motif
}

const linearMotif=()=>{
    const motif=[]
    const multiplier = flipCoin() ? rand(1,5) : rand(1,3)
    const length = multiplier===1 ? rand(2,7)
                : multiplier===2 ? rand(2,5)
                : multiplier===3 ? rand(2,4)
                : multiplier===4 ? rand(2,3)
                : 2
    for (let i=0;i<length;i++){
        motif.push(i*multiplier)
    }
    if (flipCoin()) motif.reverse()
    return motif
}
// //TODO: encircleMotif= generate a motif by symmetrically surrounding chord-tones

//MOTIF MANIPULATION

const reverse=(arr)=> arr.reverse()

const mirror=(arr, hasApex)=>{
    const revArr = [...arr].reverse()
    if (!hasApex) {
        arr.pop()
    }
    return arr.concat(revArr)
}

const negate=(arr)=>{
    return arr.map(note => 0 - note)
}

const invert=(arr)=>{
    const axis = arr[0]
    const newArr = arr.map(note => {
        return axis + (axis - note)
    })
    return newArr
}

const upend=(arr)=>{
    const axis = arr[arr.length-1]
    const newArr = arr.map(note => {
        return axis + (axis - note)
    })
    return newArr
}

const overturn=(arr)=>{
    //TODO: method/argument to use mean, median, mode, or midpoint of range?
    const max = Math.max(...arr), min = Math.min(...arr)
    const midpoint = Math.ceil((min+max)/2)
    const newArr = arr.map(note => midpoint + (midpoint - note))
    return newArr
}

//TODO: put more thought into maintaining a semblance of the parent motif
const shuffle=(arr, numToShuffle)=>{
    numToShuffle = numToShuffle ? numToShuffle : rand(1,arr.length)
    
    if (numToShuffle === 'all') {
        numToShuffle = arr.length
    }

    const newArr = [...arr]
    const valuesToMove = []
    for (let i = 0; i < numToShuffle; i++) {
        const currIdx = rand( 0, newArr.length-1 )
        valuesToMove.push(newArr[currIdx])
        newArr.splice(currIdx, 1)
    }
    valuesToMove.forEach(val => newArr.splice(rand(0, newArr.length-1), 0, val))
    
    return newArr
}

const trunk=(arr)=>{
    let tot = arr.length
    if (tot > 2){
        let max = tot - 2
        let len = arr.length > 4 ? rand(2,max) : rand(1,max)
        let start = rand(1,tot-len)-1
        let end = start + len - 1
        console.log(`start ${start} end ${end}`)
        let copy = arr.filter((item,idx)=> idx<start | idx>end )
        return copy
    }
}
const noise=(arr)=>{
    let copy=[...arr]
    let unused=[]
    for (let i=0;i<copy.length;i++){
        unused.push(i)
    }
    let numChange=rand(1,arr.length-1)
    
    for (let i=0;i<numChange;i++){
        //random pick can't be already picked
        let pickIdx=unused[rand(0,unused.length-1)]
        let pick = unused[pickIdx]
        unused.splice(pickIdx,1)
        //pick can't become noise if it's a chordtone
        let tf=0
        chordTones.forEach((item)=>{
            if (copy[pick]===item) 
            tf=1
        })
        if (!tf) {
            //noise note can't be same as original note
            let avail=[-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10,11]
            avail.splice(avail.indexOf(copy[pick]),1)
            //pick becomes noise
            copy[pick]=avail[rand(0,avail.length-1)]
        }
    }
    return copy
}
//TODO: Finish the methods and add methods that combine motifs


const motifVariation = [reverse, mirror, negate, invert, upend, overturn, shuffle, trunk, noise]

const MotifMethods = {
    randNote,
    chordNote,
    nearNote,
    stepNote,
    skipNote,
    hopNote,
    jumpNote,
    randMotif,
    makeMotif,
    linearMotif,
    motifVariation,
    reverse, 
    mirror,
    negate,
    invert,
    upend,
    overturn,
    shuffle,
    trunk,
    noise
}

export default MotifMethods