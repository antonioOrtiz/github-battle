var axios = require('axios');

var id = 'fa9a9a94440ad07170d8';
var sec = '59b5759d2fa76a889c2b2ddc24e9008d6ef578b3';
var params = `?client_id=${id}&client_secret=${sec}`; /*template string*/

// prettier-ignore
function getProfile(username) {
  return axios.get(`https://api.github.com/users/${username}${params}`)
  .then(({data}) => data); /* template strings arrow functions */
}

function getRepos(username) {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`); /*template string*/
}

function getStarCount(repos) {
  return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0); /* arrow functions */
}

// prettier-ignore
function calculateScore({followers}, repos) { /* destructuring */
  return (followers * 3) + getStarCount(repos);;
}

function handleError(error) {
  console.warn(error);
  return null;
}

// prettier-ignore
function getUserData(player) {
  return Promise.all([ /* using native promises, destructuring arrays, arrow functions */
    getProfile(player),
    getRepos(player)
  ]).then(([profile, repos]) => ({

      profile,
      score: calculateScore(profile, repos),

  }));
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score); /* using arrow functions */
}

module.exports = {
  battle(players) {
    return Promise.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos(language) {
    var encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories` /* using template strings */
    );

    return axios.get(encodedURI).then(({ data }) => data.items); /* arrow functions */
  },
};
