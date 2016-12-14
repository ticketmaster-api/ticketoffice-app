import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import SubNavigation from "../../src/common/components/SubNavigation";

const NAVIGATION_MOCK_JSON = require('./mocks/Navigation.mock.json');
const GENRES = NAVIGATION_MOCK_JSON.categories[0].segment._embedded.genres;
const NUM_SUB_NAV_ITEMS = GENRES.length;

describe('Sub Navigation item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <SubNavigation genres={GENRES} />
    );

    const subNavigationList = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'subnavigation-list'
    );

    // locating list
    this.subNavigationList = ReactDOM.findDOMNode(subNavigationList);

    // locating list items
    this.subNavigationListItems = this.subNavigationList.getElementsByClassName('subnavigation-list-item');

    // locating first genre name
    this.subNavigationListItemsGenreName = this.subNavigationListItems[0].getElementsByClassName('genre-name')[0];
  });

  it('sub navigation list component exist', function() {
    expect(this.subNavigationList).to.exist;
  });

  it('number of sub navigation items is equal to ' + NUM_SUB_NAV_ITEMS, function() {
    expect(this.subNavigationListItems.length).to.equal(NUM_SUB_NAV_ITEMS);
  });

  it('genre name exist', function() {
    expect(this.subNavigationListItemsGenreName).to.exist;
  });

  it('genre name should be ' + GENRES[0].name, function() {
    expect(this.subNavigationListItemsGenreName.textContent).to.equal(GENRES[0].name);
  });
});
