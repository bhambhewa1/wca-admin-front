import { toast } from "react-toastify";
import ProfileApi from "../../services/profile";

export const getuserdata = (data) => async (dispatch) => {
    try {
      let response = await ProfileApi.requestuserdata(data);
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
  export const updateUser = (data) => async (dispatch) => {
    try {
      let response = await ProfileApi.requestupdateuser(data);
  
      if (response.status) {
        // dispatch(updateuser(response.data.user_details));
        return response;
      } else {
        return response;
      }
    } catch (err) {
    }
  };