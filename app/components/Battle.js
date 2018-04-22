import React, { Component } from 'react';
/* named imports if what we are importing is coming in as an object */

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
/* named imports if what we are importing is coming in as an object */

import PlayerPreview from './PlayerPreview';

/*
  using babel-plugin-transform-class-properties to add these props, allows us to add specific properties to our components e.g. state, propTypes, defaultProps, as well as using arrow function for the methods on the class so we won't have to bind them.
*/

class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    label: 'Username',
  };

  state = {
    username: '',
  };

  handleChange = event => {
    var value = event.target.value;
    this.setState(() => ({ username: value })); /* arrow functions */
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  };

  render() {
    var { username } = this.state; /* destructuring */
    var { label } = this.props; /* destructuring */
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={this.handleChange}
        />
        <button className="button" type="submit" disabled={!this.state.username}>
          Submit
        </button>
      </form>
    );
  }
}

/*
  using babel-plugin-transform-class-properties to add these props, allows us to add specific properties to our components e.g. state, propTypes, defaultProps, as well as using arrow function for the methods on the class so we won't have to bind them.
*/

export default class Battle extends Component {
  state = {
    playerOneName: '',
    playerTwoName: '',
    playerOneImage: null,
    playerTwoImage: null,
  };

  // prettier-ignore
  handleSubmit = (id, username) => {
    this.setState(() => ({
      /* computed property names */
      [id + 'Name']: username,
      [id + 'Image']: `https://github.com/${username}.png?size=200`,
    }));
  }

  // prettier-ignore
  handleReset= (id) => {
    this.setState(() => ({
      /* computed property names */
      [id + 'Name']: '',
      [id + 'Image']: null,
    }));
  }

  render() {
    var { match } = this.props;
    var { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;
    return (
      <div>
        <div className="row">
          {!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit} />}

          {// prettier-ignore
          playerOneImage !== null && (
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button className="reset" onClick={()=>this.handleReset('playerOne')}>
                reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit} />}

          {// prettier-ignore
          playerTwoImage !== null && (
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}>

               <button className="reset" onClick={()=>this.handleReset( 'playerTwo')}>
                reset
              </button>

            </PlayerPreview>
          )}
        </div>
        {playerOneImage &&
        playerTwoImage && (
          <Link
            className="button"
            to={{
              pathname: match.url + '/results',
              search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`,
            }}
            className="button"
          >
            Battle
          </Link>
        )}
      </div>
    );
  }
}
