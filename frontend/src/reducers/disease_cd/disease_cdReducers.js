import list from 'reducers/disease_cd/disease_cdListReducers';
import form from 'reducers/disease_cd/disease_cdFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
