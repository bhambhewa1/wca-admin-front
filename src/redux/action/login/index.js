import { toast } from "react-toastify";
import LoginAPI from "../../services/login";

export const getLogin = (data) => async (dispatch) => {
    try {
      let response = await LoginAPI.requestLogin(data);
  
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