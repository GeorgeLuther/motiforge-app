import React, { Component } from 'react'
//import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
//import Button from '../Button/Button'



class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
        className='LoginForm publicForm'
        onSubmit={this.handleSubmit}
      >
        <div className="form-inputs">
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div>
            <label htmlFor='login-username-input'>
              Username
            </label>
            <input
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
            />
          </div>
          <div>
            <label htmlFor='login-password-input'>
              Password
            </label>
            <input
              id='login-password-input'
              name='password'
              type='password'
              required
            />
          </div>
        </div>
        <div className="infographic">
          <button type='submit'>
            Login
          </button>
        </div>
      </form>
    )
  }
}

export default LoginForm
