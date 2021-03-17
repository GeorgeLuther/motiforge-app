import { Sampler, Frequency, Reverb, Volume } from 'tone';

	const masterVolume = new Volume().toDestination()

	const masterReverb = new Reverb().toDestination()
	masterReverb.wet.value = .65
	masterReverb.decay = 4

	const numVoices = 4
	
	const voices = {
		loadedCount: 0,
	}

	let isVoicesLoaded = voices.loadedCount === numVoices
	
	for (let i=0; i < numVoices; i++) {
		voices[`voice_${i}`] = {}
		voices[`voice_${i}`].sampler = new Sampler({
			urls: {
				21: "A0.mp3",
				24: "C1.mp3",
				27: "Ds1.mp3",
				30: "Fs1.mp3",
				33: "A1.mp3",
				36: "C2.mp3",
				39: "Ds2.mp3",
				42: "Fs2.mp3",
				45: "A2.mp3",
				48: "C3.mp3",
				51: "Ds3.mp3",
				54: "Fs3.mp3",
				57: "A3.mp3",
				60: "C4.mp3",
				63: "Ds4.mp3",
				66: "Fs4.mp3",
				69: "A4.mp3",
				72: "C5.mp3",
				75: "Ds5.mp3",
				78: "Fs5.mp3",
				81: "A5.mp3",
				84: "C6.mp3",
				87: "Ds6.mp3",
				90: "Fs6.mp3",
				93: "A6.mp3",
				96: "C7.mp3",
				99: "Ds7.mp3",
				102: "Fs7.mp3",
				105: "A7.mp3",
				108: "C8.mp3"
			},
			onLoad: ()=>{
				voices.loadedCount++
			},
			release: 1,
			baseUrl: "https://tonejs.github.io/audio/salamander/"
		}).chain(masterReverb, masterVolume)

		voices[`voice_${i}`].playNote = (note, velocity, time) => {
			//TODO: implement velocity and rests
			if (typeof note !== 'string' && note > 20) {
				voices[`voice_${i}`].sampler.triggerAttackRelease(Frequency(note, "midi").toNote(), "8n", time, velocity)
			}
		}
	}

export {masterVolume, voices, isVoicesLoaded}