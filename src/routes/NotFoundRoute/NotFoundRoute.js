import React, { Component } from 'react'
import './NotFound.css'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className='not-found'>
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute
