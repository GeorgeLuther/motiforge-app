import React from 'react'
import ReactDOM from 'react-dom'
import PrivateRoute from './PrivateRoute'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PrivateRoute children={<div></div>} /></MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})