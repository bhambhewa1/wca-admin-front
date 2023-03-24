import {Api} from '../../../config/request'
export const requeststaffdata = async (data) => {
      return Api.PostRequest('/api/staff/edit', data);
  };
  export const requestupdateStaff = async (data) => {
    return Api.PostRequest('/api/staff/create', data);
  };
  export const requestCustomerList = async (data) => {
    return Api.PostRequest('/api/user/list', data);
  };
  export const requestdeleteStaff = async (data) => {
    return Api.PostRequest('/api/staff/delete', data);
  };
const CustomerApi = {
    requeststaffdata,
    requestupdateStaff,
    requestCustomerList,
    requestdeleteStaff
  };
  export default CustomerApi;