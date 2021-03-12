import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../../routes/PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../../routes/PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import Dashboard from '../Dashboard/Dashboard'
import MakeMotif from '../MakeMotif/MakeMotif'
import MakePhrase from '../MakePhrase/MakePhrase'
import MakeForm from '../MakeForm/MakeForm'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'
import Landing from '../Landing/Landing'

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={Dashboard}
            />
            <PrivateRoute
              path={'/landing'}
              component={Landing}
            />
            <PrivateRoute
              path={'/motif'}
              component={MakeMotif}
            />
            <PrivateRoute
              path={'/phrase'}
              component={MakePhrase}
            />
            <PrivateRoute
              path={'/form'}
              component={MakeForm}
            />
            <PublicOnlyRoute
              exact path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/landing'}
              component={Landing}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
