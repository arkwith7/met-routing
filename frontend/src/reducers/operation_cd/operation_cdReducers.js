import list from 'reducers/operation_cd/operation_cdListReducers';
import form from 'reducers/operation_cd/operation_cdFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
