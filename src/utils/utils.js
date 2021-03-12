const rand=(min,max)=>{  
    min=Math.ceil(min) 
    max=Math.floor(max) 
    return Math.floor(Math.random()*(max-min+1))+min 
}
const flipCoin=()=>rand(0,1)
const isOdd=(num)=>num%2!==0
const nearest=(arr,n)=>arr.reduce((prev,curr)=> Math.abs(curr-n) < Math.abs(prev-n) ? curr : prev)

const intToScaleDegree=(int)=>{
    let scaleDegreeArr = ['tonic','supertonic','mediant','subdominant','dominant','submediant','subtonic']
    if (int >= 0) {
        return `${scaleDegreeArr[int%7]} (${int+1})`
    }
    return `${scaleDegreeArr[(7+int)%7]} (${int})`
}

export {
    rand,
    flipCoin,
    isOdd,
    nearest,
    intToScaleDegree
}