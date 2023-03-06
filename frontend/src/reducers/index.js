
import auth from 'reducers/auth';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import users from 'reducers/users/usersReducers';

import doc_master from 'reducers/doc_master/doc_masterReducers';

import doc_extraction_items from 'reducers/doc_extraction_items/doc_extraction_itemsReducers';

import disease_cd from 'reducers/disease_cd/disease_cdReducers';

import operation_cd from 'reducers/operation_cd/operation_cdReducers';

import insurance_cd from 'reducers/insurance_cd/insurance_cdReducers';

import ocr_log from 'reducers/ocr_log/ocr_logReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,

    users,

    doc_master,

    doc_extraction_items,

    disease_cd,

    operation_cd,

    insurance_cd,

    ocr_log,

  });

