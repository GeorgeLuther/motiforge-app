import { Transport } from "tone"
import { voices } from '../utils/audio-setup'

//logic functions
let random=function(min, max){  
    min=Math.ceil(min) 
    max=Math.floor(max) 
    return Math.floor(Math.random()*(max-min+1))+min 
}  
let isOdd=function(num){
    return (num%2)===1
}
//Note generation techniques
let randomNote=function(){
    return (random(0,7))
}
let chordNote=function(){
    let chordTones=[1,3,5,8]
    return chordTones[random(0,3)]-1
}
let stepNote=function(arr){
    let lastNote=arr[arr.length-1]
    let step=random(0,1)
    if (step===0) {
        step=-1
    }
    return lastNote+step
}
let skipNote=function(arr){
    let lastNote=arr[arr.length-1]
    let skip=random(0,1)
    skip=skip===1?-2:2
    return lastNote+skip
}
let hopNote=function(arr){
    let lastNote=arr[arr.length-1]
    let hop=random(0,1)
    hop=hop===1?-4:3
    return lastNote+hop
}
let jumpNote=function(arr){
    let lastNote=arr[arr.length-1]
    let jump=random(0,1)
    jump=jump===1?-3:4
    return lastNote+jump
}

//generating phrases
let phrases=[]
let velocities=[]
let basses=[]
let bassOn=[]
let makePhrase=function(){
    //make a phrase
    let phraseLength=random(8,16)
    let phrase=[]
    let velocity=[]
    let technique=[]
    let choice=0
    for (let i=0;i<phraseLength;i++){
        if (!isOdd(i)){
            phrase.push(chordNote())
        } else {
            if (phrase[phrase.length-1]<5){
                choice=random(0,2)
                technique=[hopNote,jumpNote,randomNote]
                phrase.push(technique[choice](phrase))
                velocity.push(random(80,120))
            } else {
                choice=random(0,2)
                technique=[chordNote,stepNote,skipNote]
                phrase.push(technique[choice](phrase))
                velocity.push(random(40,90))
            }
        }
    }
    //modal modulation states in scale degree
    let root=[1]
    let subdominant=[2,4,6]
    let dominant=[5,7]
    let tonic=[3,6]
    let enharmonic=[1,6]
    let shifts=[root,subdominant,dominant,tonic,enharmonic]
    //generating a an array of modally modulated versions of the phrase
    let numShifts = random(4,16)
    let modes=[]
    let vels=[]
    let modesB=[]
    let modesOn=[]
    for (let j=0; j<numShifts; j++){
        let type=shifts[j%5]
        let shift=type[random(0,(type.length-1))]
        shift=shift-1 //translating from scale degree to index
        let mode=[]
        let vel=[]
        let modeB=[]
        let modeOn=[]
        phrase.forEach(function(item,index){
            mode.push(item+shift)
            vel.push(velocity[index])
            modeB.push(shift)
            if (item===0){
                if (random(0,1)===1){
                    mode.push(9999)
                    modeB.push(shift)
                    modeOn.push(0)
                }
            }
            let on=index===0?1:0
            modeOn.push(on)
            if (index===phrase.length-1){
                mode.push(chordNote())
                modeB.push(shift)
                modeOn.push(0)
                if (random(0,1)===1){
                mode.push(9999)
                modeB.push(shift)
                modeOn.push(0)
                }
                if (random(0,1)===1){
                mode.push(9999)
                modeB.push(shift)
                modeOn.push(0)
                }
            }
        })
        modes.push(mode)
        vels.push(vel)
        modesB.push(modeB)
        modesOn.push(modeOn)
    }
    phrases.push(modes)
    velocities.push(vels)
    basses.push(modesB)
    bassOn.push(modesOn)
}

//generate phrases and their modulations
let totalPhrases=random(3,5)
for (let k=0;k<totalPhrases;k++){
    makePhrase()
}

//generate the song's form: a random pattern of phrases
let formLength=random(6,16)
let form=[]
for (let l=0;l<formLength;l++){
    form.push(random(0,phrases.length-1))
}
//for each system in the form, choose a random modulation, add it's notes to the notes array
let notes=[]
let velos=[]
let notesB=[]
let notesOn=[]
form.forEach(function(system){
    let motif=phrases[system]
    let pick=random(0,motif.length-1)
    let mod=motif[pick]
    let velo = velocities[system][pick]
    let modB = basses[system][pick]
    let modOn = bassOn[system][pick]
    mod.forEach(function(note,dex){
        notes.push(note)
        velos.push(velo[dex])
        notesB.push(modB[dex])
        notesOn.push(modOn[dex])
    })
})

//translation from index/scale step to MIDI note
let scale=[0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36]
let registers=[36,48,60,72,84]
let key = random(0,1)===1?random(0,6):-random(0,6)
let ogKey = key
let reg=registers[2]
//output one note from the notes array on every beat
let count=0
let loop=0
let leap=0
//let travel=0

let tempo = random(80,300)
Transport.bpm.value = tempo

function duo(time){
    let degree=notes[count]
    let pitch=scale[degree]+reg
    let pitch2=0

    voices.voice_1.playNote(pitch+key, 80, time)
    

    //outlet(3, loop)
    //outlet(4, notes[0])
    //outlet(5, notes[1])
    if (random(0,2)===1){
    if (count%random(2,8)===0){
        if (notes[count]===0){
            pitch2=scale[degree+2]+reg+key
        } else if (notes[count]===2){
            pitch2=scale[degree-2]+reg+key
        } else if (notes[count]===4){
            pitch2=scale[degree-4]+key
        } else if (notes[count]===7){
            pitch2=scale[degree-5]+key
        }
    }
    voices.voice_1.playNote(pitch2, 80, time)
    //velocity outlet(1,70)
    }
    if (notesOn[count]===1){
        let vol = 0
        if (notesB[count]===0||notesB[count]===7){
            vol = 98
        } else {
            vol = random(50,80)
        }
        voices.voice_1.playNote(scale[notesB[count]]+36+key, vol, time)
        voices.voice_1.playNote(scale[notesB[count]+9]+36+key,vol, time)
        voices.voice_1.playNote(scale[notesB[count]+4]+36+key,vol, time)
    }
    //outlet(2,count)
let og
//let ogB

    count++
    if (count>notes.length-1) {
        count=0
        loop++
        if (loop>3){loop=0}
        if (loop===0){
            og = notes[0]
  //          ogB = notes[0]
        }
        if (loop===1){
            leap = random(0,1)?-2:3
            notes.forEach(function(mynote, idek){
                let nu = notes[idek]-2
                let nuB = notesB[idek]-2
                notes[idek]=nu
                notesB[idek]=nuB
            })
        } else if (loop===2){
            if (leap===-2){leap=random(0,1)?2:3}
            if (leap===3){leap=random(0,1)?-2:1}
            notes.forEach(function(mynote, idej){
                let neu = notes[idej]+leap
                let neuB = notes[idej]+leap
                notes[idej] = neu
                notesB[idej] = neuB
            })
        } else {
            let newKey = random(0,2)
                if (newKey === 0){
                    key = notes[notes.length-1]
                } else if (newKey === 1) {
                    key = key + random(0,5)-2
                } else if (newKey === 2){
                    key = ogKey
                }
            notes.forEach(function(mynote, idei){
                let getBack = og - notes[0]
                let niw = notes[idei]+getBack
                let niwB = notesB[idei]+getBack
                notes[idei] = niw
                notesB[idei] = niwB
            })
        }
    }
}

export default duo