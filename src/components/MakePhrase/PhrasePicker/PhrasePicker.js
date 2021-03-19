import React from 'react'
import PhraseService from '../../../services/phrase-service'
import moment from 'moment'
import { isOdd} from '../../../utils/utils.js'
//import './MotifPicker.css'

export default class PhrasePicker extends React.Component {
//TODO: add pagination, make into dynamic and generalized component

    state = {
        err: null,
        phrases: null
    }
    componentDidMount(){
        PhraseService.getPhrases()
            .then(res => {
                this.setState({phrases: res})
            })
            .catch(err => {
                this.setState({err})
            })
    }
    triggerBy=()=>{
        console.log('working')
    }
    render(){
        return (
            <div className="phrase-picker">
                <div className="table-headers">
                    <h3>Name</h3>
                    <h3>Date Created</h3>
                    <h3>Length</h3>
                    {/* <h3>Starting Motif</h3> */}
                </div>    
                
                <div className="table-body">           
                    {(this.state.phrases && this.state.phrases.length > 0) 
                    ? this.state.phrases.map((phrase, idx) => {
                        return (
                                <button
                                    className={isOdd(idx) ? `table-row odd` : `table-row`}
                                    id={phrase.id === this.props.selectedId ? 'selectedPhrase' : `opt_${idx}`}
                                    key={'phrase'+phrase.id} 
                                    motif_id={phrase.id}
                                    motif_name={phrase.name}
                                    motifs={phrase.motifs}      
                                    modal_shifts={phrase.modal_shifts}      
                                    onClick={this.props.onClickPhrase}
                                >
                                    <span>{phrase.name}</span>
                                    <span>{moment(phrase.date_created).format("MMM, Do, YYYY")}</span>
                                    <span>{phrase.motifs.length +' motifs'}</span>
                                    {/*TODO: Add a span with the name of the first motif. getMotifById
                                     <span>{}</span> */}
                                </button>
                        )
                    })
                    : <span>You currently have no motifs. Checkout 'Draw Motif' to get started.</span>
                    }
                </div>
            </div>
    )
    }
}
