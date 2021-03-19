import React from 'react'
import ReactDOM from 'react-dom'
import MakePhrase from './MakePhrase'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<MakePhrase/>,div)
  ReactDOM.unmountComponentAtNode(div)
})