import axios from 'axios';
import getToken from 'utils/getToken';

/** @type {AxiosInstance} */
const apiClient = axios.create();

// apiClient.defaults.headers = {};
apiClient.defaults.headers.token = getToken();

export default apiClient;
