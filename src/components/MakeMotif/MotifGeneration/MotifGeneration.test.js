import React from 'react'
import ReactDOM from 'react-dom'
import MotifGeneration from './MotifGeneration'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MotifGeneration/>,div)
  ReactDOM.unmountComponentAtNode(div)
})