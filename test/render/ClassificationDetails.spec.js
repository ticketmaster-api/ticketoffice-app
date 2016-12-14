import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

import ClassificationDetails from "../../src/common/components/ClassificationDetails";

const CURRENT_EVENTS_MOCK_JSON = require('./mocks/CurrentEvents.mock.json');
const CLASSIFICATION_DETAILS_MOCK_JSON = require('./mocks/ClassificationDetails.mock.json');
import { DEFAULT_LAT, DEFAULT_LONG } from "../../src/common/actions/search";

const CLASSIFICATION_ID = CLASSIFICATION_DETAILS_MOCK_JSON.segment._embedded.genres[0].id;
const PAGE_GET_PARAMS = {
  classificationId: CLASSIFICATION_ID
};

describe('Classification Details render', function() {

  before('render and locate element', function() {
    this.fetchClassificationDetails = (params) => {};
    sinon.stub(this, 'fetchClassificationDetails');

    this.searchCurrentEvents = (advance, lat, long, classificationId) => {};
    sinon.stub(this, 'searchCurrentEvents');

    const COMPONENT_PROPS = {
      currentEvents: CURRENT_EVENTS_MOCK_JSON,
      classificationDetails: CLASSIFICATION_DETAILS_MOCK_JSON,
      params: PAGE_GET_PARAMS,
      fetchClassificationDetails: this.fetchClassificationDetails,
      searchCurrentEvents: this.searchCurrentEvents,
      lat: DEFAULT_LAT,
      long:DEFAULT_LONG
    };

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <ClassificationDetails {...COMPONENT_PROPS} />
    );

    // locating component
    const classificationDetailsComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'classificationDetails'
    );

    this.classificationDetailsComponent = ReactDOM.findDOMNode(classificationDetailsComponent);

    // locating heading
    this.classificationDetailsHeading = this.classificationDetailsComponent.getElementsByClassName('classificationDetails-heading')[0];
  });

  it('classification details component exist', function() {
    expect(this.classificationDetailsComponent).to.exist;
  });

  it(`fetchClassificationDetails() called with ${JSON.stringify(PAGE_GET_PARAMS)}`, function() {
    sinon.assert.calledWith(
      this.fetchClassificationDetails,
      PAGE_GET_PARAMS
    );
  });

  it(`searchCurrentEvents() called with { classificationId: "${CLASSIFICATION_ID}", lat: ${DEFAULT_LAT}, long: ${DEFAULT_LONG} }'`, function() {
    sinon.assert.calledWith(
      this.searchCurrentEvents,
      {
        classificationId: CLASSIFICATION_ID,
        lat: DEFAULT_LAT,
        long: DEFAULT_LONG
      }
    );
  });

  it(`classification details heading should be 'Current Events for ${CLASSIFICATION_DETAILS_MOCK_JSON.classificationName}'`, function() {
    expect(this.classificationDetailsHeading.textContent).to.equal(`Current Events for ${CLASSIFICATION_DETAILS_MOCK_JSON.classificationName}`);
  });

});
