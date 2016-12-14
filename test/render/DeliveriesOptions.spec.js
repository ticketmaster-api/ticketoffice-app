import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { stub, assert } from 'sinon';
import { expect } from 'chai';

import DeliveriesOptions from "../../src/common/components/DeliveriesOptions";
const CART_COMPLETE_MOCK_JSON = require('./mocks/CartComplete.mock.json');
const SESSION_MOCK_JSON = require('./mocks/Session.mock.json');
const CART_DELIVERIES_MOCK_JSON = require('./mocks/CartDeliveries.mock.json');
const cartId = CART_COMPLETE_MOCK_JSON.cart.id;
const deliveryId = CART_DELIVERIES_MOCK_JSON.deliveries[0].id;
const socket = {};

describe('Deliveries Options render', function() {
  before('render and locate element', function() {
    this.selectDeliveries = (cartId, requestBody, socket) => {};
    stub(this, 'selectDeliveries');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <DeliveriesOptions
        deliveriesOptions={CART_DELIVERIES_MOCK_JSON}
        selectDeliveries={this.selectDeliveries}
        cartId={cartId}
        session={SESSION_MOCK_JSON}
        socket={socket} />
    );

    // locating deliveries options component
    const DeliveriesOptionsComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'deliveriesOptions'
    );

    this.DeliveriesOptionsComponent = ReactDOM.findDOMNode(DeliveriesOptionsComponent);

    // locating list
    this.list = this.DeliveriesOptionsComponent.getElementsByClassName('deliveriesOptions-list')[0];

    // locating list items
    this.listItems = this.DeliveriesOptionsComponent.getElementsByClassName('deliveriesOptions-item');

    // locating select deliveries button
    this.selectBtn = this.DeliveriesOptionsComponent.getElementsByClassName('deliveriesOptions-button')[0];

    // locating form
    this.form = this.DeliveriesOptionsComponent.getElementsByClassName('deliveriesOptions-form')[0];
  });

  it('list exist', function() {
    expect(this.list).to.exist;
  });

  it(`number of list items is equal to ${CART_DELIVERIES_MOCK_JSON.deliveries.length}`, function() {
    expect(this.listItems.length).to.equal(CART_DELIVERIES_MOCK_JSON.deliveries.length);
  });

  it('select deliveries button exist', function() {
    expect(this.selectBtn).to.exist;
  });

  it('clicking select deliveries button should trigger action', function() {
    ReactTestUtils.Simulate.submit(this.form);
    assert.calledWith(
      this.selectDeliveries,
      cartId,
      {deliveries: [{deliveryId}]},
      socket
    );
  });
});
