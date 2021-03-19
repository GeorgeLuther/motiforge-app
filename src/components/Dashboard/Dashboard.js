import React, {Component} from 'react'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import MotifService from '../../services/motif-service'
import PhraseService from '../../services/phrase-service'
import FormService from '../../services/form-service'
import Loading from '../Loading/Loading'

import './Dashboard.css'

class Dashboard extends Component{
  state = {
    err: null,
    isLoading: true,
    motifCount: null,
    phraseCount: null,
    formCount: null,
  }

  static contextType = UserContext

  componentDidMount(){
    this.setState({isLoading: true})
    
    MotifService.getMotifs()
    .then(res => {
        this.setState({motifCount: res.length})
    })
    .catch(err => {
        this.setState({err})
    })

    PhraseService.getPhrases()
    .then(res => {
        this.setState({phraseCount: res.length})
    })
    .catch(err => {
        this.setState({err})
    })

    FormService.getForms()
    .then(res => {
        this.setState({formCount: res.length})
    })
    .catch(err => {
        this.setState({err})
    })
    this.setState({isLoading: false})


  }
  
  render() {

    return (
        <section className='dashboard'>
          {this.state.isLoading
            ? <Loading />
            : <>
              <div className="welcome">
                  <h2>Welcome {this.context.user.name}!</h2>
                </div>
                <div className="paths">
                  <div>
                    <p>You have created {this.state.motifCount ? this.state.motifCount : 'no'} motifs</p>
                    <Link to='/motif'>Create Some Motifs</Link>
                  </div>
                  <div>
                    <p>You have created {this.state.phraseCount ? this.state.phraseCount : 'no'} phrases</p>
                    <Link to='/phrase'>Create Some Phrases</Link>
                  </div>
                  <div>
                    <p>You have created {this.state.formCount ? this.state.formCount : 'no'} forms</p>
                    <Link to='/form'>Create Some Forms</Link>  
                  </div>
              </div>            
            </>
          }
          
        </section>
    )
  }
}

export default Dashboard