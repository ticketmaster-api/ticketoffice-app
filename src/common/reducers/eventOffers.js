import {
  EVENT_OFFERS_DETAILS_GET_REQUEST, EVENT_OFFERS_DETAILS_GET_SUCCESS, EVENT_OFFERS_DETAILS_GET_FAILURE,
  EVENT_PRICES_SORT, EVENT_PRICES_SORT_ASC, EVENT_PRICES_SORT_DSC
} from '../actions/eventOffers';
import { parseEventOffers } from './parsers/eventOffers';

export function eventOffers(state = {}, action) {
  const { type, req, direction } = action;

  switch (type) {
  case EVENT_OFFERS_DETAILS_GET_REQUEST:
  case EVENT_OFFERS_DETAILS_GET_SUCCESS:
    const data = (req && req.data) ? parseEventOffers(req.data) : null;
    return Object.assign({}, state, data);
  case EVENT_PRICES_SORT:
    let eventOffers;
    let sortDirection = direction;
    const pricesData = (state.prices && state.prices.data) || [];
    if (direction === EVENT_PRICES_SORT_ASC) {
      eventOffers = pricesData.sort(sortEventPricesAscHelper);
    } else if (direction === EVENT_PRICES_SORT_DSC) {
      eventOffers = pricesData.sort(sortEventPricesDscHelper);
    } else {
      eventOffers = Object.assign([], pricesData);
      sortDirection = EVENT_PRICES_SORT_ASC;
    }
    return Object.assign({}, state, {
      prices : {
        data: eventOffers,
        sortDirection
      }
    });
  case EVENT_OFFERS_DETAILS_GET_FAILURE:
    return {};
  default:
    return state;
  }
}

function substractHelper(x, y) {
  return parseFloat(x) - parseFloat(y);
}

function sortEventPricesAscHelper(a, b) {
  return substractHelper(a.attributes.value, b.attributes.value);
}


function sortEventPricesDscHelper(a, b) {
  return substractHelper(b.attributes.value, a.attributes.value);
}
