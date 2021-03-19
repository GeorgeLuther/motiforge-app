import React from 'react'
import ReactDOM from 'react-dom'
import MotifDisplay from './MotifDisplay'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MotifDisplay/>,div)
  ReactDOM.unmountComponentAtNode(div)
})