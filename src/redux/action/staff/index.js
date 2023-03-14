import { toast } from "react-toastify";
import StaffApi from "../../services/staff";

export const getstaffdata = (data) => async (dispatch) => {
    try {
      let response = await StaffApi.requeststaffdata(data);
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
  export const updateStaff = (data) => async (dispatch) => {
    try {
      let response = await StaffApi.requestupdateStaff(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };
  export const getStaffList = (data) => async (dispatch) => {
    try {
      let response = await StaffApi.requestStaffList(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };
  export const deleteStaff = (data) => async (dispatch) => {
    try {
      let response = await StaffApi.requestdeleteStaff(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };