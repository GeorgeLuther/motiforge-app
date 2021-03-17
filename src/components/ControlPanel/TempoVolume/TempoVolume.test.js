import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import TempoVolume from './TempoVolume'


it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<TempoVolume/>,div)
  ReactDOM.unmountComponentAtNode(div)
})