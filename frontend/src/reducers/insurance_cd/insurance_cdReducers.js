import list from 'reducers/insurance_cd/insurance_cdListReducers';
import form from 'reducers/insurance_cd/insurance_cdFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
