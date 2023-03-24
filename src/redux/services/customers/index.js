import {Api} from '../../../config/request'
export const requestCustomerdata = async (data) => {
      return Api.PostRequest('/api/staff/edit', data);
  };
  export const requestupdateCustomer = async (data) => {
    return Api.PostRequest('/api/staff/create', data);
  };
  export const requestCustomerList = async (data) => {
    return Api.PostRequest('/api/staff/list', data);
  };
  export const requestdeleteCustomer = async (data) => {
    return Api.PostRequest('/api/staff/delete', data);
  };
const StaffApi = {
    requestCustomerdata,
    requestupdateCustomer,
    requestCustomerList,
    requestdeleteCustomer
  };
  export default CustomerApi;