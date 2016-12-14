import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import EventPricesItem from "../../src/common/components/EventPricesItem";

const EVENT_OFFERS_MOCK_JSON = require('./mocks/EventOffers.mock.json');
const FIRST_PRICE_ELEMENT = EVENT_OFFERS_MOCK_JSON.prices.data[0];

describe('Event Price Item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPricesItem
        eventPrice={FIRST_PRICE_ELEMENT}
        createCart={new Function()}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={new Function()} />
    );

    const eventPricesListItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrice-list-item'
    );

    this.eventPricesListItem = ReactDOM.findDOMNode(eventPricesListItem);

    // locating price currency
    this.eventPriceCurrency = this.eventPricesListItem.getElementsByClassName('eventPrice-price-currency')[0];

    // locating price value
    this.eventPriceValue = this.eventPricesListItem.getElementsByClassName('eventPrice-price-value')[0];

    // locating create cart button
    this.createCartBtn = this.eventPricesListItem.getElementsByClassName('eventPrice--button')[0];
  });

  it('event price item component exist', function() {
    expect(this.eventPricesListItem).to.exist;
  });

  it('event price currency component exist', function() {
    expect(this.eventPriceCurrency).to.exist;
  });

  it('event price currency should be ' + FIRST_PRICE_ELEMENT.attributes.currency, function() {
    expect(this.eventPriceCurrency.textContent).to.equal(FIRST_PRICE_ELEMENT.attributes.currency);
  });

  it('event price value component exist', function() {
    expect(this.eventPriceValue).to.exist;
  });

  it('event price value should be ' + FIRST_PRICE_ELEMENT.attributes.value, function() {
    expect(this.eventPriceValue.textContent).to.equal(FIRST_PRICE_ELEMENT.attributes.value);
  });

  it('event create cart button exist', function() {
    expect(this.createCartBtn).to.exist;
  });
});
