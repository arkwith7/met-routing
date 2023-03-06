import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'DOC_MASTER_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'DOC_MASTER_FORM_FIND_STARTED',
      });

      axios.get(`/doc_master/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'DOC_MASTER_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DOC_MASTER_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/doc_master'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'DOC_MASTER_FORM_CREATE_STARTED',
      });

      axios.post('/doc_master', { data: values }).then(res => {
        dispatch({
          type: 'DOC_MASTER_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Doc_master created' });
        dispatch(push('/admin/doc_master'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DOC_MASTER_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'DOC_MASTER_FORM_UPDATE_STARTED',
      });

      await axios.put(`/doc_master/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'DOC_MASTER_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Doc_master updated' });
        dispatch(push('/admin/doc_master'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DOC_MASTER_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
