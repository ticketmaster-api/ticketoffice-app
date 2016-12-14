import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import PriceRangeItem from "../../src/common/components/PriceRangeItem";

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');
const PRICE_RANGE = EVENT_DETAIL_MOCK_JSON.priceRanges[0];

describe('Price range item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <PriceRangeItem priceRange={PRICE_RANGE} />
    );

    // locating list
    const priceRangeItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'priceRange-list-item'
    );

    this.priceRangeItem = ReactDOM.findDOMNode(priceRangeItem);

    // locating id
    this.priceRangeType = this.priceRangeItem.getElementsByClassName('priceRange-type')[0];

    // locating currency
    this.priceRangeCurrency = this.priceRangeItem.getElementsByClassName('priceRange-currency')[0];

    // locating min price
    this.priceRangeMin = this.priceRangeItem.getElementsByClassName('priceRange-min')[0];

    // locating max price
    this.priceRangeMax = this.priceRangeItem.getElementsByClassName('priceRange-max')[0];
  });

  it('price range list item component exist', function() {
    expect(this.priceRangeItem).to.exist;
  });

  it('price range type exist', function() {
    expect(this.priceRangeType).to.exist;
  });

  it('price range type should be ' + PRICE_RANGE.type, function() {
    expect(this.priceRangeType.textContent).to.equal(PRICE_RANGE.type);
  });

  it('price range currency exist', function() {
    expect(this.priceRangeCurrency).to.exist;
  });

  it('price range currency should be ' + PRICE_RANGE.currency, function() {
    expect(this.priceRangeCurrency.textContent).to.equal(PRICE_RANGE.currency);
  });

  it('price range min exist', function() {
    expect(this.priceRangeMin).to.exist;
  });

  it('price range min should be ' + PRICE_RANGE.min, function() {
    expect(this.priceRangeMin.textContent).to.equal(PRICE_RANGE.min + '');
  });

  it('price range max exist', function() {
    expect(this.priceRangeMax).to.exist;
  });

  it('price range max should be ' + PRICE_RANGE.max, function() {
    expect(this.priceRangeMax.textContent).to.equal(PRICE_RANGE.max + '');
  });
});
