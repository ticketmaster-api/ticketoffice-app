import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import EventPrices from "../../src/common/components/EventPrices";
import { EVENT_PRICES_SORT_ASC, EVENT_PRICES_SORT_DSC } from "../../src/common/actions/eventOffers";

const EVENT_OFFERS_MOCK_JSON = require('./mocks/EventOffers.mock.json');

describe('Event Prices render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPrices
        eventPrices={EVENT_OFFERS_MOCK_JSON.prices.data}
        eventOffers={EVENT_OFFERS_MOCK_JSON.offers}
        eventAreas={EVENT_OFFERS_MOCK_JSON.areas.data}
        onSortEventPrices={new Function}
        createCart={new Function()}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={new Function()}
        direction={EVENT_PRICES_SORT_ASC}/>
    );

    const eventPrices = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrices'
    );

    this.eventPrices = ReactDOM.findDOMNode(eventPrices);

    // locating prices sorter
    this.eventPricesSorter = this.eventPrices.getElementsByClassName('eventPrices-sorter')[0];

    // locating prices list
    this.eventPricesList = this.eventPrices.getElementsByClassName('eventPrices-list')[0];
  });

  it('event prices component exist', function() {
    expect(this.eventPrices).to.exist;
  });

  it('event prices sorter component exist', function() {
    expect(this.eventPricesSorter).to.exist;
  });

  it('event prices list component exist', function() {
    expect(this.eventPricesList).to.exist;
  });
});
