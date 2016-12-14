import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';

class Searcher extends Component {
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const searchTerm = ReactDOM.findDOMNode(this.refs.searchInput).value;
    this.props.onSubmitSearch(searchTerm);
  }

  handleClickOutside() {
    this.props.onClearSearchResults();
  }

  render () {
    const { searchType, onSearchTypeChange, onKeywordKeyUp, options } = this.props;
    return (
      <form onSubmit={this.onSubmitHandler}>
        <div className="searcher">
          <select className="search__type-selector"
            onChange={e => onSearchTypeChange(e.target.value)}
            value={searchType}>
            {options.map(option =>
              <option value={option} key={option}>
                {option}
              </option>)
            }
          </select>
          <input ref="searchInput" className="search__input" type="text"
            onKeyUp={e => onKeywordKeyUp(e.target.value)}
            placeholder="Artists, events, venues ..."/>
          <button type="submit" className="button-aux button-aux--minor">Search</button>
        </div>
      </form>
    );
  }
}

Searcher.propTypes = {
  searchType: PropTypes.string.isRequired,
  onSearchTypeChange: PropTypes.func.isRequired,
  onKeywordKeyUp: PropTypes.func.isRequired,
  onSubmitSearch: PropTypes.func.isRequired,
  onClearSearchResults: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired
};

let SearcherWithClickOutside = onClickOutside(Searcher);

export default SearcherWithClickOutside;
