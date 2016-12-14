import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import AttractionDetails from "../../src/common/components/AttractionDetails";

const CURRENT_EVENTS_MOCK_JSON = require('./mocks/CurrentEvents.mock.json');
const ATTRACTION_DETAIL_MOCK_JSON = require('./mocks/AttractionDetails.mock.json');
const FIRST_CLASSIFICATIONS = ATTRACTION_DETAIL_MOCK_JSON.classifications[0];
const SEGMENT_NAME = FIRST_CLASSIFICATIONS.segment.name;
const GENRE_NAME = FIRST_CLASSIFICATIONS.genre.name;
const SUB_GENGRE_NAME = FIRST_CLASSIFICATIONS.subGenre.name;

describe('Attraction Details render', function() {

  before('render and locate element', function() {
    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <AttractionDetails
        currentEvents={CURRENT_EVENTS_MOCK_JSON}
        attractionDetails={ATTRACTION_DETAIL_MOCK_JSON}
        params={{}}
        fetchAttractionDetails={new Function()}
        searchCurrentEvents={new Function()} />
    );

    // locating list
    const attractionDetails = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'attractionDetails'
    );

    this.attractionDetails = ReactDOM.findDOMNode(attractionDetails);

    // locating list
    this.attractionDetailsList = this.attractionDetails.getElementsByClassName('attractionDetails-list')[0];

    // locating name
    this.attractionDetailsName = this.attractionDetailsList.getElementsByClassName('attractionDetails-name')[0];

    // locating segment
    this.attractionDetailsSegment = this.attractionDetailsList.getElementsByClassName('attractionDetails-segment')[0];

    // locating genre
    this.attractionDetailsGenre = this.attractionDetailsList.getElementsByClassName('attractionDetails-genre')[0];

    // locating sub genre
    this.attractionDetailsSubGenre = this.attractionDetailsList.getElementsByClassName('attractionDetails-subGenre')[0];

    // locating image
    this.attractionDetailsImage = this.attractionDetailsList.getElementsByClassName('attractionDetails-img')[0];

    // locating current event list
    this.attractionCurrentEventsList = this.attractionDetails.getElementsByClassName('currentEvents-list')[0];
  });

  it('attraction details component exist', function() {
    expect(this.attractionDetailsList).to.exist;
  });

  it('attraction details name exist', function() {
    expect(this.attractionDetailsName).to.exist;
  });

  it('attraction details name should be ' + ATTRACTION_DETAIL_MOCK_JSON.name, function() {
    expect(this.attractionDetailsName.textContent).to.equal(ATTRACTION_DETAIL_MOCK_JSON.name);
  });

  it('attraction details segment exist', function() {
    expect(this.attractionDetailsSegment).to.exist;
  });

  it(`attraction details segment should be ${SEGMENT_NAME}`, function() {
    expect(this.attractionDetailsSegment.textContent).to.equal(SEGMENT_NAME);
  });

  it('attraction details genre exist', function() {
    expect(this.attractionDetailsGenre).to.exist;
  });

  it(`attraction details genre should be ${GENRE_NAME}`, function() {
    expect(this.attractionDetailsGenre.textContent).to.equal(GENRE_NAME);
  });

  it('attraction details sub genre exist', function() {
    expect(this.attractionDetailsSubGenre).to.exist;
  });

  it(`attraction details sub genre should be ${SUB_GENGRE_NAME}`, function() {
    expect(this.attractionDetailsSubGenre.textContent).to.equal(SUB_GENGRE_NAME);
  });

  it('attraction details image exist', function() {
    expect(this.attractionDetailsImage).to.exist;
  });

  it('attraction details image src url should be ' + ATTRACTION_DETAIL_MOCK_JSON.images[8].url, function() {
    expect(this.attractionDetailsImage.getAttribute('src')).to.equal(ATTRACTION_DETAIL_MOCK_JSON.images[8].url);
  });

  it('attraction current events list component exist', function() {
    expect(this.attractionCurrentEventsList).to.exist;
  });
});
