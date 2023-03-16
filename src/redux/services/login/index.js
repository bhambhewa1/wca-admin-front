import {Api} from '../../../config/request'

  export const requestLogin = async (data) => {
    return Api.apiRequest('/api/auth/login', data);
  };
const LoginAPI = {
    requestLogin,
  };
  export default LoginAPI