import { CUSTOMERLIST } from "./constURL";
import { VEHICLESLIST } from "./constURL";
import { APPOINTMENTLIST } from "./constURL";
import { TRUCKINGCOMPANIESLIST } from "./constURL";
import { STORELIST } from "./constURL";
import { STAFFLIST } from "./constURL";
import { LOCATIONLIST } from "./constURL";
import { PROFILE } from "./constURL";
import { VEHICLEDETAIL } from "./constURL";
import { LOGIN } from "./constURL";
import { SOLDANDUNSOLDVEHICLES } from "./constURL";
import { STAFFADD } from "./constURL";

import TruckingCompaniesList from "../pages/TruckingCompanies/TruckingCompaniesList";
import  VehicleList  from "../pages/Vehicles/VehicleList";
import AppointmentList  from "../pages/Appointments/AppointmentsList";
import  StaffList  from "../pages/Staff/StaffList";
import  StoreList  from '../pages/Store/StoreList'
import  LocationList  from '../pages/Location/LocationList'
import  ProfilePage from '../pages/Profile/Profile'
import CustomersList from '../pages/Customers/CustomersList'
import Login from "../pages/Login/Login";
import VehicleDetail from "../pages/Vehicles/VehicleDetail";
import SoldandUnsoldVehicles from "../pages/Vehicles/SoldandUnsoldVehicles";
import StaffForm from "../pages/Staff/StaffForm"; 
export const globalRoutes = [
    {
      path: LOGIN,
      element: Login
    },
    {
      path: CUSTOMERLIST,
      element: CustomersList,
    },
    {
      path: VEHICLESLIST,
      element: VehicleList,
    },
    {
      path: APPOINTMENTLIST,
      element: AppointmentList,
    }, 
    {
      path: STAFFLIST,
      element: StaffList,
    },
    {
      path: TRUCKINGCOMPANIESLIST,
      element: TruckingCompaniesList,
    }, 
    {
      path: STORELIST,
      element: StoreList,
    }, 
    {
      path: LOCATIONLIST,
      element: LocationList,
    },
    {
      path: PROFILE,
      element: ProfilePage,
    },
    {
      path: VEHICLEDETAIL,
      element: VehicleDetail,
    },
    {
      path: SOLDANDUNSOLDVEHICLES,
      element: SoldandUnsoldVehicles,
    },
    {
      path: STAFFADD,
      element: StaffForm,
    },
]