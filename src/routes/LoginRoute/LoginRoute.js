import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="login">
        <div className="summary">
          <div className="img5">
            <h2>Login</h2>
          </div>

          <LoginForm
              onLoginSuccess={this.handleLoginSuccess}
            />
        </div>
      </section>
    );
  }
}

export default LoginRoute
