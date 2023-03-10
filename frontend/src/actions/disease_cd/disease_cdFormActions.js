import axios from 'axios';
import Errors from 'components/FormItems/error/errors';
import { push } from 'connected-react-router';
import { doInit } from 'actions/auth';
import { showSnackbar } from '../../components/Snackbar';

const actions = {
  doNew: () => {
    return {
      type: 'DISEASE_CD_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: 'DISEASE_CD_FORM_FIND_STARTED',
      });

      axios.get(`/disease_cd/${id}`).then(res => {
        const record = res.data;

        dispatch({
          type: 'DISEASE_CD_FORM_FIND_SUCCESS',
          payload: record,
        });
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DISEASE_CD_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/disease_cd'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'DISEASE_CD_FORM_CREATE_STARTED',
      });

      axios.post('/disease_cd', { data: values }).then(res => {
        dispatch({
          type: 'DISEASE_CD_FORM_CREATE_SUCCESS',
        });
        showSnackbar({ type: 'success', message: '질병코드정보가 생성되었습니다.' });
        dispatch(push('/admin/disease_cd'));
      })
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DISEASE_CD_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: 'DISEASE_CD_FORM_UPDATE_STARTED',
      });

      await axios.put(`/disease_cd/${id}`, {id, data: values});

      dispatch(doInit());

      dispatch({
        type: 'DISEASE_CD_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        showSnackbar({ type: 'success', message: 'My Info.가 수정되었습니다.' });
      } else {
        showSnackbar({ type: 'success', message: '질병코드정보가 수정되었습니다.' });
        dispatch(push('/admin/disease_cd'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'DISEASE_CD_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
