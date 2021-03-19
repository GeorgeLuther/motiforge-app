import React from 'react'
import ReactDOM from 'react-dom'
import MakeMotif from './MakeMotif'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MakeMotif/>,div)
  ReactDOM.unmountComponentAtNode(div)
})