import {
  CLASSIFICATION_DETAILS_GET_REQUEST, CLASSIFICATION_DETAILS_GET_SUCCESS, CLASSIFICATION_DETAILS_GET_FAILURE
} from '../actions/classificationDetails';
import { parseClassificationDetails } from './parsers/classificationDetails';

export function classificationDetails(state = {}, action) {
  const { type, classificationId, req } = action;
  switch (type) {
  case CLASSIFICATION_DETAILS_GET_REQUEST:
  case CLASSIFICATION_DETAILS_GET_SUCCESS:
    const data = (req && req.data) ? parseClassificationDetails(req.data, classificationId) : null;
    return Object.assign({}, state, data);

  case CLASSIFICATION_DETAILS_GET_FAILURE:
    return state;
  default:
    return state;
  }
}
