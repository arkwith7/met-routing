import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'OCR_LOG_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'OCR_LOG_FORM_FIND_STARTED',
      });

      axios.get(`/ocr_log/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'OCR_LOG_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OCR_LOG_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/ocr_log'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'OCR_LOG_FORM_CREATE_STARTED',
      });

      axios.post('/ocr_log', { data: values }).then(res => {
        dispatch({
          type: 'OCR_LOG_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: 'Ocr_log created' });
        dispatch(push('/admin/ocr_log'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OCR_LOG_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'OCR_LOG_FORM_UPDATE_STARTED',
      });

      await axios.put(`/ocr_log/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'OCR_LOG_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'Profile updated' });
      } else {
        showSnackbar({ type: 'success', message: 'Ocr_log updated' });
        dispatch(push('/admin/ocr_log'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'OCR_LOG_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
