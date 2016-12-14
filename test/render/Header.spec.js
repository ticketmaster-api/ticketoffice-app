import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Header from "../../src/common/components/Header";
import { Provider } from 'react-redux';
import configureStore from '../../src/common/store/configureStore';

describe('Header render', function() {

  before('render and locate element', function() {
    const store = configureStore({});

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // locating logo
    const header = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'header'
    );

    this.header = ReactDOM.findDOMNode(header);

    // locating logo
    this.logo = this.header.getElementsByClassName('event-header__tm-link')[0];

    // locating navigation
    this.navigation = this.header.getElementsByClassName('navigation')[0];

    // locating search
    this.search = this.header.getElementsByClassName('search')[0];

    // locating login
    this.login = this.header.getElementsByClassName('login')[0];
  });

  it('header component exist', function() {
    expect(this.header).to.exist;
  });

  it('logo exist', function() {
    expect(this.logo).to.exist;
  });

  it('navigation exist', function() {
    expect(this.navigation).to.exist;
  });

  it('search exist', function() {
    expect(this.search).to.exist;
  });

  it('login exist', function() {
    expect(this.login).to.exist;
  });
});
