import list from 'reducers/doc_extraction_items/doc_extraction_itemsListReducers';
import form from 'reducers/doc_extraction_items/doc_extraction_itemsFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
