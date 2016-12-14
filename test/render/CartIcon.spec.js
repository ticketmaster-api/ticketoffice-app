import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import CartIcon from "../../src/common/components/CartIcon";

const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');

describe('Cart Icon render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <CartIcon
        cart={CART_COMPLETE_MOCK_JSON}
        classnames={['header-block']} />
    );

    // locating cart
    const CartIconComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'cartIcon'
    );

    this.CartIconComponent = ReactDOM.findDOMNode(CartIconComponent);

    // locating link
    this.cartLink = this.CartIconComponent.getElementsByClassName('event-header__tm-link')[0];

    // locating carted quantity bubble
    this.cartedQty = this.CartIconComponent.getElementsByClassName('cartIcon__cartedQty')[0];

    // locating reservations tooltip
    this.tooltip = this.CartIconComponent.getElementsByClassName('tooltip')[0];
  });

  it('link exists', function() {
    expect(this.cartLink).to.exist;
  });

  it('carted quantity bubble exists', function() {
    expect(this.cartedQty).to.exist;
  });

  it(`carted quantity bubble reads '1'`, function() {
    expect(this.cartedQty.textContent).to.equal('1');
  });

  it('tooltip exists', function() {
    expect(this.tooltip).to.exist;
  });
});
