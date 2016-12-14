import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import VenueDetails from "../../src/common/components/VenueDetails";

const VENUE_DETAIL_MOCK_JSON = require('./mocks/VenueDetails.mock.json');
const CURRENT_EVENTS_MOCK_JSON = require('./mocks/CurrentEvents.mock.json');

describe('Venue Details render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <VenueDetails
        venueDetails={VENUE_DETAIL_MOCK_JSON}
        currentEvents={CURRENT_EVENTS_MOCK_JSON}
        params={{}}
        fetchVenueDetails={new Function()}
        searchCurrentEvents={new Function()} />
    );

    // locating component
    const venueDetails = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'venueDetails'
    );

    this.venueDetails = ReactDOM.findDOMNode(venueDetails);

    // locating list
    this.venueDetailsList = this.venueDetails.getElementsByClassName('venueDetails-list')[0];

    // locating name
    this.venueDetailsName = this.venueDetailsList.getElementsByClassName('venueDetails-name')[0];

    // locating image
    this.venueDetailsImage = this.venueDetailsList.getElementsByClassName('venueDetails-image')[0];

    // locating address
    this.venueDetailsAddress = this.venueDetailsList.getElementsByClassName('venueDetails-address')[0];

    // locating city
    this.venueDetailsCity = this.venueDetailsList.getElementsByClassName('venueDetails-city')[0];

    // locating state
    this.venueDetailsState = this.venueDetailsList.getElementsByClassName('venueDetails-state')[0];

    // locating postal code
    this.venueDetailsPostalcode = this.venueDetailsList.getElementsByClassName('venueDetails-postalcode')[0];

    // locating country
    this.venueDetailsCountry = this.venueDetailsList.getElementsByClassName('venueDetails-country')[0];

    // locating current event list
    this.venueCurrentEventsList = this.venueDetails.getElementsByClassName('currentEvents-list')[0];
  });

  it('venue details component exist', function() {
    expect(this.venueDetailsList).to.exist;
  });

  it('venue details name exist', function() {
    expect(this.venueDetailsName).to.exist;
  });

  it('venue details name should be ' + VENUE_DETAIL_MOCK_JSON.name, function() {
    expect(this.venueDetailsName.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.name);
  });

  it('venue details image exist', function() {
    expect(this.venueDetailsImage).to.exist;
  });

  it(`venue details image should be ${VENUE_DETAIL_MOCK_JSON.images[0].url}`, function() {
    expect(this.venueDetailsImage.getAttribute('src')).to.equal(VENUE_DETAIL_MOCK_JSON.images[0].url);
  });

  it('venue details address exist', function() {
    expect(this.venueDetailsAddress).to.exist;
  });

  it('venue details address should be ' + VENUE_DETAIL_MOCK_JSON.address.line1, function() {
    expect(this.venueDetailsAddress.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.address.line1);
  });

  it('venue details city exist', function() {
    expect(this.venueDetailsCity).to.exist;
  });

  it('venue details city should be ' + VENUE_DETAIL_MOCK_JSON.city.name, function() {
    expect(this.venueDetailsCity.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.city.name);
  });

  it('venue details state exist', function() {
    expect(this.venueDetailsState).to.exist;
  });

  it('venue details state should be ' + VENUE_DETAIL_MOCK_JSON.state.stateCode, function() {
    expect(this.venueDetailsState.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.state.stateCode);
  });

  it('venue details postal code exist', function() {
    expect(this.venueDetailsPostalcode).to.exist;
  });

  it('venue details postal code should be ' + VENUE_DETAIL_MOCK_JSON.postalCode, function() {
    expect(this.venueDetailsPostalcode.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.postalCode);
  });

  it('venue details country exist', function() {
    expect(this.venueDetailsCountry).to.exist;
  });

  it('venue details country should be ' + VENUE_DETAIL_MOCK_JSON.country.name, function() {
    expect(this.venueDetailsCountry.textContent).to.equal(VENUE_DETAIL_MOCK_JSON.country.name);
  });

  it('venue current events list component exist', function() {
    expect(this.venueCurrentEventsList).to.exist;
  });
});
