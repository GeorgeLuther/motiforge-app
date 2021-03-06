import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext'
import App from './components/App/App';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus,
    faBars,
    faSearch,
    faChevronDown,
    faSyncAlt,
    faBackward,
    faPlay,
    faPause,
    faStop,
    faForward,
    faVolumeUp,
    faVolumeMute,
    faTimes,
    faCopy,
    faEllipsisH,
    faEllipsisV } from '@fortawesome/free-solid-svg-icons'

library.add(
    faPlus,
    faBars,
    faSearch,
    faChevronDown,
    faSyncAlt,
    faBackward,
    faPlay,
    faPause,
    faStop,
    faForward,
    faVolumeUp,
    faVolumeMute,
    faTimes,
    faCopy,
    faEllipsisH,
    faEllipsisV,
)
ReactDOM.render(
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  )