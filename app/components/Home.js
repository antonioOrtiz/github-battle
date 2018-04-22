import React, { Component } from 'react';
/* named imports if what we are importing is coming in as an object */

import { Link } from 'react-router-dom';
/* named imports if what we are importing is coming in as an object */

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <h1>Github Battle: Battle your friends...and stuff.</h1>
        <Link className="button" to="/battle">
          Battle
        </Link>
      </div>
    );
  }
}
