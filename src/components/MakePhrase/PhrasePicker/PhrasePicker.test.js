import React from 'react'
import ReactDOM from 'react-dom'
import PhrasePicker from './PhrasePicker'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<PhrasePicker/>,div)
  ReactDOM.unmountComponentAtNode(div)
})