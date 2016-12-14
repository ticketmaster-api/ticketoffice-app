import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai, { expect } from 'chai';
import spies from 'chai-spies';

import EventPricesSorter from "../../src/common/components/EventPricesSorter";
import { EVENT_PRICES_SORT_ASC, EVENT_PRICES_SORT_DSC } from "../../src/common/actions/eventOffers";

chai.use(spies);

describe('Event Prices Sorter render', function() {

  before('render and locate element', function() {
    this.onSortHandlerSpy = chai.spy();
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventPricesSorter
        onSort={this.onSortHandlerSpy}
        direction={EVENT_PRICES_SORT_ASC} />
    );

    const eventPricesSorter = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventPrices-sorter'
    );

    this.eventPricesSorter = ReactDOM.findDOMNode(eventPricesSorter);

    // locating price sorter select
    this.eventPricesSorterSelect = this.eventPricesSorter.getElementsByClassName('eventPrices-sorter--price')[0];
  });

  it('event price sorter component exist', function() {
    expect(this.eventPricesSorter).to.exist;
  });

  it('event price sorter select exist', function() {
    expect(this.eventPricesSorterSelect).to.exist;
  });

  it('event price sorter select calls onChange handler', function() {
    this.eventPricesSorterSelect.value = EVENT_PRICES_SORT_DSC;
    ReactTestUtils.Simulate.change(this.eventPricesSorterSelect);
    expect(this.onSortHandlerSpy).to.have.been.called.with(EVENT_PRICES_SORT_DSC);

    this.onSortHandlerSpy.reset();

    this.eventPricesSorterSelect.value = EVENT_PRICES_SORT_ASC;
    ReactTestUtils.Simulate.change(this.eventPricesSorterSelect);
    expect(this.onSortHandlerSpy).to.have.been.called.with(EVENT_PRICES_SORT_ASC);
  });
});
