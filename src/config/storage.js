/* eslint-disable no-useless-concat */
const LS_KEY = {
  auth_token: "jwt_access_token",
  admin_first_name: "admin_firstname",
  admin_last_name: "admin_lastname",
  user: "User",
  user_id: "User_id",
  staff_id: "staff_id",
  vehicle_id: "vehicle_id",
};

const set = {
  authToken: (data) => {
    localStorage.setItem(LS_KEY.auth_token, "Bearer" + " " + data);
  },
  adminfirstname: (data) => {
    localStorage.setItem(LS_KEY.admin_first_name, data);
  },
  adminlastname: (data) => {
    localStorage.setItem(LS_KEY.admin_last_name, data);
  },
  user: (data) => {
    localStorage.setItem(LS_KEY.user, JSON.stringify(data));
  },
  vehicleId: (data) => {
    localStorage.setItem(LS_KEY.vehicle_id, data);
  },
  staffId: (data) => {
    localStorage.setItem(LS_KEY.staff_id, data);
  },
};

const fetch = {
  authToken: () => {
    const data = localStorage.getItem(LS_KEY.auth_token);
    if (data) {
      try {
        const decoded = data;
        return decoded;
      } catch (err) {}
    }
  },
  vehicleId: () => {
    const data = localStorage.getItem(LS_KEY.vehicle_id);
    if (data) {
      try {
        const decoded = data;
        return decoded;
      } catch (err) {}
    }
  },
  staffId: () => {
    const data = localStorage.getItem(LS_KEY.staff_id);
    if (data) {
      try {
        const decoded = data;
        return decoded;
      } catch (err) {}
    }
  },
  adminfirstname: () => {
    const data = localStorage.getItem(LS_KEY.admin_first_name);
    if (data) {
      try {
        return data;
      } catch (err) {}
    }
  },
  adminlastname: () => {
    const data = localStorage.getItem(LS_KEY.admin_last_name);
    if (data) {
      try {
        const decoded = data;
        return decoded;
      } catch (err) {}
    }
  },
  user: () => {
    const data = JSON.parse(localStorage.getItem(LS_KEY.user));
    if (data) {
      try {
        const decoded = data;
        return decoded;
      } catch (err) {}
    }
  },
  // userId: () => {
  //   return localStorage.getItem(LS_KEY.user_id);
  // },
};

const destroy = {
  authToken: () => {
    localStorage.removeItem(LS_KEY.auth_token);
  },
  adminfirstname: (data) => {
    localStorage.removeItem(LS_KEY.admin_first_name, data);
  },
  adminlastname: (data) => {
    localStorage.removeItem(LS_KEY.admin_last_name, data);
  },
};

export const storage = {
  set,
  fetch,
  destroy,
};
