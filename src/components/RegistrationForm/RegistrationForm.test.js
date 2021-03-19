import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationForm from './RegistrationForm'
import { MemoryRouter} from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter>
      <RegistrationForm/>
      </MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})