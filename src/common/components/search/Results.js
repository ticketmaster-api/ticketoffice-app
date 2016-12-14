import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

export default class Results extends Component {

  getResourceBasePath(searchType) {
    switch(searchType) {
    case 'events':
      return 'event';
    case 'venues':
      return 'venue';
    case 'artists':
      return 'artist';
    }
    return null;
  }

  render () {
    const { searchType, results } = this.props;
    const resourceBasePath = this.getResourceBasePath(searchType);

    if (resourceBasePath) {
      return (
        <ul className="searcher-result">
          {results.map((result) =>
            <li key={result.id}>
              <Link to={{ pathname: `/${resourceBasePath}/${result.id}` }} className="searcher-result-link ignore-react-onclickoutside">{searchType} | {result.name}</Link>
            </li>
          )}
        </ul>
      );
    }

    return null;
  }
}

Results.propTypes = {
  searchType: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired
};
