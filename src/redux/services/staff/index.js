import {Api} from '../../../config/request'
export const requeststaffdata = async (data) => {
      return Api.PostRequest('/api/staff/edit', data);
  };
  export const requestupdateStaff = async (data) => {
    console.log(data);
    return Api.PostRequest('/api/staff/create', data);
  };
  export const requestStaffList = async (data) => {
    console.log(data);
    return Api.PostRequest('/api/staff/list', data);
  };
  export const requestdeleteStaff = async (data) => {
    console.log(data);
    return Api.PostRequest('/api/staff/delete', data);
  };
const StaffApi = {
    requeststaffdata,
    requestupdateStaff,
    requestStaffList,
    requestdeleteStaff
  };
  export default StaffApi;