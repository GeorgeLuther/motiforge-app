import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'
import Nav from './Nav/Nav'

class Header extends Component {
  state = {
    isNavShown: false,
    isDesktop: false
  } 

  showNav=()=> {this.setState({isNavShown: !this.state.isNavShown})}
  hideNav=()=> {this.setState({isNavShown: false})}

  componentDidMount(){
    console.log(window.innerHeight)
    if (window.innerWidth > 560) this.setState({isDesktop: true})
  }

  render() {
    return (
      <header>
          <h1>
            <Link to='/'>
              MOTIFORGE
            </Link>
          </h1>
          {this.state.isDesktop
          ? <Nav hideNav={this.hideNav}/>
          
          : <> 
          <button 
            className="hamburger"
            aria-label="navigation"
            onClick={this.showNav}
            ><FontAwesomeIcon icon="bars" />
          </button>
          {this.state.isNavShown && <Nav hideNav={this.hideNav}/>}
          </>
          }

      </header>
    );
  }
}

export default Header
