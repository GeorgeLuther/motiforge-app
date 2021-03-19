import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationRoute from './RegistrationRoute'
import { MemoryRouter} from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><RegistrationRoute/></MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})