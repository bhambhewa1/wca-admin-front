import {
  VEHICLENOTE,
  VEHICLESNEGOTIATING,
  VEHICLECHECKS,
  VEHICLEESINGDOCUMENT,
  VEHICLELOAN,
  VEHICLESPURCHASED,
  CUSTOMERUPDATE,
  MDA,
} from "./constURL";
import { CUSTOMERINFO, CUSTOMERLIST, DOCUMENTSUPLOAD, VEHICLEINFO } from "./constURL";
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
import { CONFIGURATION } from "./constURL";

import TruckingCompaniesList from "../pages/TruckingCompanies/TruckingCompaniesList";
import VehicleList from "../pages/Vehicles/VehicleList";
import AppointmentList from "../pages/Appointments/AppointmentsList";
import StaffList from "../pages/Staff/StaffList";
import StoreList from "../pages/Store/StoreList";
import LocationList from "../pages/Location/LocationList";
import ProfilePage from "../pages/Profile/Profile";
import CustomersList from "../pages/Customers/CustomersList";
import Login from "../pages/Login/Login";
import VehicleDetail from "../pages/Vehicles/VehicleDetail";
import SoldandUnsoldVehicles from "../pages/Vehicles/SoldandUnsoldVehicles";
import StaffForm from "../pages/Staff/StaffForm";
import ProtectedRoute from "./protectedRoutes";
import VehicleInformation from "../pages/Vehicles/VehicleInformation/VehicleInformation";
import CustomerInfo from "../pages/Vehicles/CustomerInfo";
import VehicleLoan from "../pages/Vehicles/VehicleLoan";
import DocumentsUpload from "../pages/Vehicles/DocumentsUpload";
import CustomerForm from "../pages/Customers/CustomerForm";
import EsignDocument from "../pages/Vehicles/EsignDocument";
import Checks from "../pages/Vehicles/Checks";
import Notes from "../pages/Vehicles/Notes";
import OpenRoutes from "./openRoutes";
import Configuration from "../pages/Vehicles/Configuration";
import MarketData from "../pages/Vehicles/MarketData";

export const globalRoutes = [
  {
    path: LOGIN,
    element: Login,
    routeType: OpenRoutes,
  },
  {
    path: CUSTOMERLIST,
    element: CustomersList,
    routeType: ProtectedRoute,
  },
  {
    path: CUSTOMERUPDATE,
    element: CustomerForm,
    routeType: ProtectedRoute,
  },
  {
    path: VEHICLESNEGOTIATING,
    element: VehicleList,
    routeType: ProtectedRoute,
  },
  {
    path: VEHICLESPURCHASED,
    element: VehicleList,
    routeType: ProtectedRoute,
  },

  {
    path: APPOINTMENTLIST,
    element: AppointmentList,
    routeType: ProtectedRoute,
  },
  {
    path: STAFFLIST,
    element: StaffList,
    routeType: ProtectedRoute,
  },
  {
    path: TRUCKINGCOMPANIESLIST,
    element: TruckingCompaniesList,
    routeType: ProtectedRoute,
  },
  {
    path: STORELIST,
    element: StoreList,
    routeType: ProtectedRoute,
  },
  {
    path: LOCATIONLIST,
    element: LocationList,
    routeType: ProtectedRoute,
  },
  {
    path: PROFILE,
    element: ProfilePage,
    routeType: ProtectedRoute,
  },
  {
    path: VEHICLEDETAIL,
    element: VehicleDetail,
    routeType: ProtectedRoute,
    child: [
      {
        path: VEHICLEINFO,
        element: VehicleInformation,
      },
      {
        path: MDA,
        element: MarketData,
      },
      {
        path: CUSTOMERINFO,
        element: CustomerInfo,
      },
      {
        path: VEHICLELOAN,
        element: VehicleLoan,
      },
      {
        path: DOCUMENTSUPLOAD,
        element: DocumentsUpload,
      },
      {
        path: VEHICLEESINGDOCUMENT,
        element: EsignDocument,
        routeType: ProtectedRoute,
      },
      {
        path: VEHICLECHECKS,
        element: Checks,
        routeType: ProtectedRoute,
      },
      {
        path: VEHICLENOTE,
        element: Notes,
        routeType: ProtectedRoute,
      },
      
    ],
  },
  {
    path: SOLDANDUNSOLDVEHICLES,
    element: SoldandUnsoldVehicles,
    routeType: ProtectedRoute,
  },
  {
    path: STAFFADD,
    element: StaffForm,
    routeType: ProtectedRoute,
  },
  {
    path: CONFIGURATION,
    element: Configuration,
    routeType: ProtectedRoute,
  },
];
