import { Box, Button, Grid, Menu, MenuItem, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import "./vehicles.css";
import {
  CUSTOMERINFO,
  VEHICLEINFO,
  VEHICLELOAN,
  DOCUMENTSUPLOAD,
  VEHICLEESINGDOCUMENT,
  VEHICLECHECKS,
  VEHICLENOTE,
} from "../../routes/constURL";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "none",
  fontSize: "12px",
  fontWeight: "600",
}));

const VehicleDetail = ({ getVehicleData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuButton, setMenuButton] = React.useState("Vehicle Information");
  const VINNUMBER = "1FM5K8D8XFGA24638";
  const vehicleData = [
    { text: "Vehicle Information", route: VEHICLEINFO },
    { text: "Customer information", route: CUSTOMERINFO },
    { text: "Documents upload", route: DOCUMENTSUPLOAD },
    { text: "Loan Payoff", route: VEHICLELOAN },
    { text: "E-sign Document", route: VEHICLEESINGDOCUMENT },
    { text: "Checks", route: VEHICLECHECKS },
    { text: "Notes", route: VEHICLENOTE },
  ];
  React.useEffect(() => {
    window.scrollTo(0, 0);
    // getVehicleData(data).then((res) => {
    //   console.log(res.data);
    // })
  }, []);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography sx={{ p: 1, fontSize: "18px", fontWeight: "600", borderBottom: "3px solid rgba(0, 0, 0, 0.06)" }}>
        Vehicle Details
      </Typography>
      <Grid container spacing={0}>
        <Grid sx={{ bgcolor: "#F5F9FA", boxShadow: "none" }} item xs={5} sm={6} lg={2} md={3} xl={1.5}>
          <Item sx={{ boxShadow: "none" }}>
            <img alt="carimage" className="carImage" src={require("../../assests/BMW2.jfif")} />
          </Item>
        </Grid>
        <Grid item xs={7} sm={6} md={9} lg={10} xl={10.5}>
          <Item
            sx={{
              boxShadow: "none",
              height: "100%",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              "&.MuiPaper-root": {
                textAlign: "left",
              },
            }}>
            <Typography sx={{ fontSize: { xs: "14px", sm: "20px", md: "30px" }, fontWeight: "800" }}>2014 BMW 520</Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.36)", fontSize: { xs: "12px", sm: "14px" } }}>{VINNUMBER}</Typography>
            <button
              className="copyButton"
              style={{ backgroundColor: "transparent", cursor: "pointer" }}
              onClick={() => navigator.clipboard.writeText(VINNUMBER)}>
              <FileCopyOutlinedIcon sx={{ mr: "5px" }} />
              Copy VIN
            </button>
          </Item>
        </Grid>
      </Grid>
      <Box sx={{ borderColor: "divider", p: 1, justifyContent: "flex-end", display: "flex" }}>
        <Grid sx={{ display: { xs: "none", sm: "flex" } }} container rowGap={"6px"} columnGap={"6px"}>
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
        <Button
          onClick={handleClick}
          disableTouchRipple
          disableRipple
          sx={{
            display: { xs: "flex", sm: "none" },
            bgcolor: "#F15F23",
            color: "white",
            textTransform: "none",
            fontSize: "12px",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "#F15F23",
            },
          }}>
          {menuButton}
          <ArrowDropDownIcon sx={{ fontSize: "20px" }} />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          // TransitionComponent={Fade}
        >
          {vehicleData.map((item, index) => (
            <MenuItem
              onClick={() => {
                navigate(item.route);
                handleClose();
                setMenuButton(item.text);
              }}>
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    // getVehicleData: (data) => dispatch(getVehicleData(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleDetail);
