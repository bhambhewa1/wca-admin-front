import { Api } from "../../../config/request";
export const requestVehicleData = async (data) => {
  return Api.PostRequest("/api/blackbook/usedcar", data);
};
export const requestVehiclesList = async (data) => {
  return Api.PostRequest("/api/vehicles/list", data);
};
export const requestAddVIN = async (data) => {
  return Api.PostRequest("/api/vehicles/add", data);
};
export const requestDeleteVIN = async (data) => {
  return Api.PostRequest("/api/vehicles/delete", data);
};
export const requestEditVIN = async (data) => {
  return Api.PostRequest("/api/vehilces/edit", data);
};
export const requestlocalMarket = async (data) => {
  return Api.PostRequest('/api/localMarket', data);
};
export const requestMarketCheck = async () => {
  // return Api.PostRequest('/api/localMarket', data);
};
export const requestaddImg = async (data) => {
  return Api.PostRequest('/api/vehicles/uploadimages', data);
};
const VehicleApi = {
  requestVehicleData,
  requestVehiclesList,
  requestAddVIN,
  requestlocalMarket,
  requestDeleteVIN,
  requestEditVIN,
  requestMarketCheck,
  requestaddImg
  };
  export default VehicleApi;
  
