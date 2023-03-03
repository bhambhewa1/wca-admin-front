export const drawerData = [
  {
    val: "Customers",
    isActive: false,
    src: require("../assests/profile.png"),
    Routes: "/profile",
  },
  {
    val: "Vehicles",
    isActive: false,
    // src: require("../assets/greeting.png"),
    Routes: "/greeting/categories",
  },
  {
    val: "Appointments",
    isActive: false,
    // src: require("../assets/egift.png"),
    Routes: "/e-giftcards/list",
  },
  {
    val: "Staff",
    isActive: false,
    // src: require("../assets/gift.png"),
    Routes: "/giftcards",
  },
  {
    val: "Trucking companies",
    isActive: false,
    // src: require("../assets/users.png"),
    Routes: "/Users",
  },
  {
    val: "Stores",
    isActive: false,
    // src: require("../assets/orders.png"),
    Routes: "/orders/list",
  },
  {
    val: "Locations",
    isActive: false,

    // src: require("../assets/setting.png"),
    Routes: "/configurations",
  },
  { val: "Profile", 
  // src: require("../assets/logout.png"), 
  Routes: "" },
];

export const FILE_TYPE = {
  IMAGE: 1,
  GIF: 2,
  VIDEO: 3,
  AUDIO: 4,
};
