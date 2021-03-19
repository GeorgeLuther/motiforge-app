import React from 'react'
import ReactDOM from 'react-dom'
import PublicOnlyRoute from './PublicOnlyRoute'
import { MemoryRouter } from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><PublicOnlyRoute children={<div></div>} /></MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})