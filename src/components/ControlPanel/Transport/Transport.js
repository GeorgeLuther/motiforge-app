import React from 'react'
import { Transport as transportCtx, loaded as loadedCtx, start} from 'tone'
import { performBeat } from '../../../utils/audio-playback'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Transport.css'

export default class Transport extends React.Component {
    state = {
        isReady: false,
        isPlaying: false,
    }
    globalPlay=()=>{
        
        transportCtx.toggle()
        this.setState({isPlaying: !this.state.isPlaying})
    }
    componentDidMount(){
        //transport and samplers are loaded
        loadedCtx().then(() => {

            this.setState({isReady: true})
            transportCtx.scheduleRepeat((time)=>{
                performBeat(time)
            }, "8n")
        });
    }
    render(){
        if (this.state.isReady) {
            return (
                <div className="global-transport">
                    {/* <button className="panel-btn" id="loop"><FontAwesomeIcon icon="sync-alt"/></button>
                    <button className="panel-btn" id="back"><FontAwesomeIcon icon="backward"/></button> */}
                    <button className="panel-btn" id="play" onClick={this.globalPlay} aria-label="play/pause"><FontAwesomeIcon icon={this.state.isPlaying ? "pause" : "play"}/></button>
                    {/* <button className="panel-btn" id="forth"><FontAwesomeIcon icon="forward"/></button> */}
                </div>)
        }
        return (
            <div className="global-transport">
                <h2>loading...</h2>
            </div>
        )   
    }
}
