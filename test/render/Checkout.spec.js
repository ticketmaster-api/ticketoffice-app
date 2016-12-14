import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import Checkout from "../../src/common/components/Checkout";
const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const CART_COMPLETE_WITH_DELIVERIES_PAYMENTS_MOCK_JSON = require('./mocks/Cart.with.Deliveries.Payments.mock.json');
const SESSION_MOCK_JSON = require('./mocks/Session.mock.json');
const CART_DELIVERIES_MOCK_JSON = require('./mocks/CartDeliveries.mock.json');
const cartId = CART_COMPLETE_MOCK_JSON.cart.id;

describe('Checkout (to collect delivery and payment method) render', function() {
  before('render and locate element', function() {
    this.fetchDeliveries = (cartId) => {};
    stub(this, 'fetchDeliveries');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Checkout
        cart={CART_COMPLETE_MOCK_JSON}
        cartReview={false}
        session={SESSION_MOCK_JSON}
        fetchDeliveries={this.fetchDeliveries}
        completeOrder={new Function()}
        selectDeliveries={new Function()}
        addPaymentInstrument={new Function()}
        selectPayments={new Function()}
        refreshToken={new Function()}
        reviewOrder={new Function()}
        deliveriesOptions={CART_DELIVERIES_MOCK_JSON}
        socket={{}}/>
    );

    // locating checkout
    const CheckoutComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'Checkout'
    );

    this.CheckoutComponent = ReactDOM.findDOMNode(CheckoutComponent);

    // locating deliveries options
    this.deliveriesOptions = this.CheckoutComponent.getElementsByClassName('deliveriesOptions')[0];

    // locating payments options
    this.paymentsOptions = this.CheckoutComponent.getElementsByClassName('paymentsOptions')[0];

    // locating back button
    this.backBtn = this.CheckoutComponent.getElementsByClassName('checkout-back-btn')[0];

    // locating review button
    this.reviewBtn = this.CheckoutComponent.getElementsByClassName('checkout-review-btn')[0];
  });

  it('checkout component exist', function() {
    expect(this.CheckoutComponent).to.exist;
  });

  it('fetch deliveries action triggered', function() {
    assert.calledWith(
      this.fetchDeliveries,
      cartId
    );
  });

  it('deliveries options component exist', function() {
    expect(this.deliveriesOptions).to.exist;
  });

  it('payments options component exist', function() {
    expect(this.paymentsOptions).to.exist;
  });

  it('back button exist', function() {
    expect(this.backBtn).to.exist;
  });

  it('review button exist', function() {
    expect(this.reviewBtn).to.exist;
  });
});

describe('Checkout (to review before finalizing order) render', function() {
  before('render and locate element', function() {
    this.reviewOrder = () => {};
    stub(this, 'reviewOrder');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Checkout
        cart={CART_COMPLETE_WITH_DELIVERIES_PAYMENTS_MOCK_JSON}
        cartReview={false}
        session={SESSION_MOCK_JSON}
        fetchDeliveries={new Function()}
        completeOrder={new Function()}
        selectDeliveries={new Function()}
        addPaymentInstrument={new Function()}
        selectPayments={new Function()}
        refreshToken={new Function()}
        reviewOrder={this.reviewOrder}
        deliveriesOptions={CART_DELIVERIES_MOCK_JSON}
        socket={{}}/>
    );

    // locating checkout
    const CheckoutComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'Checkout'
    );

    this.CheckoutComponent = ReactDOM.findDOMNode(CheckoutComponent);

    // locating review button
    this.reviewBtn = this.CheckoutComponent.getElementsByClassName('checkout-review-btn')[0];
  });

  it('clicking review button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.reviewBtn);
    assert.called(this.reviewOrder);
  });
});

describe('Checkout (to finalize order) render', function() {
  before('render and locate element', function() {
    this.completeOrder = () => {};
    stub(this, 'completeOrder');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Checkout
        cart={CART_COMPLETE_WITH_DELIVERIES_PAYMENTS_MOCK_JSON}
        cartReview={true}
        session={SESSION_MOCK_JSON}
        fetchDeliveries={new Function()}
        completeOrder={this.completeOrder}
        selectDeliveries={new Function()}
        addPaymentInstrument={new Function()}
        selectPayments={new Function()}
        refreshToken={new Function()}
        reviewOrder={new Function()}
        deliveriesOptions={CART_DELIVERIES_MOCK_JSON}
        socket={{}}/>
    );

    // locating checkout
    const CheckoutComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'Checkout'
    );

    this.CheckoutComponent = ReactDOM.findDOMNode(CheckoutComponent);

    // locating review button
    this.completeOrderBtn = this.CheckoutComponent.getElementsByClassName('complete-order-btn')[0];
  });

  it('clicking complete order button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.completeOrderBtn);
    assert.called(this.completeOrder);
  });
});
