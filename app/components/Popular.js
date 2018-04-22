import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

// prettier-ignore
function SelectLangauge({ selectedLanguage, onSelect }) {
  /* destructuring props */
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => (   /* leveraging arrow functions implicit return */
        <li style={lang == selectedLanguage ? { color: '#d0021b' } : null}
            onClick={() => onSelect(lang)}
            key={lang}>
          {lang}
        </li>
      ))}
    </ul>
  );
}

// prettier-ignore
function RepoGrid({repos}) {
  return (
    <ul className="popular-list">
      {repos.map(({name, stargazers_count, owner, html_url}, index) => ( /* destructuring */
        <li key={name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={owner.avatar_url}
                  alt={'Avatar for ' + owner.login}
                />
              </li>
              <li>
                <a href={html_url}>{name}</a>
              </li>
              <li>@{owner.login}</li>
              <li>{stargazers_count} stars</li>
            </ul>
          </li>
      ))}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

SelectLangauge.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // prettier-ignore
  componentDidMount() {
   this.updateLanguage(this.state.selectedLanguage)
  }

  // prettier-ignore
  updateLanguage(lang) { /* destructuring *note when returning a object you have to wrap in parens */
    this.setState(() => ({
        selectedLanguage: lang,
        repos: null,
    }));

    api.fetchPopularRepos(lang)
    .then((repos) => this.setState(()=> ({ repos }))); /* when key and value name are the same, you can ommit the value*/
  }

  // prettier-ignore
  render() {
    var {selectedLanguage, repos} = this.state /* destructuring off state*/
    return (
      <div>
      <SelectLangauge selectedLanguage={selectedLanguage} onSelect={this.updateLanguage}/>

      {!this.state.repos
         ? <Loading/>
         : <RepoGrid repos={repos} />
        }
      </div>
    );
  }
}
