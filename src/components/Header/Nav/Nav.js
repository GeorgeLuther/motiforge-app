import React from 'react'
import {NavLink } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import TokenService from '../../../services/token-service'
import './Nav.css'
export default class Nav extends React.Component {
    static contextType = UserContext

    handleLogoutClick = () => {
      this.context.processLogout()
    }
  
    renderLogoutLink=()=> {
      return (
        <>
          <NavLink
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </NavLink>
          <NavLink to='/dashboard' activeStyle={{display: "none"}}>
                Dashboard
            </NavLink>

            <NavLink to='/motif' activeStyle={{display: "none"}}>
                Motifs
            </NavLink>

            <NavLink to='/phrase' activeStyle={{display: "none"}}>
                Phrases
            </NavLink>

            <NavLink to='/form' activeStyle={{display: "none"}}>
                Forms
            </NavLink>
        </>)
    }
  
    renderLoginLink=()=> {
      return (<>
            <NavLink
                to='/login' activeStyle={{display: "none"}}>
                Log in
            </NavLink>
            <NavLink
                to='/register' activeStyle={{display: "none"}}>
                Sign up
            </NavLink>
      </>)
    }

render(){
    return (
        <nav onMouseLeave={this.props.hideNav}>
            <span className="username">
                {this.context.user.name}
            </span>
            
            {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}

            
            <NavLink exact to='/landing' activeStyle={{display: "none"}}>
                Info
            </NavLink>
            
           
            {/* <NavLink to='/projects' activeStyle={{display: "none"}}>
                Projects
            </NavLink>

            <NavLink to='/options'  activeStyle={{display: "none"}}>
                Options
            </NavLink>

            {TokenService.isAdmin() && 
            <NavLink to='/user-management' activeStyle={{display: "none"}}>
                User Management
            </NavLink>}*/}

        </nav>
    )    
}
}
