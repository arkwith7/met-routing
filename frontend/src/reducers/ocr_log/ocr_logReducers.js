import list from 'reducers/ocr_log/ocr_logListReducers';
import form from 'reducers/ocr_log/ocr_logFormReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
});
