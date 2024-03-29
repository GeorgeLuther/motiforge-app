import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AuthApiService from '../../services/auth-api-service'
import './RegistrationForm.css'
import UserContext from '../../contexts/UserContext'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }
  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value,
        })
        .then(res => {
        this.context.processLogin(res.authToken)
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className="publicForm"
        onSubmit={this.handleSubmit}
      >
        <div className="form-inputs">
          <div role='alert'>
            {error && <p className="errorMessage">{error}</p>}
          </div>
          <div>
            <label htmlFor='registration-name-input'>
              Enter your name:
            </label>
            <input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </div>
          <div>
            <label htmlFor='registration-username-input'>
              Choose username:
            </label>
            <input
              id='registration-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <label htmlFor='registration-password-input'>
              Choose password:
            </label>
            <input
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </div>
        </div>
        <div className="infographic">
          <button type='submit'>
            Register
          </button>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </div>
      </form>
    )
  }
}

export default RegistrationForm
