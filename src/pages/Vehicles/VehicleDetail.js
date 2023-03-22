import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CUSTOMERINFO, VEHICLEINFO } from "../../routes/constURL";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
//       {value === index && (
//         <Box>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: "#F15F23",
    fontSize: "14px",
    fontWeight: "400",

    "&.MuiTab-root.Mui-selected": {
      backgroundColor: "#F15F23",
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
        width: "50%",
      },
      color: "white",
      textTransform: "none",
      borderRadius: "5px",
    },
    "&.MuiButtonBase-root": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "14px",
        width: "50%",
      },
      backgroundColor: "#DDDDDD",
      color: "#3D2E57",
      textTransform: "none",
      borderRadius: "5px",
      marginRight: "40px",
    },
  },
}));

const VehicleDetail = () => {
  const classes = useStyles();
  const tabClasses = { root: classes.tab };
  const route = [VEHICLEINFO, CUSTOMERINFO];
  const location = useLocation();
  // const handleChangeTab = (event, newValue) => {
  //   setTabValue(newValue);
  // };
  return (
    <>
      <Typography sx={{ p: 1, fontSize: "18px", fontWeight: "600", borderBottom: "3px solid rgba(0, 0, 0, 0.06)" }}>
        Vehicle Details
      </Typography>
      <Box sx={{ borderColor: "divider", p: 1 }}>
        <Tabs
          value={location.pathname}
          indicatorColor="white"
          aria-label="basic tabs example"
          sx={{
            borderBottom: "none",
          }}>
          <Tab classes={tabClasses} label="Vehicle Information" value={route[0]} LinkComponent={Link} to={route[0]} />
          <Tab classes={tabClasses} label="Customer information" value={route[1]} LinkComponent={Link} to={route[1]} />
          <Tab classes={tabClasses} label="Documents upload" value={route[2]} LinkComponent={Link} to={route[2]} />
          <Tab classes={tabClasses} label="Loan Payoff" value={route[3]} LinkComponent={Link} to={route[3]} />
          <Tab classes={tabClasses} label="E-sign Document" value={route[4]} LinkComponent={Link} to={route[4]} />
          <Tab classes={tabClasses} label="Checks" value={route[5]} LinkComponent={Link} to={route[5]} />
          <Tab classes={tabClasses} label="Notes" value={route[6]} LinkComponent={Link} to={route[6]} />
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default VehicleDetail;
