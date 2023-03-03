import { Customerslist } from "./constURL";
import { Vechicleslist } from "./constURL";
import { Appointmentlist } from "./constURL";
import { truckingCompanieslist } from "./constURL";
import { Storelist } from "./constURL";
import { Stafflist } from "./constURL";
import { Locationlist } from "./constURL";
import { Profile } from "./constURL";

import TruckingCompaniesList from "../pages/TruckingCompanies/TruckingCompaniesList";
import  VehicleList  from "../pages/Vehicles/VehicleList";
import AppointmentList  from "../pages/Appointments/AppointmentsList";
import  StaffList  from "../pages/Staff/StaffList";
import  StoreList  from '../pages/Store/StoreList'
import  LocationList  from '../pages/Location/LocationList'
import  ProfilePage from '../pages/Profile/Profile'
import CustomersList from '../pages/Customers/CustomersList'
export const globalRoutes = [
    {
      path: Customerslist,
      element: CustomersList,
    },
    {
      path: Vechicleslist,
      element: VehicleList,
    },
    {
      path: Appointmentlist,
      element: AppointmentList,
    }, 
    {
      path: Stafflist,
      element: StaffList,
    },
    {
      path: truckingCompanieslist,
      element: TruckingCompaniesList,
    }, 
    {
      path: Storelist,
      element: StoreList,
    }, 
    {
      path: Locationlist,
      element: LocationList,
    },
    {
      path: Profile,
      element: ProfilePage,
    },
]