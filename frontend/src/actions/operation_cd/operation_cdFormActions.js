import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'OPERATION_CD_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPERATION_CD_FORM_FIND_STARTED',
      });

      axios.get(`/operation_cd/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'OPERATION_CD_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPERATION_CD_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/operation_cd'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'OPERATION_CD_FORM_CREATE_STARTED',
      });

      axios.post('/operation_cd', { data: values }).then(res => {
        dispatch({
          type: 'OPERATION_CD_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Operation_cd created' });
        dispatch(push('/admin/operation_cd'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPERATION_CD_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'OPERATION_CD_FORM_UPDATE_STARTED',
      });

      await axios.put(`/operation_cd/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'OPERATION_CD_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Operation_cd updated' });
        dispatch(push('/admin/operation_cd'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OPERATION_CD_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
