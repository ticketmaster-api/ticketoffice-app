import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import App from "../../src/common/components/App";

const session = {
  cartId: 'CART_ID'
};

describe('App level cart related calls', function() {

  before('render and locate element', function() {
    this.fetchCart = (cartId) => {};
    stub(this, 'fetchCart');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <App
        session={session}
        fetchCart={this.fetchCart}
        showHeader={false} >
        <div>Dummy Component</div>
      </App>
    );
  });

  it('calls fetch cart upon rendering', function() {
    assert.calledWith(
      this.fetchCart,
      session.cartId
    );
  });
});
