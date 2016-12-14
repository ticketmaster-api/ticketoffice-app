import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Navigation from "../../src/common/components/Navigation";

const NAVIGATION_MOCK_JSON = require('./mocks/Navigation.mock.json');

const NUM_TOP_NAV_ITEMS = NAVIGATION_MOCK_JSON.categories.length - 1;

describe('Navigation render', function() {

  before('render and locate element', function() {
    const fetchCategories = function(){};
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Navigation
        categories={NAVIGATION_MOCK_JSON.categories}
        fetchCategories={fetchCategories}
        />
    );

    // locating list
    const navigation = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'navigation'
    );

    this.navigation = ReactDOM.findDOMNode(navigation);

    // locating top level nav list
    this.navigationList = this.navigation.getElementsByClassName('navigation-list')[0];

    // top level list items
    this.navigationListItems = this.navigation.getElementsByClassName('navigation-list-item');
  });

  it('navigation component exist', function() {
    expect(this.navigation).to.exist;
  });

  it('top level nav exist', function() {
    expect(this.navigationList).to.exist;
  });

  it('number of top level nav items is equal to ' + NUM_TOP_NAV_ITEMS, function() {
    expect(this.navigationListItems.length).to.equal(NUM_TOP_NAV_ITEMS);
  });
});
