import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupsIcon from "@mui/icons-material/Groups";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
export const drawerData = [
  {
    val: "Customers",
    isActive: false,
    src: (
      <PeopleAltIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/customers",
  },
  {
    val: "Vehicles",
    isActive: false,
    src: (
      <DirectionsCarFilledIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/vehicles/negotiating",
  },
  {
    val: "Appointments",
    isActive: false,
    src: (
      <EventAvailableIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/appointments",
  },
  {
    val: "Staff",
    isActive: false,
    src: (
      <GroupsIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/staff",
  },
  {
    val: "Trucking companies",
    isActive: false,
    src: (
      <LocalShippingIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/truckingcompanies",
  },
  {
    val: "Stores",
    isActive: false,
    src: (
      <StorefrontIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/store",
  },
  {
    val: "Locations",
    isActive: false,
    src: (
      <LocationOnIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/location",
  },
  {
    val: "Profile",
    src: (
      <PersonIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: "/profile",
  },
  {
    val: "Logout",
    src: (
      <LogoutIcon
        sx={{
          fontSize: "20px",
        }}
      />
    ),
    Routes: null,
  },
];
export const EsignDocumentData = [
  {
    val: "Title Back",
    isActive: true,
    // Routes: "/customers",
  },
  {
    val: "Purchase Agreement",
    isActive: false,
    // Routes: "/vehicles/negotiating",
  },
  {
    val: "Odometer Disclosure",
    isActive: false,
    // Routes: "/appointments",
  },
  {
    val: "Power of Attorney",
    isActive: false,
    // Routes: "/staff",
  },
  {
    val: "Affidavit of Fact",
    isActive: false,
    // Routes: "/truckingcompanies",
  },
  {
    val: "Dealer payoff",
    isActive: false,
    // Routes: "/store",
  },
  {
    val: "Privacy Policy",
    isActive: false,
    // Routes: "/location",
  },
  {
    val: "Tag return receipt",
    // Routes: "/profile",
  },
  {
    val: "Plate refund",
    Routes: null,
  },
  {
    val: "Key Picture",
    Routes: null,
  },
];
export const FILE_TYPE = {
  IMAGE: 1,
  GIF: 2,
  VIDEO: 3,
  AUDIO: 4,
};
