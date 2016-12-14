import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import SearchPage from "../../src/common/containers/SearchPage";
import { Provider } from 'react-redux';
import configureStore from '../../src/common/store/configureStore';

describe('Search behaviour', function() {

  before('render and locate element', function() {
    const store = configureStore({});

    const renderedComponent = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );

    const searchComponent = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'search'
    );

    this.searchComponent = ReactDOM.findDOMNode(searchComponent);

    const typeSelector = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'search__type-selector'
    );

    this.typeSelector = ReactDOM.findDOMNode(typeSelector);

    const inputElement = ReactTestUtils.findRenderedDOMComponentWithClass(
      renderedComponent,
      'search__input'
    );

    this.inputElement = ReactDOM.findDOMNode(inputElement);
  });

  it('search component exist', function() {
    expect(this.searchComponent).to.exist;
  });

  it('search type selector exist', function() {
    expect(this.typeSelector).to.exist;
  });

  it('search input box exist', function() {
    expect(this.inputElement).to.exist;
  });
});
