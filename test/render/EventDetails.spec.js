import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import EventDetails from "../../src/common/components/EventDetails";
import getFormattedEventDate from '../../src/common/util/eventDateFormatter';

const EVENT_DETAIL_MOCK_JSON = require('./mocks/EventDetails.mock.json');
const EVENT_OFFERS_MOCK_JSON = require('./mocks/EventOffers.mock.json');

const EVENT_ID = 'vv1A8v8o8GAGBQsG';

const ON_SALE_FULL_STRING = getFormattedEventDate(new Date(EVENT_DETAIL_MOCK_JSON.sales.public.startDateTime)).full;
const EVENT_DATE_FULL_STRING = getFormattedEventDate(new Date(EVENT_DETAIL_MOCK_JSON.dates.start.dateTime)).full;

const FIRST_VENUE = EVENT_DETAIL_MOCK_JSON._embedded.venues[0];

describe('Event Details render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <EventDetails
        eventDetails={EVENT_DETAIL_MOCK_JSON}
        eventOffers={EVENT_OFFERS_MOCK_JSON}
        fetchEventDetails={new Function}
        fetchEventOffers={new Function}
        sortEventPrices={new Function}
        createCart={new Function}
        updateCart={new Function()}
        updateCartState={new Function()}
        updateOrdersState={new Function()}
        connectSocket={new Function()}
        params={{}} />
    );

    const eventDetails = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventDetails'
    );

    this.eventDetails = ReactDOM.findDOMNode(eventDetails);

    // locating list
    this.eventDetailsList = this.eventDetails.getElementsByClassName('eventDetails-list')[0];

    // locating name
    this.eventDetailsName = this.eventDetailsList.getElementsByClassName('eventDetails-name')[0];

    // locating info
    this.eventDetailsInfo = this.eventDetailsList.getElementsByClassName('eventDetails-info')[0];

    // locating image
    this.eventDetailsImage = this.eventDetailsList.getElementsByClassName('eventDetails-img')[0];

    // locating on sale info
    this.eventDetailsOnSaleStartDateTime = this.eventDetailsList.getElementsByClassName('eventDetails-onSaleStartDateTime')[0];

    // locating event date
    this.eventDetailsEventStartDateTime = this.eventDetailsList.getElementsByClassName('eventDetails-eventStartDateTime')[0];

    // locating venue
    this.eventDetailsVenue = this.eventDetailsList.getElementsByClassName('eventDetails-venue')[0];

    // locating price range component
    this.priceRanges = this.eventDetailsList.getElementsByClassName('priceRanges')[0];

    // locating attractions component
    this.attractions = this.eventDetailsList.getElementsByClassName('attractions')[0];

    // locating event offers
    const eventOffers = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'eventOffers'
    );

    this.eventOffers = ReactDOM.findDOMNode(eventOffers);
  });

  it('event details component exist', function() {
    expect(this.eventDetails).to.exist;
  });

  it(`event details component has data attribute value ${EVENT_ID}`, function() {
    expect(this.eventDetails.getAttribute('data-eventId')).to.equal(EVENT_ID);
  });

  it('event details list exist', function() {
    expect(this.eventDetailsList).to.exist;
  });

  it('event details name exist', function() {
    expect(this.eventDetailsName).to.exist;
  });

  it('event details name should be ' + EVENT_DETAIL_MOCK_JSON.name, function() {
    expect(this.eventDetailsName.textContent).to.equal(EVENT_DETAIL_MOCK_JSON.name);
  });

  it('event details info exist', function() {
    expect(this.eventDetailsInfo).to.exist;
  });

  it('event details info should match props', function() {
    expect(this.eventDetailsInfo.textContent).to.equal(EVENT_DETAIL_MOCK_JSON.info);
  });

  it('event details image exist', function() {
    expect(this.eventDetailsImage).to.exist;
  });

  it('event details image src url should be ' + EVENT_DETAIL_MOCK_JSON.images[3].url, function() {
    expect(this.eventDetailsImage.getAttribute('src')).to.equal(EVENT_DETAIL_MOCK_JSON.images[3].url);
  });

  it('event details on sale info exist', function() {
    expect(this.eventDetailsOnSaleStartDateTime).to.exist;
  });

  it(`event details on sale info should be ${ON_SALE_FULL_STRING}`, function() {
    expect(this.eventDetailsOnSaleStartDateTime.textContent).to.equal(ON_SALE_FULL_STRING);
  });

  it('event details event date exist', function() {
    expect(this.eventDetailsEventStartDateTime).to.exist;
  });

  it(`event details event date should be ${EVENT_DATE_FULL_STRING}`, function() {
    expect(this.eventDetailsEventStartDateTime.textContent).to.equal(EVENT_DATE_FULL_STRING);
  });

  it('event details venue exist', function() {
    expect(this.eventDetailsVenue).to.exist;
  });

  it(`event details venue should be "${FIRST_VENUE.name}, ${FIRST_VENUE.city.name} ${FIRST_VENUE.state.stateCode}"`, function() {
    expect(this.eventDetailsVenue.textContent).to.equal(`${FIRST_VENUE.name}, ${FIRST_VENUE.city.name} ${FIRST_VENUE.state.stateCode}`);
  });

  it('price range component exist', function() {
    expect(this.priceRanges).to.exist;
  });

  it('attractions component exist', function() {
    expect(this.attractions).to.exist;
  });

  it('event offers component exist', function() {
    expect(this.eventOffers).to.exist;
  });
});
