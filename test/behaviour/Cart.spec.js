import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import Cart from "../../src/common/components/Cart";
const CART_COMPLETE_MOCK_JSON = require('../render/mocks/CartComplete.mock.json');
const cartId = CART_COMPLETE_MOCK_JSON.cart.id;
const SESSION_MOCK_JSON = require('../render/mocks/Session.mock.json');

describe('Cart behaviour', function() {

  before('render and locate element', function() {
    this.emptyCart = (cartId) => {};
    stub(this, 'emptyCart');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Cart
        cart={CART_COMPLETE_MOCK_JSON}
        session={SESSION_MOCK_JSON}
        emptyCart={this.emptyCart}/>
    );

    // locating cart
    const CartComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cartPage'
    );

    this.CartComponent = ReactDOM.findDOMNode(CartComponent);

    this.emptyCartBtn = this.CartComponent.getElementsByClassName('emptyCartBtn')[0];
  });

  it('clicking empty cart button should trigger action', function() {
    ReactTestUtils.Simulate.click(this.emptyCartBtn);
    assert.calledWith(
      this.emptyCart,
      cartId
    );
  });
});
