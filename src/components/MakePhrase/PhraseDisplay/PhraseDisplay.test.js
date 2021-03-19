import React from 'react'
import ReactDOM from 'react-dom'
import PhraseDisplay from './PhraseDisplay'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<PhraseDisplay/>,div)
  ReactDOM.unmountComponentAtNode(div)
})