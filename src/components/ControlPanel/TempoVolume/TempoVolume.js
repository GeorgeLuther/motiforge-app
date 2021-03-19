import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TempoVolume.css'
import { Transport } from 'tone'
import { masterVolume } from '../../../utils/audio-setup'
export default class TempoVolume extends Component {
    state={
        isVolumeSliderShown: false,
        isTempoSliderShown: false,
        tempo: 135,
        volume: 0,
    }
    showVolumeSlider=()=>{
        this.setState({isVolumeSliderShown: !this.state.isVolumeSliderShown})
    }
    handleVolumeSlider=(e)=>{
        console.log(e.target.value)
        masterVolume.volume.value = Number(e.target.value)
        this.setState({volume: e.target.value})
    }
    showTempoSlider=()=>{
        this.setState({isTempoSliderShown: !this.state.isTempoSliderShown})
    }
    handleSetTempo=(e)=>{
        this.setState({tempo: e.target.value})
        Transport.bpm.value = e.target.value
    }
    render() {
        return (
            <div className="global-tempo-volume">
                <div className="volume-ctrl">
                    {this.state.isVolumeSliderShown && 
                    <input 
                        id="global-volume-slider" 
                        type="range" 
                        min={-50}
                        max={10}
                        aria-label="volume slider" 
                        defaultValue={this.state.volume}
                        onChange={this.handleVolumeSlider}
                    />}
                    <button 
                        onClick={this.showVolumeSlider} 
                        className="panel-btn"
                        aria-label="volume control" 
                        id="global-volume">
                            <FontAwesomeIcon icon="volume-up"/>
                    </button>
                </div>
                <div className="tempo-ctrl">
                    {this.state.isTempoSliderShown &&
                    <input 
                        id="global-tempo-slider" 
                        type="range" 
                        min={30}
                        max={300}
                        aria-label="tempo slider" 
                        value={this.state.tempo}
                        onChange={this.handleSetTempo}
                    />}
                    
                    <label className='bpm-label' onClick={this.showTempoSlider}>
                        <input 
                            className="panel-btn" 
                            id="global-tempo" 
                            aria-label="tempo control" 
                            value={this.state.tempo}
                            onChange={this.handleSetTempo}
                        ></input>
                    bpm
                    </label>
                </div>
            </div>
        )
    }
}
