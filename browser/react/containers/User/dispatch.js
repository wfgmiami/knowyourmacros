import api from 'utilities/api';
import getToken from 'utilities/getToken';
import { getUser, getUserFail, getUserSuccess } from './actions';

export const getUserDispatch = () => async (dispatch) => {
  try {
    await dispatch(getUser());
    const token = await getToken();
    if (!token) {
      throw new Error('No local storage token');
    } else {
      api.defaults.headers.token = token;
      const { data } = await api.get(`/api/session/${token}`);
      await dispatch(getUserSuccess(data));
    }
  } catch (err) {
    await dispatch(getUserFail(err));
  }
};
