import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'
import Nav from './Nav/Nav'

class Header extends Component {
  state = {
    isNavShown: false
  } 

  showNav=()=> {this.setState({isNavShown: !this.state.isNavShown})}
  hideNav=()=> {this.setState({isNavShown: false})}

  render() {
    return (
      <header>
          <h1>
            <Link to='/'>
              MOTIFORGE
            </Link>
          </h1>
          <button 
            className="hamburger"
            aria-label="navigation"
            onClick={this.showNav}
            ><FontAwesomeIcon icon="bars" />
          </button>
          {this.state.isNavShown && <Nav hideNav={this.hideNav}/>}
      </header>
    );
  }
}

export default Header
