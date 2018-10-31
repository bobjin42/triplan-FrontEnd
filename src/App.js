import React, { Component, Fragment } from 'react';
import './App.css';
import Plan from './pages/Plan'


class App extends Component {

  render() {
    return (
      <Fragment>
        <Plan />
        <Show />
      </Fragment>
    );
  }
}

export default App;
