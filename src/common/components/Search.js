import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Searcher from './search/Searcher';
import Results from './search/Results';

const SEARCHER_SELECT_OPTION_EVENTS = 'events';
const SEARCHER_SELECT_OPTION_VENUES = 'venues';
const SEARCHER_SELECT_OPTION_ARTISTS = 'artists';

const MINIMUM_SEARCH_KEYWORD_CHAR = 3;

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchTypeChange = this.searchTypeChange.bind(this);
    this.keywordKeyUp = this.keywordKeyUp.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  searchTypeChange(newSearchType) {
    const { clearSearchResults, selectSearch } = this.props;
    clearSearchResults();
    selectSearch(newSearchType);
  }

  keywordKeyUp(keyword) {
    if (keyword.length >= MINIMUM_SEARCH_KEYWORD_CHAR) {
      return this.submitSearch(keyword);
    }

    this.props.clearSearchResults();
    return false;
  }

  submitSearch(searchTerm) {
    const {
      selectedSearch,
      fetchVenuesSearchResults,
      fetchAttractionsSearchResults,
      fetchEventsSearchResults
    } = this.props;

    switch (selectedSearch) {
    case SEARCHER_SELECT_OPTION_VENUES:
      fetchVenuesSearchResults(searchTerm);
      break;
    case SEARCHER_SELECT_OPTION_ARTISTS:
      fetchAttractionsSearchResults(searchTerm);
      break;
    case SEARCHER_SELECT_OPTION_EVENTS:
    default:
      fetchEventsSearchResults(searchTerm);
      break;
    }
    return true;
  }

  render() {
    const options = [
      SEARCHER_SELECT_OPTION_EVENTS,
      SEARCHER_SELECT_OPTION_VENUES,
      SEARCHER_SELECT_OPTION_ARTISTS
    ];
    const { selectedSearch, results, classnames, clearSearchResults } = this.props;
    const classnamesProp = classnames || [];
    const searchClassNames = classNames(['search', ...classnamesProp]);
    const resultsComponent = results.length ? <Results searchType={selectedSearch} results={results} /> : null;
    return (
      <div className={searchClassNames}>
        <Searcher searchType={selectedSearch}
          onSearchTypeChange={this.searchTypeChange}
          onKeywordKeyUp={this.keywordKeyUp}
          onSubmitSearch={this.submitSearch}
          onClearSearchResults={clearSearchResults}
          options={options}/>
        {resultsComponent}
      </div>
    );
  }
}

Search.propTypes = {
  selectedSearch: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  classnames: PropTypes.array,
  fetchVenuesSearchResults: PropTypes.func.isRequired,
  fetchAttractionsSearchResults: PropTypes.func.isRequired,
  fetchEventsSearchResults: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired
};

export default Search;
