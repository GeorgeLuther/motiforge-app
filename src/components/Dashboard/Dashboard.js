import React, {Component} from 'react'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'

import Loading from '../Loading/Loading'


import './Dashboard.css'

class Dashboard extends Component{
  state = {
    err: null,
    isLoading: true,
  }

  static contextType = UserContext

  componentDidMount(){
    
  }
  
  render() {

    return (
            <section className='Dashboard'>

                
            </section>
            
    )
  }
}

export default Dashboard