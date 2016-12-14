import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Orders from "../../src/common/components/Orders";

const ORDERS_COMPLETE_MOCK_JSON = require('./mocks/OrdersComplete.mock.json');

describe('Orders render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Orders orders={ORDERS_COMPLETE_MOCK_JSON} />
    );

    const ordersComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'orders'
    );

    this.ordersComponent = ReactDOM.findDOMNode(ordersComponent);

    // locating confirmation id
    this.confirmationId = this.ordersComponent.getElementsByClassName('orders-confirmationId')[0];
  });

  it(`Confirmation ID is equal to ${ORDERS_COMPLETE_MOCK_JSON.confirmation.id}`, function() {
    expect(this.confirmationId.textContent).to.equal(ORDERS_COMPLETE_MOCK_JSON.confirmation.id);
  });
});
