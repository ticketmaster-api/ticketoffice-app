import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Presale from "../../src/common/components/Presale";

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');
const PRESALES = EVENT_DETAIL_MOCK_JSON.sales.presales;

describe('Presale render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Presale presales={PRESALES} />
    );

    const presaleComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'presale'
    );

    this.presaleComponent = ReactDOM.findDOMNode(presaleComponent);

    // locating presale list
    this.presaleList = this.presaleComponent.getElementsByClassName('presale-list')[0];

    // locating presale list items
    this.presaleListItems = this.presaleList.getElementsByClassName('presale-list-item');
  });

  it('Presale component exist', function() {
    expect(this.presaleComponent).to.exist;
  });

  it('Presale List exist', function() {
    expect(this.presaleList).to.exist;
  });

  it(`number of presale list items is equal to ${PRESALES.length}`, function() {
    expect(this.presaleListItems.length).to.equal(PRESALES.length);
  });
});
