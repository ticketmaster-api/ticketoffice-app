import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import PriceRanges from "../../src/common/components/PriceRanges";

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');

describe('Price ranges render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <PriceRanges priceRanges={EVENT_DETAIL_MOCK_JSON.priceRanges} />
    );

    // locating list
    const priceRanges = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'priceRanges'
    );

    this.priceRanges = ReactDOM.findDOMNode(priceRanges);
  });

  it('price ranges component exist', function() {
    expect(this.priceRanges).to.exist;
  });
});
