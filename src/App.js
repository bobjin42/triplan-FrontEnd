import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Plan from './pages/Plan';
import Show from './pages/Show';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './pages/Nav';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import TimePlan from './pages/TimePlan';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/show" component={Show} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/plan" component={Plan} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/timeplan" component={TimePlan} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
