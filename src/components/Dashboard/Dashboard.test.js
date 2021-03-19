import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './Dashboard'
import { BrowserRouter as Router } from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Router><Dashboard/></Router>,div)
  ReactDOM.unmountComponentAtNode(div)
})