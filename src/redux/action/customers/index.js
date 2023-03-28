import { toast } from "react-toastify";
import CustomerApi from "../../services/customers";

export const getCustomerdata = (data) => async (dispatch) => {
    try {
      let response = await CustomerApi.requestCustomerdata(data);
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
  export const updateCustomer = (data) => async (dispatch) => {
    try {
      let response = await CustomerApi.requestupdateCustomer(data);
      if (response.data.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        response?.data?.errors?.map((item) => {
          return toast.error(item);
        });
        return response;
      }
    } catch (err) {
      return err;
    }
  };
  export const getCustomerList = (data) => async (dispatch) => {
    try {
      let response = await CustomerApi.requestCustomerList(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };
  export const deleteCustomer = (data) => async (dispatch) => {
    try {
      let response = await CustomerApi.requestdeleteCustomer(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };