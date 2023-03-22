import { Box, Button, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { makeStyles, styled } from "@mui/styles";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CUSTOMERINFO, DOCUMENTSUPLOAD, VEHICLEINFO } from "../../routes/constURL";
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

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#F5F9FA" : "#F5F9FA",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "none",
}));

const VehicleDetail = () => {
  const location = useLocation();
  const vehicleData = [
    { text: "Vehicle Information", route: VEHICLEINFO },
    { text: "Customer information", route: CUSTOMERINFO },
    { text: "Documents upload", route: DOCUMENTSUPLOAD },
    { text: "Loan Payoff" },
    { text: "E-sign Document" },
    { text: "Checks" },
    { text: "Notes" },
  ];
  return (
    <>
      <Typography sx={{ p: 1, fontSize: "18px", fontWeight: "600", borderBottom: "3px solid rgba(0, 0, 0, 0.06)" }}>
        Vehicle Details
      </Typography>
      <Grid container spacing={0}>
        <Grid sx={{ bgcolor: "#F5F9FA", boxShadow: "none" }} item xs={7} sm={6} lg={2} md={3} xl={1.5}>
          <Item sx={{ boxShadow: "none" }}>
            <img
              alt="carimage"
              style={{
                width: "130px",
                height: "130px",
                // top: "234px",
                // left: "400px",
                borderRadius: "100%",
              }}
              src={require("../../assests/BMW2.jfif")}
            />
          </Item>
        </Grid>
        <Grid item xs={5} sm={6} md={9} lg={10} xl={10.5}>
          <Item
            sx={{
              boxShadow: "none",
              height: "100%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}>
            <Typography sx={{ fontSize: { xs: "14px", sm: "20px", md: "30px" }, fontWeight: "800" }}>2014 BMW 520</Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.36)", fontSize: { xs: "10px", sm: "14px", md: "16px" } }}>
              1FM5K8D8XFGA24638
            </Typography>
            <Button
              sx={{
                color: "#000",
                border: "1px solid rgba(0, 0, 0, 0.16)",
                width: { xs: "100%", sm: "50%", md: "20%", lg: "15%" },
                pt: 0.5,
                pb: 0.5,
              }}>
              Copy VIN
            </Button>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ borderColor: "divider", p: 1 }}>
        <Grid sx={{}} container rowGap={"6px"} columnGap={"6px"}>
          {vehicleData.map((item, index) => (
            <Grid item flex={"1 1 auto"}>
              <Link style={{ textDecoration: "none" }} to={item.route}>
                <Item
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: item.route === location.pathname ? "white" : "#000",
                    bgcolor: item.route === location.pathname ? "#F15F23" : "#DDDDDD",
                    boxShadow: "none",
                  }}>
                  {item.text}
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};

export default VehicleDetail;
