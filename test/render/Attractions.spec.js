import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Attractions from "../../src/common/components/Attractions";

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');
const EVENT_ATTRACTIONS = EVENT_DETAIL_MOCK_JSON._embedded.attractions;

describe('Attractions render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Attractions attractions={EVENT_ATTRACTIONS} />
    );

    const attractionsComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'attractions'
    );

    this.attractionsComponent = ReactDOM.findDOMNode(attractionsComponent);

    // locating attractions list
    this.attractionsList = this.attractionsComponent.getElementsByClassName('attractions-list')[0];

    // locating attractions list items
    this.attractionsListItems = this.attractionsList.getElementsByClassName('attractions-list-item');
  });

  it('Attractions component exist', function() {
    expect(this.attractionsComponent).to.exist;
  });

  it('Attractions List exist', function() {
    expect(this.attractionsList).to.exist;
  });

  it(`number of attractions list items is equal to ${EVENT_ATTRACTIONS.length}`, function() {
    expect(this.attractionsListItems.length).to.equal(EVENT_ATTRACTIONS.length);
  });
});
