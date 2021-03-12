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

const linearMotif=()=>{
    const motif=[]
    const multiplier = rand(1,5)
    const length = multiplier===1 ? rand(2,7)
                : multiplier===2 ? rand(2,5)
                : multiplier===3 ? rand(2,4)
                : multiplier===4 ? rand(2,3)
                : 2
    for (let i=0;i<length;i++){
        motif.push(i*multiplier)
    }
    if (flipCoin()) motif.reverse()
    motifs.push([motif])
}
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

