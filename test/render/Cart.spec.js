import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import Cart from "../../src/common/components/Cart";

const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const TOTALS = CART_COMPLETE_MOCK_JSON.cart.attributes.totals;
const CART_POLLING_MOCK_JSON = require('./mocks/CartPolling.mock.json');
const SESSION_MOCK_JSON = require('./mocks/Session.mock.json');

describe('Cart (polling) render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Cart
        cart={CART_POLLING_MOCK_JSON}
        session={SESSION_MOCK_JSON}
        emptyCart={new Function()} />
    );

    // locating cart
    const CartComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cartPage'
    );

    this.CartComponent = ReactDOM.findDOMNode(CartComponent);

    // locating polling message
    this.pollingMsg = this.CartComponent.getElementsByClassName('pollingMsg')[0];
  });

  it('polling message exist', function() {
    expect(this.pollingMsg).to.exist;
  });
});

describe('Cart (complete) render', function() {

  before('render and locate element', function() {
    this.emptyCart = (cartId) => {};
    stub(this, 'emptyCart');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Cart
        cart={CART_COMPLETE_MOCK_JSON}
        session={SESSION_MOCK_JSON}
        emptyCart={this.emptyCart} />
    );

    // locating cart
    const CartComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cartPage'
    );

    this.CartComponent = ReactDOM.findDOMNode(CartComponent);

    // locating reservations list
    this.reservationsList = this.CartComponent.getElementsByClassName('cart-reservationsList')[0];

    // locating varies totals component
    this.total = this.CartComponent.getElementsByClassName('cart-total')[0];

    // locating empty cart button
    this.emptyCartBtn = this.CartComponent.getElementsByClassName('emptyCartBtn')[0];

    // locating checkout button
    this.checkoutBtn = this.CartComponent.getElementsByClassName('cart-checkout-btn')[0];
  });

  it('reservations list exist', function() {
    expect(this.reservationsList).to.exist;
  });

  it('totals compoent exist', function() {
    expect(this.total).to.exist;
  });

  it('clicking empty cart button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.emptyCartBtn);
    assert.calledWith(
      this.emptyCart,
      CART_COMPLETE_MOCK_JSON.cart.id
    );
  });

  it('checkout button exist', function() {
    expect(this.checkoutBtn).to.exist;
  });
});
