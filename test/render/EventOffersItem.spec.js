import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import EventOffersItem from "../../src/common/components/EventOffersItem";

const EVENT_OFFERS_MOCK_JSON = require('./mocks/EventOffers.mock.json');
const EVENT_OFFER = EVENT_OFFERS_MOCK_JSON.offers[0];

describe('Event offers item render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventOffersItem eventOffer={EVENT_OFFER} />
    );

    // locating list item
    const eventOffersItem = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventOffer-list-item'
    );

    this.eventOffersItem = ReactDOM.findDOMNode(eventOffersItem);

    // locating name
    this.eventOfferName = this.eventOffersItem.getElementsByClassName('eventOffer-name')[0];

    // locating description
    this.eventOfferDescription = this.eventOffersItem.getElementsByClassName('eventOffer-description')[0];
  });

  it('event offers list item component exist', function() {
    expect(this.eventOffersItem).to.exist;
  });

  it('event offer name exist', function() {
    expect(this.eventOfferName).to.exist;
  });

  it('event offer name should be ' + EVENT_OFFER.name, function() {
    expect(this.eventOfferName.textContent).to.equal(EVENT_OFFER.name);
  });

  it('event offer description exist', function() {
    expect(this.eventOfferDescription).to.exist;
  });

  it('event offer description should be ' + EVENT_OFFER.description, function() {
    expect(this.eventOfferDescription.textContent).to.equal(EVENT_OFFER.description);
  });
});
