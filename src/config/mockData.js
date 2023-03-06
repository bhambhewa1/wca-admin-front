import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
export const drawerData = [
  {
    val: "Customers",
    isActive: false,
    src: <PeopleAltIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/customers",
  },
  {
    val: "Vehicles",
    isActive: false,
    src: <DirectionsCarFilledIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/vehicles",
  },
  {
    val: "Appointments",
    isActive: false,
    src: <EventAvailableIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/appointments",
  },
  {
    val: "Staff",
    isActive: false,
    src:<GroupsIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/staff",
  },
  {
    val: "Trucking companies",
    isActive: false,
    src: <LocalShippingIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/truckingcompanies",
  },
  {
    val: "Stores",
    isActive: false,
    src: <StorefrontIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/store",
  },
  {
    val: "Locations",
    isActive: false,
    src: <LocationOnIcon sx={{
      fontSize:'20px'
    }}/>,
    Routes: "/location",
  },
  { val: "Profile", 
  src: <PersonIcon sx={{
    fontSize:'20px'
  }}/>,
  Routes: "/profile" },
];

export const FILE_TYPE = {
  IMAGE: 1,
  GIF: 2,
  VIDEO: 3,
  AUDIO: 4,
};
