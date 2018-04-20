import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import Popular from './Popular';

import '../index.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Results} />
            <Route path="/popular" component={Popular} />
            <Route
              render={function() {
                return <h1>Not found</h1>;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
