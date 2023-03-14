import {Api} from '../../../config/request'
export const requestuserdata = async (data) => {
      return Api.PostRequest('/api/profile', data);
  };
  export const requestupdateuser = async (data) => {
    console.log(data);
    return Api.PostRequest('/api/update/profile', data);
  };
const ProfileApi = {
    requestuserdata,
    requestupdateuser,
    
  };
  export default ProfileApi;