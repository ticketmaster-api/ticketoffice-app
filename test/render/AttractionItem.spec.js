import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import AttractionItem from "../../src/common/components/AttractionItem";

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');
const EVENT_ATTRACTION = EVENT_DETAIL_MOCK_JSON._embedded.attractions[0];

describe('Attraction item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <AttractionItem attraction={EVENT_ATTRACTION} />
    );

    // locating list item
    const attractionListItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'attractions-list-item'
    );

    this.attractionListItem = ReactDOM.findDOMNode(attractionListItem);

    // locating link
    this.attractionListItemLink = this.attractionListItem.getElementsByClassName('attractions-list-item-link')[0];
  });

  it('attraction item component exist', function() {
    expect(this.attractionListItem).to.exist;
  });

  it(`attraction item has attraction ID ${EVENT_ATTRACTION.id} as data attribute`, function() {
    expect(this.attractionListItem.getAttribute('data-attractionId')).to.equal(EVENT_ATTRACTION.id);
  });

  it('attraction item link exist', function() {
    expect(this.attractionListItemLink).to.exist;
  });

  it(`attraction item link has text ${EVENT_ATTRACTION.name}`, function() {
    expect(this.attractionListItemLink.textContent).to.equal(EVENT_ATTRACTION.name);
  });
});
