import React, { Component } from 'react'; /* named imports if what we are importing is coming in as an object */

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
/* named imports if what we are importing is coming in as an object */

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
            <Route render={() => <h1>Not found</h1>} /> {/* arrow function leveraging implicit return */}
          </Switch>
        </div>
      </Router>
    );
  }
}
