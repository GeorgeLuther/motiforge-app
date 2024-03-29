export const Volume = jest.fn().mockImplementation(()=>{
    return {
        volume: 20,
        toDestination: jest.fn()
    }
})
export const Reverb = jest.fn().mockImplementation(()=>{
    return {
        wet: { value: 0 },
        toDestination: jest.fn()
    }
})

export const Transport = {
        scheduleRepeat: ()=> jest.fn(),
        bpm: ()=> jest.fn(),
        cancel: ()=> jest.fn(),
        stop: ()=> jest.fn()

}


export const Sampler = jest.fn().mockImplementation(()=>{
    return {
        chain: jest.fn(),
        toDestination: jest.fn()
    }
})


export function loaded(){
    return new Promise(() => {})
}

export const Solo = jest.fn()

export const Loop = jest.fn()


