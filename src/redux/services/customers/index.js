import {Api} from '../../../config/request'
export const requestCustomerdata = async (data) => {
      return Api.PostRequest('/api/user/edit', data);
  };
  export const requestupdateCustomer = async (data) => {
    return Api.PostRequest('/api/user/create', data);
  };
  export const requestCustomerList = async (data) => {
    return Api.PostRequest('/api/user/list', data);
  };
  export const requestdeleteCustomer = async (data) => {
    return Api.PostRequest('/api/user/delete', data);
  };
const CustomerApi = {
    requestCustomerdata,
    requestupdateCustomer,
    requestCustomerList,
    requestdeleteCustomer
  };
  export default CustomerApi;