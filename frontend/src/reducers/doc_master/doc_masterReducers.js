import list from 'reducers/doc_master/doc_masterListReducers';
import form from 'reducers/doc_master/doc_masterFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
