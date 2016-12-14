import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Results from "../../src/common/components/search/Results";

const SEARCH_ARTISTS_MOCK_JSON = require('./mocks/SearchArtists.mock.json');
const NUM_SEARCH_RESULTS_ITEMS = SEARCH_ARTISTS_MOCK_JSON.results.length;
const SEARCH_TYPE = 'artists';
const FIRST_LINK_TEXT_CONTENT = SEARCH_TYPE + ' | ' + SEARCH_ARTISTS_MOCK_JSON.results[0].name;

describe('search results render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Results searchType={SEARCH_TYPE} results={SEARCH_ARTISTS_MOCK_JSON.results} />
    );

    const searchResultsList = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'searcher-result'
    );

    // locating list
    this.searchResultsList = ReactDOM.findDOMNode(searchResultsList);

    // locating list items
    this.searchResultsListItems = this.searchResultsList.getElementsByClassName('searcher-result-link');

    // locating first list items name
    this.firstSearchResultsListItems = this.searchResultsListItems[0];
  });

  it('search results list component exist', function() {
    expect(this.searchResultsList).to.exist;
  });

  it('number of search results items is equal to ' + NUM_SEARCH_RESULTS_ITEMS, function() {
    expect(this.searchResultsListItems.length).to.equal(NUM_SEARCH_RESULTS_ITEMS);
  });

  it('link text content should be ' + FIRST_LINK_TEXT_CONTENT, function() {
    expect(this.firstSearchResultsListItems.textContent).to.equal(FIRST_LINK_TEXT_CONTENT);
  });
});
