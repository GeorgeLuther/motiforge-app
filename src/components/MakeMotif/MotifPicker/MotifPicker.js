import React from 'react'
import MotifService from '../../../services/motif-service'
import moment from 'moment'
import {intToScaleDegree, isOdd} from '../../../utils/utils.js'
import './MotifPicker.css'

export default class MotifPicker extends React.Component {
//TODO: add pagination

    state = {
        err: null,
        motifs: null
    }
    componentDidMount(){
        // MotifService.getMotifs()
        //     .then(res => {
        //         this.setState({motifs: res})
        //     })
        //     .catch(err => {
        //         this.setState({err})
        //     })
    }
    render(){
            return (
        // <div className="motif-picker">
        //     <div className="table-headers">
        //         <h3>Name</h3>
        //         <h3>Date Created</h3>
        //         <h3>Length</h3>
        //         <h3>Starting Pitch</h3>
        //     </div>    
            
        //     <div className="table-body">           
        //         {this.state.motifs &&   
        //         this.state.motifs.map((motif, idx) => {
        //             return (
        //                     <button
        //                         className={isOdd(idx) ? `table-row odd` : `table-row`}
        //                         id={motif.id === this.props.selectedId ? 'selectedMotif' : `opt_${idx}`}
        //                         key={'motif'+motif.id} 
        //                         motif_id={motif.id}
        //                         motif_name={motif.name}
        //                         notes={motif.notes}      
        //                         onClick={this.props.onClickMotif}
        //                     >
        //                         <span>{motif.name}</span>
        //                         <span>{moment(motif.date_created).format("MMM, Do, YYYY")}</span>
        //                         <span>{motif.notes.length +' notes'}</span>
        //                         <span>{intToScaleDegree(motif.notes[0])}</span>
        //                     </button>
        //             )
        //         })}
        //     </div>
        <div>
        </div>
    )
    }
}
