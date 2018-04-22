import axios from 'axios';

var id = 'fa9a9a94440ad07170d8';
var sec = '59b5759d2fa76a889c2b2ddc24e9008d6ef578b3';
var params = `?client_id=${id}&client_secret=${sec}`; /*template string*/

// prettier-ignore
async function getProfile(username) {
  var profile = await axios.get(`https://api.github.com/users/${username}${params}`)
  return profile.data;
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
async function getUserData(player) {
  var [profile, repos] = await Promise.all([ /* using native promises, destructuring arrays, arrow functions added async/await */
    getProfile(player),
    getRepos(player)
  ])
  return {
    profile,
    score: calculateScore(profile, repos),
  }
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score); /* using arrow functions */
}

export async function battle(players) {
  /*  Not a default export; see below for explanation */
  var results = await Promise.all(players.map(getUserData)).catch(handleError);

  return results === null ? results : sortPlayers(results);
}

export async function fetchPopularRepos(language) {
  /*  Not a default export; see below for explanation */
  var encodedURI = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories` /* using template strings */
  );

  var repos = await axios.get(encodedURI).catch(handleError);

  return repos.data.items; /* arrow functions */
}

/*
  when importing a function that is a default use:

  import fetchPopularRepos from '../api'

  if its not use this, named imports:

  import {fetchPopularRepos} from '../api'

*/
