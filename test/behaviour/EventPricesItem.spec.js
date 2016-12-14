import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import EventPricesItem from "../../src/common/components/EventPricesItem";
const EVENT_OFFERS_MOCK_JSON = require('../render/mocks/EventOffers.mock.json');
const FIRST_PRICE_ELEMENT = EVENT_OFFERS_MOCK_JSON.prices.data[0];
const FIRST_OFFER_ELEMENT = EVENT_OFFERS_MOCK_JSON.offers[0];
const FIRST_OFFER_PRICES_ELEMENT = FIRST_OFFER_ELEMENT.prices[0];
const product = {
  'offers': [
    {
      'offer': FIRST_OFFER_ELEMENT.id
    }
  ],
  'filters': {
    'maxPrice': {
      'amount': FIRST_OFFER_PRICES_ELEMENT.value,
      'code': FIRST_OFFER_PRICES_ELEMENT.currency
    },
    'minPrice': {
      'amount': FIRST_OFFER_PRICES_ELEMENT.value,
      'code': FIRST_OFFER_PRICES_ELEMENT.currency
    }
  },
  'qty': 2,
  'product': FIRST_OFFER_ELEMENT.productId
};
const CREATE_PAYLOAD = {'products': [product]};
const UPDATE_ADD_PAYLOAD = {'products': [{'op': 'add', ...product}]};
const cart = {
  cart: {
    id: 'CART_ID',
    attributes: {
      reservations: [{}]
    }
  }
};

describe('Create cart behaviour without Socket', function() {

  before('render and locate element', function() {
    this.createCart = (payload) => {};
    stub(this, 'createCart');

    this.connectSocket = (callback) => { callback({}) };

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPricesItem
        eventPrice={FIRST_PRICE_ELEMENT}
        eventOffer={FIRST_OFFER_ELEMENT}
        createCart={this.createCart}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={this.connectSocket} />
    );

    const eventPricesItemComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrice-list-item'
    );

    this.eventPricesItemComponent = ReactDOM.findDOMNode(eventPricesItemComponent);

    this.addCartBtn = this.eventPricesItemComponent.getElementsByClassName('eventPrice--button')[0];
  });

  it('clicking add cart button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.addCartBtn);
    assert.calledWith(
      this.createCart,
      CREATE_PAYLOAD
    );
  });
});

describe('Create cart behaviour with Socket', function() {

  before('render and locate element', function() {
    this.createCart = (payload) => {};
    stub(this, 'createCart');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPricesItem
        eventPrice={FIRST_PRICE_ELEMENT}
        eventOffer={FIRST_OFFER_ELEMENT}
        createCart={this.createCart}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={new Function()}
        socket={{}} />
    );

    const eventPricesItemComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrice-list-item'
    );

    this.eventPricesItemComponent = ReactDOM.findDOMNode(eventPricesItemComponent);

    this.addCartBtn = this.eventPricesItemComponent.getElementsByClassName('eventPrice--button')[0];
  });

  it('clicking add cart button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.addCartBtn);
    assert.calledWith(
      this.createCart,
      CREATE_PAYLOAD
    );
  });
});

describe('Add cart behaviour with cart state', function() {

  before('render and locate element', function() {
    this.updateCart = (payload) => {};
    stub(this, 'updateCart');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPricesItem
        eventPrice={FIRST_PRICE_ELEMENT}
        eventOffer={FIRST_OFFER_ELEMENT}
        createCart={new Function()}
        updateCart={this.updateCart}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={new Function()}
        socket={{}}
        cart={cart} />
    );

    const eventPricesItemComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrice-list-item'
    );

    this.eventPricesItemComponent = ReactDOM.findDOMNode(eventPricesItemComponent);

    this.addCartBtn = this.eventPricesItemComponent.getElementsByClassName('eventPrice--button')[0];
  });

  it('clicking add cart button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.addCartBtn);
    assert.calledWith(
      this.updateCart,
      cart.cart.id,
      UPDATE_ADD_PAYLOAD
    );
  });
});
