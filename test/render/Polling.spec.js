import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Polling from "../../src/common/components/Polling";

const CLASSNAME = 'pollingIcon';
const ON_CLASSNAME = `${CLASSNAME} pollingIconOn`;

describe('Polling render', function() {

  before('render and locate element', function() {
    const renderedComponentOff = ReactTestUtils.renderIntoDocument(
      <Polling isOn={false} />
    );
    const renderedComponentOn = ReactTestUtils.renderIntoDocument(
      <Polling isOn={true} />
    );

    // locating component
    this.pollingOff = ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponentOff,
      CLASSNAME
    ));
    this.pollingOn = ReactDOM.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponentOn,
      CLASSNAME
    ));

  });

  it('polling off has right classname', function() {
    expect(this.pollingOff.className).to.equal(CLASSNAME);
  });

  it('polling on has right classnames', function() {
    expect(this.pollingOn.className).to.equal(ON_CLASSNAME);
  });
});
