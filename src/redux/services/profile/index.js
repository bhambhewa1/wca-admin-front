import { Api } from "../../../config/request";
export const requestuserdata = async (data) => {
  console.log(data);
  return Api.PostRequest("/api/staff/edit", data);
};
export const requestupdateuser = async (data) => {
  return Api.PostRequest("/api/staff/create", data);
};
const ProfileApi = {
  requestuserdata,
  requestupdateuser,
};
export default ProfileApi;
