import {Api} from '../../../config/request'
// export const requeststaffdata = async (data) => {
//       return Api.PostRequest('/api/staff/edit', data);
//   };
//   export const requestupdateStaff = async (data) => {
//     return Api.PostRequest('/api/staff/create', data);
//   };
  export const requestAppointmentList = async (data) => {
    // return Api.PostRequest('/api/staff/list', data);
  };
  export const requestdeleteAppointment = async (data) => {
    // return Api.PostRequest('/api/staff/delete', data);
  };
const AppointmentApi = {
    // requeststaffdata,
    // requestupdateStaff,
    requestAppointmentList,
    requestdeleteAppointment
  };
  export default AppointmentApi;