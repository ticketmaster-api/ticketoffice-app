import React from 'react';
import { expect } from 'chai';

import * as SearchActions from '../../src/common/actions/search';
import configureStore from '../../src/common/store/configureStore';

describe('Search State', function() {

  before('get the store', function() {
    const store = configureStore({});
    this.store = store;
  });

  it('initial selectedSearch state is events', function() {
    expect(this.store.getState().selectedSearch).to.equal('events');
  });

  it('changes selectedSearch state to venues', function() {
    this.store.dispatch(SearchActions.selectSearch('venues'));
    expect(this.store.getState().selectedSearch).to.equal('venues');
  });

  it('changes selectedSearch state to artists', function() {
    this.store.dispatch(SearchActions.selectSearch('artists'));
    expect(this.store.getState().selectedSearch).to.equal('artists');
  });
});
