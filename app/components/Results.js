import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import api from '../utils/api';
import Link from 'react-router';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile({ info }) {
  /* destructuring */
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
      <ul className="space-list-items">
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && (
          <li>
            <a href={info.blog}>{info.blog}</a>
          </li>
        )}
      </ul>
    </PlayerPreview>
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired,
};

// prettier-ignore
function Player({ label, score, profile }) { /* destructuring */
  return (
    <div>
      <h1 className="header">{label}</h1>
      <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
      <Profile info={profile} />
    </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
};

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    var { playerOneName, playerTwoName } = queryString.parse(this.props.location.search); /* destructuring */
    // prettier-ignore
    api.battle([
      playerOneName,
      playerTwoName
    ])
    .then((players) => {
      if (players === null){
        return this.setState(() => ({ /* destructuring *note when returning a object you have to wrap in parens */
            error: 'Looks like there was an error. Check that both users exist on Github!',
            loading: false
        }))
      }
      this.setState(()=>({ /* destructuring *note when returning a object you have to wrap in parens */
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
      }))
    });
  }

  render() {
    var { error, winner, loser, loading } = this.state; /* destructuring off state*/

    if (loading === true) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <Player label="Winner" score={winner.score} profile={winner.profile} />
          <Player label="Loser" score={loser.score} profile={loser.profile} />
        </div>
      </div>
    );
  }
}
