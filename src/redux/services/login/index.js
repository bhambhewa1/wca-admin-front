import {Api} from '../../../config/request'

  export const requestLogin = async (data) => {
    return Api.PostRequest('/api/auth/login', data);
  };
const LoginAPI = {
    requestLogin,
    
  };
  export default LoginAPI