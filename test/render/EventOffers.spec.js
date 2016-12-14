import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import EventOffers from "../../src/common/components/EventOffers";

const EVENT_OFFERS_MOCK_JSON = require('./mocks/EventOffers.mock.json');

describe('Event Offers render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventOffers
        eventOffers={EVENT_OFFERS_MOCK_JSON}
        onSortEventPrices={new Function()}
        connectSocket={new Function()}
        createCart={new Function()}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()} />
    );

    const eventOffers = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventOffers'
    );

    this.eventOffers = ReactDOM.findDOMNode(eventOffers);
  });

  it('event offers component exist', function() {
    expect(this.eventOffers).to.exist;
  });
});
