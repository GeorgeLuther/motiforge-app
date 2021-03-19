import { Transport } from "tone"
import { voices } from '../utils/audio-setup'

//logic functions
var random=function(min, max){  
    min=Math.ceil(min) 
    max=Math.floor(max) 
    return Math.floor(Math.random()*(max-min+1))+min 
}  
var isOdd=function(num){
    return (num%2)===1
}
//Note generation techniques
var randomNote=function(){
    return (random(0,7))
}
var chordNote=function(){
    var chordTones=[1,3,5,8]
    return chordTones[random(0,3)]-1
}
var stepNote=function(arr){
    var lastNote=arr[arr.length-1]
    var step=random(0,1)
    if (step===0) {
        step=-1
    }
    return lastNote+step
}
var skipNote=function(arr){
    var lastNote=arr[arr.length-1]
    var skip=random(0,1)
    skip=skip===1?-2:2
    return lastNote+skip
}
var hopNote=function(arr){
    var lastNote=arr[arr.length-1]
    var hop=random(0,1)
    hop=hop===1?-4:3
    return lastNote+hop
}
var jumpNote=function(arr){
    var lastNote=arr[arr.length-1]
    var jump=random(0,1)
    jump=jump===1?-3:4
    return lastNote+jump
}

//generating phrases
var phrases=[]
var velocities=[]
var basses=[]
var bassOn=[]
var makePhrase=function(){
    //make a phrase
    var phraseLength=random(8,16)
    var phrase=[]
    var velocity=[]
    var technique=[]
    var choice=0
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
    var root=[1]
    var subdominant=[2,4,6]
    var dominant=[5,7]
    var tonic=[3,6]
    var enharmonic=[1,6]
    var shifts=[root,subdominant,dominant,tonic,enharmonic]
    //generating a an array of modally modulated versions of the phrase
    var numShifts = random(4,16)
    var modes=[]
    var vels=[]
    var modesB=[]
    var modesOn=[]
    for (let j=0; j<numShifts; j++){
        var type=shifts[j%5]
        var shift=type[random(0,(type.length-1))]
        shift=shift-1 //translating from scale degree to index
        var mode=[]
        var vel=[]
        var modeB=[]
        var modeOn=[]
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
            var on=index===0?1:0
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
var totalPhrases=random(3,5)
for (let k=0;k<totalPhrases;k++){
    makePhrase()
}

//generate the song's form: a random pattern of phrases
var formLength=random(6,16)
var form=[]
for (let l=0;l<formLength;l++){
    form.push(random(0,phrases.length-1))
}
//for each system in the form, choose a random modulation, add it's notes to the notes array
var notes=[]
var velos=[]
var notesB=[]
var notesOn=[]
form.forEach(function(system){
    var motif=phrases[system]
    var pick=random(0,motif.length-1)
    var mod=motif[pick]
    var velo = velocities[system][pick]
    var modB = basses[system][pick]
    var modOn = bassOn[system][pick]
    mod.forEach(function(note,dex){
        notes.push(note)
        velos.push(velo[dex])
        notesB.push(modB[dex])
        notesOn.push(modOn[dex])
    })
})

//translation from index/scale step to MIDI note
var scale=[0,2,4,5,7,9,11,12,14,16,17,19,21,23,24,26,28,29,31,33,35,36]
var registers=[36,48,60,72,84]
var key = random(0,1)===1?random(0,6):-random(0,6)
var ogKey = key
var reg=registers[2]
//output one note from the notes array on every beat
var count=0
var loop=0
var leap=0
//var travel=0

var tempo = random(80,300)
Transport.bpm.value = tempo

function duo(time){
    var degree=notes[count]
    var pitch=scale[degree]+reg
    var pitch2=0

    voices.voice_1.playNote(pitch+key, 80, time)
    

    //outlet(3, loop)
    //outlet(4, notes[0])
    //outlet(5, notes[1])
    if (random(0,2)===1){
    if (count%random(2,8)===0){
        if (notes[count]=0){
            pitch2=scale[degree+2]+reg+key
        } else if (notes[count]=2){
            pitch2=scale[degree-2]+reg+key
        } else if (notes[count]=4){
            pitch2=scale[degree-4]+key
        } else if (notes[count]=7){
            pitch2=scale[degree-5]+key
        }
    }
    voices.voice_1.playNote(pitch2, 80, time)
    //velocity outlet(1,70)
    }
    if (notesOn[count]===1){
        var vol = 0
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
var og
var ogB

    count++
    if (count>notes.length-1) {
        count=0
        loop++
        if (loop>3){loop=0}
        if (loop===0){
            og = notes[0]
            ogB = notes[0]
        }
        if (loop===1){
            leap = random(0,1)?-2:3
            notes.forEach(function(mynote, idek){
                var nu = notes[idek]-2
                var nuB = notesB[idek]-2
                notes[idek]=nu
                notesB[idek]=nuB
            })
        } else if (loop===2){
            if (leap===-2){leap=random(0,1)?2:3}
            if (leap===3){leap=random(0,1)?-2:1}
            notes.forEach(function(mynote, idej){
                var neu = notes[idej]+leap
                var neuB = notes[idej]+leap
                notes[idej] = neu
                notesB[idej] = neuB
            })
        } else {
            var newKey = random(0,2)
                if (newKey === 0){
                    key = notes[notes.length-1]
                } else if (newKey === 1) {
                    key = key + random(0,5)-2
                } else if (newKey === 2){
                    key = ogKey
                }
            notes.forEach(function(mynote, idei){
                var getBack = og - notes[0]
                var niw = notes[idei]+getBack
                var niwB = notesB[idei]+getBack
                notes[idei] = niw
                notesB[idei] = niwB
            })
        }
    }
}

export default duo