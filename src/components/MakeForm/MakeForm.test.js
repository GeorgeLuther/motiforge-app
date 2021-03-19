import React from 'react'
import ReactDOM from 'react-dom'
import MakeForm from './MakeForm'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MakeForm/>,div)
  ReactDOM.unmountComponentAtNode(div)
})