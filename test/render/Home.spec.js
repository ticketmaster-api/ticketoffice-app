import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sinon from 'sinon';

import Home from "../../src/common/components/Home";
import { DEFAULT_LAT, DEFAULT_LONG } from "../../src/common/actions/search";

describe('Home render', function() {

  before('render and locate element', function() {
    this.searchCurrentEvents = (advance, lat, long) => {};
    sinon.stub(this, 'searchCurrentEvents');

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Home
        currentEvents={[]}
        searchCurrentEvents={this.searchCurrentEvents} />
    );

    const homeComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'home'
    );

    this.homeComponent = ReactDOM.findDOMNode(homeComponent);
  });

  it('home component exist', function() {
    expect(this.homeComponent).to.exist;
  });

  it(`searchCurrentEvents() called with { lat: ${DEFAULT_LAT}, long: ${DEFAULT_LONG} }`, function() {
    sinon.assert.calledWith(
      this.searchCurrentEvents,
      {
        lat: DEFAULT_LAT,
        long: DEFAULT_LONG
      }
    );
  });
});
