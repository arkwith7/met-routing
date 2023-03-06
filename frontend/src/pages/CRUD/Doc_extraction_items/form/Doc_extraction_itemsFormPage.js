import React, { useState, useEffect } from 'react';
import Doc_extraction_itemsForm from 'pages/CRUD/Doc_extraction_items/form/Doc_extraction_itemsForm';
import { push } from 'connected-react-router';
import actions from 'actions/doc_extraction_items/doc_extraction_itemsFormActions';
import { connect } from 'react-redux';

const Doc_extraction_itemsFormPage = (props) => {

  const {
    dispatch,
    match,
    saveLoading,
    findLoading,
    record,
    currentUser
  } = props;

  const [dispatched, setDispatched] = useState(false);

  const isEditing = () => {
    return !!match.params.id;
  };

  const isProfile = () => {
    return match.url === '/app/profile';
  };

  const doSubmit = (id, data) => {
    if (isEditing() || isProfile()) {
      dispatch(actions.doUpdate(id, data, isProfile()))
    } else {
      dispatch(actions.doCreate(data))
    }
  };

  useEffect(() => {
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    } else {
      if (isProfile()) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const currentUserId = currentUser.user.id;
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew())
      }
    }
    setDispatched(true);
  }, [match, dispatch])

  return (
    <React.Fragment>
      {dispatched && (
        <Doc_extraction_itemsForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        currentUser={currentUser}
        record={(isEditing() || isProfile()) ? record : {}}
        isEditing={isEditing()}
        isProfile={isProfile()}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/admin/doc_extraction_items'))}
        />
        )}
    </React.Fragment>
  );
}

function mapStateToProps(store) {
  return {
    findLoading: store.doc_extraction_items.form.findLoading,
    saveLoading: store.doc_extraction_items.form.saveLoading,
    record: store.doc_extraction_items.form.record,
    currentUser: store.auth.currentUser,
  };
}

export default connect(mapStateToProps)(Doc_extraction_itemsFormPage);
