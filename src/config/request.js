import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "./apiUrl";
import { storage } from "./storage";

// if there is a video/audio/photo/anymedia then use "Content-Type": "multipart/form-data", otherwise "Content-Type": "application/json",

export const apiRequest = async (url, data, contentTypeJson = false) => {
  Object.assign(data, { user_type: 1 });

  if (data)
    try {
      const res = await axios({
        url: API_URL + url,
        method: "POST",
        data,
        // body:JSON.stringify(data),
        headers: {
          "Content-Type": `${contentTypeJson} === 'application/json': 'multipart/form-data'`,
          Accept: "application/json",
          Authorization: storage.fetch.authToken(),
        },
      });
      if (res.data.code == 401) {
        toast.error("Token is expired. Please login again");
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/";
        }, 2000);
      } else {
        return res ? res : res.data;
      }
    } catch (err) {
      // toast.error("some error occured");
    }
};

export const PostRequest = async (url, data) => {
  try {
    const res = await axios({
      url: API_URL + url,
      method: "POST",
      data,
      // body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: storage.fetch.authToken(),
      },
    });
    if (res.data.code == 401) {
      toast.error("Token is expired. Please login again");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 2000);
    } else if (res.data.code == 406) {
      toast.error("Your staff id is expire , Please login again");
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/";
      }, 2000);
    } else {
      return res ? res : res.data;
    }
  } catch (err) {
    // toast.error("some error occured");
  }
};

export const Api = {
  apiRequest,
  PostRequest,
};
