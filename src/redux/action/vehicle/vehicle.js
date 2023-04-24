import { toast } from "react-toastify";
import VehicleApi from "../../services/vehicles";

export const getVehicleData = (data) => async (dispatch) => {
  try {
    let response = await VehicleApi.requestVehicleData(data);
    if (response.status) {
      // dispatch(userdata(response.data));
      return response;
    } else {
      response?.data?.errors?.map((item) => {
        return toast.error(item);
      });
      return response;
    }
  } catch (err) {}
};
export const getVehiclesList = (data) => async (dispatch) => {
  try {
    let response = await VehicleApi.requestVehiclesList(data);
    if (response.status) {
      // dispatch(userdata(response.data));
      return response;
    } else {
      response?.data?.errors?.map((item) => {
        return toast.error(item);
      });
      return response;
    }
  } catch (err) {}
};
export const addVIN = (data) => async (dispatch) => {
  try {
    let response = await VehicleApi.requestAddVIN(data);
    if (response.status) {
      // dispatch(userdata(response.data));
      return response;
    } else {
      response?.data?.errors?.map((item) => {
        return toast.error(item);
      });
      return response;
    }
  }
  catch{
    
  }
}
export const MarketCheck = () => async (dispatch) => {
  try {
    let response = await VehicleApi.requestMarketCheck();
    // if (response.status) {
    //   // dispatch(userdata(response.data));
    //   return response;
    // } else {
    //   response?.data?.errors?.map((item) => {
    //     return toast.error(item);
    //   });
    //   return response;
    // }
  } catch (err) {
  }
};
  export const localMarket = (data) => async (dispatch) => {
    try {
      let response = await VehicleApi.requestlocalMarket(data);
      if (response.status) {
        // dispatch(userdata(response.data));
        return response;
      } else {
        response?.data?.errors?.map((item) => {
          return toast.error(item);
        });
        return response;
      }
    } catch (err) {
    }
};
export const deleteVehicleItem = (data) => async (dispatch) => {
  try {
    let response = await VehicleApi.requestDeleteVIN(data);
    if (response.status) {
      // dispatch(userdata(response.data));
      return response;
    } else {
      response?.data?.errors?.map((item) => {
        return toast.error(item);
      });
      return response;
    }
  } catch (err) {}
};
export const editVehicleItem = (data) => async (dispatch) => {
  try {
    let response = await VehicleApi.requestEditVIN(data);
    if (response.status) {
      // dispatch(userdata(response.data));
      return response;
    } else {
      response?.data?.errors?.map((item) => {
        return toast.error(item);
      });
      return response;
    }
  } catch (err) {}
};
