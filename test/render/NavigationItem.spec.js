import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import NavigationItem from "../../src/common/components/NavigationItem";

const NAVIGATION_MOCK_JSON = require('./mocks/Navigation.mock.json');
const CATEGORY = NAVIGATION_MOCK_JSON.categories[0];
const CATEGORY_EXCLUDED = NAVIGATION_MOCK_JSON.categories[5];

describe('Navigation item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <NavigationItem category={CATEGORY} />
    );

    const renderedComponentExcluded = ReactTestUtils.renderIntoDocument(
      <NavigationItem category={CATEGORY_EXCLUDED} />
    );

    // locating list
    const navigationItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'navigation-list-item'
    );

    this.navigationItem = ReactDOM.findDOMNode(navigationItem);

    // locating segment name
    this.segmentName = this.navigationItem.getElementsByClassName('segment-name')[0];
  });

  it('navigation list item component exist', function() {
    expect(this.navigationItem).to.exist;
  });

  it('segment name exist', function() {
    expect(this.segmentName).to.exist;
  });

  it('segment name should be ' + CATEGORY.segment.name, function() {
    expect(this.segmentName.textContent).to.equal(CATEGORY.segment.name);
  });

  it('segment name excluded should not exist', function() {
    expect(this.renderedComponentExcluded).to.not.exist;
  });
});
