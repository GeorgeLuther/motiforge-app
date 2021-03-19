import React from 'react'
import ReactDOM from 'react-dom'
import MotifPicker from './MotifPicker'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MotifPicker/>,div)
  ReactDOM.unmountComponentAtNode(div)
})