import React from 'react'
import './ControlPanel.css'
import Transport from './Transport/Transport'
import TempoVolume from './TempoVolume/TempoVolume'

export default function ControlPanel(props) {
    return (
        <div className="control-panel">
            <Transport />
            <p className="motif-name">{props.name}</p>
            <TempoVolume />
        </div>
    )
}