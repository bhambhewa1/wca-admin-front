import {Api} from '../../../config/request'
export const requestVehicleData = async (data) => {
      return Api.PostRequest('/api/blackbook/usedcar', data);
  };
  export const requestVehiclesList = async (data) => {
    // return Api.PostRequest('/api/', data);
};
export const requestAddVIN = async (data) => {
  console.log(data);
  // return Api.PostRequest('/api/', data);
};
const VehicleApi = {
  requestVehicleData,
  requestVehiclesList,
  requestAddVIN
  };
  export default VehicleApi;