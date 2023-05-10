import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/styles";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
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
import { editVehicleItem } from "../../redux/action/vehicle/vehicle";
import { storage } from "../../config/storage";
import LoaderComponent from "../../components/Loader/LoaderComponent";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
import CloseIcon from "@mui/icons-material/Close";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
  border: "none",
  boxShadow: "2px",
  fontSize: "12px",
  fontWeight: "600",
}));

const VehicleDetail = ({ getVehicleData, editVehicleItem }) => {
  const location = useLocation();
  // let data = location.state;
  const id = useParams();
  let vehicle_id = id.id ? id.id : storage.fetch.vehicleId();
  let data = { vehicles_id: id.id };
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [vehicData, setVehicleData] = React.useState();
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [menuButton, setMenuButton] = React.useState("Vehicle Information");
  const vehicleData = [
    {
      text: "Vehicle Information",
      route: `/vehicles/details/info/${vehicle_id}`,
    },
    { text: "MDA", route: `/vehicles/details/mda/${vehicle_id}` },
    // { text: "Customer information", route: CUSTOMERINFO },
    // { text: "Documents upload", route: DOCUMENTSUPLOAD },
    // { text: "Loan Payoff", route: VEHICLELOAN },
    // { text: "E-sign Document", route: VEHICLEESINGDOCUMENT },
    // { text: "Checks", route: VEHICLECHECKS },
    // { text: "Notes", route: VEHICLENOTE },
  ];

  const carName =
    vehicleData?.make === undefined
      ? ""
      : [
          `${vehicData?.year + " "} `,
          `${vehicData?.make + " "}`,
          `${vehicData?.model + " "}`,
        ];
  const heading = vehicData?.heading ? vehicData?.heading : carName;
  React.useEffect(() => {
    storage.set.vehicleId(id.id);
    window.scrollTo(0, 0);
    setLoading(true);
    editVehicleItem(data).then((res) => {
      if (res?.data?.status) {
        setLoading(false);
        setVehicleData(res?.data?.data);
      } else {
        setLoading(false);
      }
    });
  }, []);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const Item1 = styled(Paper)(({ theme }) => ({
  //   // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   // padding: theme.spacing(1),
  //   textAlign: "left",
  //   color: theme.palette.text.secondary,
  // }));
  const handleSelected = (index) => {
    vehicData?.photo_links.map((item, ind) => {
      if (ind === index) {
        setSelected(ind);
      }
    });
  };
  console.log(selected);
  return (
    <>
      <Item sx={{}}>
        <Typography
          sx={{ p: 1, fontSize: "18px", fontWeight: "600", textAlign: "left" }}
        >
          Vehicle Details
        </Typography>
      </Item>
      <Grid
        container
        spacing={0}
        sx={{ bgcolor: "#F5F9FA", boxShadow: "none", mt: 2 }}
      >
        <Grid sx={{ bgcolor: "#F5F9FA", boxShadow: "none" }}>
          <Item
            sx={{ boxShadow: "none", bgcolor: "#F5F9FA", cursor: "pointer" }}
          >
            {loading ? (
              <Skeleton
                sx={{ height: "170px", width: "120px", borderRadius: "100%" }}
              />
            ) : (
              // {/* <input
              //   style={{ padding: "17px 12px" }}
              //   type="file"
              //   // name="pcImg"
              //   // accept="image/png, image/gif, image/jpeg"
              //   // onChange={handlePersonliseImg}
              // > */}
              // {/* </input> */}
              <img
                alt="carimage"
                className="carImage"
                src={vehicData?.photo_links[selected]?.image_url}
                onClick={() => setOpen(true)}
              />
            )}
          </Item>
          <Dialog open={open}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
                
              }}
            >
              <CloseIcon
                sx={{ width: "30px", height: "30px",cursor: "pointer" }}
                onClick={() => setOpen(false)}
              />
            </Box>
            <DialogContent
              sx={{
                width: "500px",
                height: "500px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                bgcolor: "white",
              }}
            >
              {vehicData?.photo_links.map((link, index) => (
                <>
                  <Grid sx={{}}>
                    {console.log(vehicData.photo_links)}
                    <img
                      width="180px"
                      height="180px"
                      src={link.image_url}
                      style={{
                        border: index === selected ? "2px solid blue" : "",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSelected(index)}
                    />
                  </Grid>
                </>
              ))}
              <Grid
                sx={{
                  border: "1px dashed #1976d2",
                  width: "180px",
                  height: "180px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{ width: "150px", height: "150px" }}
                >
                  <input hidden accept="image/*" type="file" />
                  <AddIcon sx={{ width: "150px", height: "150px" }} />
                </IconButton>
              </Grid>
            </DialogContent>
          </Dialog>
          <LoaderComponent open={loading} />
        </Grid>
        <Grid>
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
              bgcolor: "#F5F9FA",
              ml: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "20px", md: "30px" },
                fontWeight: "800",
                display: "flex",
              }}
            >
              {loading && <Skeleton sx={{ width: "300px", height: "60px" }} />}
              <Typography sx={{ mr: "10px" }}>
                {heading === undefined ? "" : heading}
              </Typography>
            </Typography>
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.36)",
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "700",
              }}
            >
              {typeof vehicData != "undefined" ? (
                vehicData?.vin
              ) : (
                <Skeleton sx={{ width: "100px", height: "30px" }} />
              )}
            </Typography>
            <button
              className="copyButton"
              style={{
                backgroundColor: "transparent",
                cursor: "pointer",
                border: "0.5px solid rgba(0, 0, 0, 0.10)",
                minWidth: "100px",
              }}
              onClick={() => {
                navigator.clipboard.writeText(vehicData?.vin);
                toast.success("Copied VIN");
              }}
            >
              <FileCopyOutlinedIcon sx={{ mr: "5px" }} />
              Copy VIN
            </button>
          </Item>
          <Toastify />
        </Grid>
      </Grid>
      <Box
        sx={{
          borderColor: "divider",
          p: 1,
          justifyContent: "flex-end",
          display: "flex",
          bgcolor: "white",
        }}
      >
        <Grid
          sx={{ display: { xs: "none", sm: "flex" } }}
          container
          rowGap={"6px"}
          columnGap={"6px"}
        >
          {vehicleData.map((item, index) => (
            <Grid item flex={"1 1 auto"}>
              <Link style={{ textDecoration: "none" }} to={item.route}>
                <Item
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: item.route === location.pathname ? "white" : "#000",
                    bgcolor:
                      item.route === location.pathname ? "#F15F23" : "#DDDDDD",
                    boxShadow: "none",
                  }}
                >
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
          }}
        >
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
              }}
            >
              {item.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box>
        <Outlet context={[vehicData, setVehicleData]} />
      </Box>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    editVehicleItem: (data) => dispatch(editVehicleItem(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleDetail);
