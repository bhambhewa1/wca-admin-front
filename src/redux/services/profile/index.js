import {Api} from '../../../config/request'
export const requestuserdata = async (data) => {
    return Api.PostRequest('/admin/profile', data);
  };
  export const requestupdateuser = async (data) => {
    return Api.PostRequest('/admin/update/profile', data);
  };
const ProfileApi = {
    requestuserdata,
    requestupdateuser,
    
  };
  export default ProfileApi;