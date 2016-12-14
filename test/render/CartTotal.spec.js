import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import CartTotal from "../../src/common/components/CartTotal";

const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const TOTALS = CART_COMPLETE_MOCK_JSON.cart.attributes.totals;

describe('CartTotal render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <CartTotal
        totals={TOTALS} />
    );

    // locating cart
    const CartTotalComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cart-totals'
    );

    this.CartTotalComponent = ReactDOM.findDOMNode(CartTotalComponent);

    // locating varies totals elements
    this.totalPrice = this.CartTotalComponent.getElementsByClassName('cart-totalPrice')[0];

    this.totalFees = this.CartTotalComponent.getElementsByClassName('cart-totalFees')[0];

    this.totalDeliveries = this.CartTotalComponent.getElementsByClassName('cart-totalDeliveries')[0];

    this.totalTaxes = this.CartTotalComponent.getElementsByClassName('cart-totalTaxes')[0];

    this.total = this.CartTotalComponent.getElementsByClassName('cart-total')[0];
  });

  it(`total price is ${TOTALS.price}`, function() {
    expect(this.totalPrice.textContent).to.equal(TOTALS.price);
  });

  it(`total fees is ${TOTALS.fees}`, function() {
    expect(this.totalFees.textContent).to.equal(TOTALS.fees);
  });

  it(`total deliveries is ${TOTALS.deliveries}`, function() {
    expect(this.totalDeliveries.textContent).to.equal(TOTALS.deliveries);
  });

  it(`total taxes is ${TOTALS.taxes}`, function() {
    expect(this.totalTaxes.textContent).to.equal(TOTALS.taxes);
  });

  it(`order total is ${TOTALS.total}`, function() {
    expect(this.total.textContent).to.equal(TOTALS.total);
  });
});
