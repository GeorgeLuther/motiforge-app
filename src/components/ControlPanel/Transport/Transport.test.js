import React from 'react'

import ReactDOM from 'react-dom'

import renderer from 'react-test-renderer'

import Transport from './Transport'

import * as  Tone from 'tone'

it('renders without crashing',()=>{
  const div = document.createElement('div')
  ReactDOM.render(<Transport/>,div)
  ReactDOM.unmountComponentAtNode(div)
})