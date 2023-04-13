import {Api} from '../../../config/request'
export const requestVehicleData = async (data) => {
      return Api.PostRequest('/api/blackbook/usedcar', data);
  };
  export const requestVehiclesList = async (data) => {
    return Api.PostRequest('/api/vehicles/list', data);
};
export const requestAddVIN = async (data) => {
  return Api.PostRequest('/api/vehicles/add', data);
};
export const requestlocalMarket = async (data) => {
  return Api.PostRequest('/api/localMarket', data);
};
const VehicleApi = {
  requestVehicleData,
  requestVehiclesList,
  requestAddVIN,
  requestlocalMarket
  };
  export default VehicleApi;