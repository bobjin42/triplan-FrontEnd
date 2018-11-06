import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import Plan from './pages/Plan';
import Nav from './pages/Nav';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/show" component={Show} />
          <Route exact path="/plan" component={Plan} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
