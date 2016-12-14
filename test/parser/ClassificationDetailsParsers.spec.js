import { expect } from 'chai';

import * as ClassificationDetailsParser from "../../src/common/reducers/parsers/classificationDetails";

const CLASSIFICATION_DETAILS_RAW_MOCK_JSON = require('./mocks/ClassificationDetailsRaw.mock.json');
const CLASSIFICATION_DETAILS_MOCK_JSON = require('../render/mocks/ClassificationDetails.mock.json');

const CLASSIFICATION_ID = CLASSIFICATION_DETAILS_MOCK_JSON.segment._embedded.genres[0].id;

describe('Classification details parser', function() {

  before('parsing raw data', function() {
    this.parsedData = ClassificationDetailsParser.parseClassificationDetails(CLASSIFICATION_DETAILS_RAW_MOCK_JSON, CLASSIFICATION_ID);
  });

  it('parsed data should matched', function() {
    expect(this.parsedData).to.deep.equal(CLASSIFICATION_DETAILS_MOCK_JSON);
  });
});
