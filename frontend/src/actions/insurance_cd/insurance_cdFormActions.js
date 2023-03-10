import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'INSURANCE_CD_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'INSURANCE_CD_FORM_FIND_STARTED',
      });

      axios.get(`/insurance_cd/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'INSURANCE_CD_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INSURANCE_CD_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/insurance_cd'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'INSURANCE_CD_FORM_CREATE_STARTED',
      });

      axios.post('/insurance_cd', { data: values }).then(res => {
        dispatch({
          type: 'INSURANCE_CD_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: '수가코드정보가 생성되었습니다.' });
        dispatch(push('/admin/insurance_cd'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INSURANCE_CD_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'INSURANCE_CD_FORM_UPDATE_STARTED',
      });

      await axios.put(`/insurance_cd/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'INSURANCE_CD_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'My Info.가 수정되었습니다.' });
      } else {
        showSnackbar({ type: 'success', message: '수가코드정보가 수정되었습니다.' });
        dispatch(push('/admin/insurance_cd'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'INSURANCE_CD_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
