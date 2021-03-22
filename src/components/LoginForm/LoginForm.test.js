import React from 'react'
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm'
import { MemoryRouter} from 'react-router-dom'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter>
      <LoginForm/>
      </MemoryRouter>,div)
  ReactDOM.unmountComponentAtNode(div)
})