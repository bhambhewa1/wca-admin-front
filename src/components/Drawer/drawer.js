/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Index from "../../routes/index.js";
import { drawerData } from "../../config/mockData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Paper, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { styled } from "@mui/material/styles";
import { storage as LocalStorage, storage } from "../../config/storage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import "./drawer.css";
import Fade from "@mui/material/Fade";
import { UserContext } from "../../App.js";
import AlertDialog from "../Dialog/Dialog.js";
let drawerWidth = 280;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const PermanentDrawerRight = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  isMobile ? (drawerWidth = 80) : (drawerWidth = 280);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [openLogoutAlert, setOpenLogoutAlert] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [underProgress, setUnderProgress] = React.useState(false)
  const adminInfo = React.useContext(UserContext);
  const [first, setfirst] = React.useState();
  const [data, setData] = React.useState(drawerData);

  let URL = location.pathname;

  React.useEffect(() => {

    const trimmedURL = URL.slice(0, 6);
    data.map((item, index) => {
      let trimmedRoute = item?.Routes?.slice(0, 6);
      trimmedURL === trimmedRoute ? (item.isActive = true) : (item.isActive = false);
    });
    setData([...data]);
  }, [location.pathname, underProgress]);
  React.useEffect(() => {
    setfirst(adminInfo?.adminName);
  }, [adminInfo]);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const Logout = (index) => {
    setOpenLogoutAlert(true);
  };

  const logOutAdmin = () => {
    localStorage.clear();
    navigate("/");
  };
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ bgcolor: "#ffffff", display: "flex", boxShadow: "none", borderBottom: "3px solid rgba(0, 0, 0, 0.06)", pt: 2.5, pb: 2.5 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, color: "black" }}>
              <MenuIcon
                sx={{
                  fontSize: "35px",
                }}
              />
            </IconButton>
            <Box
              style={{
                // width: { xs: "42%", sm: "25%", md: "20%", lg: "15%" },
                width: "100%",
                // mr: { xs: 2, sm: 2, md: 2, lg: 8 },
                // p: "15px",
                // pr: 0,
                display: "flex",
                justifyContent: "flex-end",
              }}>
              <Link to={"/profile"} style={{ display: "flex", textDecoration: "none" }}>
                <Box
                  sx={{
                    border: 1,
                    borderRadius: "20px",
                    borderColor: "black",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <img
                    style={{
                      height: "21px",
                      width: "18px",
                      filter: "invert(100%)",
                    }}
                    alt="profile"
                    src={require("../../assests/profile.png")}
                  />
                </Box>
              </Link>
              <Typography component={"div"} sx={{ ml: "10px" }}>
                <Link to={"/profile"} style={{ display: "flex", textDecoration: "none" }}>
                  <Typography component={"div"} sx={{ color: "#3D2E57", lineHeight: "20px", fontSize: "14px", fontWeight: "700" }}>
                    {first?.n1} {first?.n2}
                  </Typography>
                </Link>
                <Typography component={"div"} sx={{ color: "#A8A8A8", fontSize: "12px", lineHeight: "15px" }}>
                  Store :
                  <Button
                    sx={{ textTransform: "none", color: "#A8A8A8", fontWeight: "600", mb: "2px", p: "0px", ml: "3px" }}
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    maryland
                    {openMenu ? <ArrowDropUpIcon sx={{ fontSize: "20px" }} /> : <ArrowDropDownIcon sx={{ fontSize: "20px" }} />}
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleClose}
                    TransitionComponent={Fade}>
                    <MenuItem onClick={handleClose}>Null</MenuItem>
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                  </Menu>
                </Typography>
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            minWidth: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "#0B2354",
            },
            ml: "auto",
            mr: "auto",
          }}
          variant="persistent"
          anchor="left"
          open={open}>
          <Box
            sx={{
              p: { xs: 1.8, sm: 3 },
              display: "flex",
              justifyContent: "space-between",
            }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
              }}>
              <Box>
                {isMobile && <img alt="logo" className="logoSize" src={require("../../assests/logo@2x.png")} style={{ width: "50px" }} />}
                {!isMobile && (
                  <img
                    alt="logo"
                    className="logoSize"
                    src={require("../../assests/logo@2x.png")}
                    style={{ width: "129px", height: "75px" }}
                  />
                )}
              </Box>
            </Link>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{ color: "#B2C1F0", display: { xs: "none", sm: "flex" } }}>
              <MenuIcon sx={{ fontSize: "35px" }} />
            </IconButton>
          </Box>

          <List
            sx={{
              "& .MuiListItemButton-root:hover": {
                // bgcolor: "white",
                borderRadius: "5px",
                fontWeight: "400",

                "&, & .MuiListItemIcon-root": {
                  // color: "#3D2E57",
                  fontWeight: "400",
                  borderRadius: "5px",
                },
              },
              p: { xs: "0px 3px 0px 3px", sm: "0px 20px 8px 20px" },
            }}>
            <Typography
              sx={{
                color: "#B2C1F0",
                opacity: 1,
                fontSize: { xs: "10px", sm: "24px" },
                fontWeight: 700,
                pb: 2,
                ml: { xs: 1.2, sm: 0 },
              }}>
              Dashboard
            </Typography>
            {data.map((text, index) => (
              <>
                {text.val === "Vehicles" && (
                  <List
                    sx={{
                      "&.MuiList-root": {
                        p: 0,
                      },
                    }}>
                    <ListItem
                      sx={{
                        color: "#B2C1F0",
                        bgcolor: text.isActive ? "#2B4C91" : "",
                        borderTop: "0.1px solid #B2C1F0",
                        borderRadius: text.isActive ? "5px" : "",
                        // mt: "10px",
                      }}
                      key={index}
                      disablePadding>
                      <Link className="drawerItemLinks" style={{ color: text.isActive ? "#fff" : "#B2C1F0" }} to={text.Routes}>
                        <ListItemIcon
                          sx={{
                            color: text.isActive ? "#fff" : "#B2C1F0",
                            // maxWidth: "22px",
                            // minWidth: "18px",
                            minWidth: "35px",
                          }}>
                          {text.src}
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            display: { xs: "none", sm: "flex" },
                          }}
                          primary={text.val}
                        />
                        <ArrowForwardIosIcon color="white" sx={{ ml: { xs: "0px", sm: "100px" }, fontSize: { xs: "12px", sm: "14px" } }} />
                      </Link>
                    </ListItem>
                    <Collapse in={text.isActive} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 6, color: "#B2C1F0", fontSize: "14px", width: "100%" }}>
                          <ListItemText sx={{ display: { xs: "none", sm: "flex" } }} primary="Sold and Unsold vehicles" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                )}
                {text.val !== "Vehicles" && (
                  <ListItem
                    sx={{
                      color: "#B2C1F0",
                      bgcolor: text.isActive ? "#2B4C91" : "",
                      borderRadius: text.isActive ? "5px" : "",
                      // borderBottom:'1px solid gray',
                      borderTop: "0.1px solid #B2C1F0",
                      // mt: "10px",
                    }}
                    key={index}
                    disablePadding>
                    <Link
                      className="drawerItemLinks"
                      style={{ color: text.isActive ? "#fff" : "#B2C1F0" }}
                      to={text.Routes}
                      onClick={() => (index === 4 ? Logout() : '')}>
                      <ListItemIcon
                        sx={{
                          color: text.isActive ? "#fff" : "#B2C1F0",
                          // width: "30px",
                          minWidth: "35px",
                          // mr: "30px",
                        }}>
                        {text.src}
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontWeight: "400",
                          fontSize: "16px",
                          display: { xs: "none", sm: "flex" },
                        }}
                        primary={text.val}
                      />
                    </Link>
                  </ListItem>
                )}
              </>
            ))}
          </List>
        </Drawer>
        <Box
          sx={{
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            pt: "110px",
            ml: open ? "auto" : "",
            bgcolor: "#f9fafe",
          }}>
          {location.pathname === '/vehicles/details/info' &&
            <Box sx={{ m: { xs: 1, sm: 2 } }}>
              <Index />
            </Box>
          }
          {location.pathname !== '/vehicles/details/info' &&
            <Item sx={{ m: { xs: 1, sm: 2 } }}>
              <Index />
            </Item>
           } 
        </Box>
        {/* {location.pathname === '/staff'||
        location.pathname === '/staff/update'||
         location.pathname==='/vehicles/negotiating'||
         location.pathname==='/customers'||
         location.pathname==='/customers/update'||
         location.pathname!=='/profile' &&
          <Dialog
            open={true}
            // onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle sx={{ fontSize: "18px", color: "#3D2E57" }} id="alert-dialog-title">
              This page is under progress
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#27AE60",
                  textTransform: "none",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#27AE60",
                  },
                }}
                onClick={() => navigate(-1)}>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        } */}
        <AlertDialog
          title={"Are you sure you want to logout"}
          open={openLogoutAlert}
          onClickButtonCancel={() => setOpenLogoutAlert(false)}
          onClickButton={() => logOutAdmin()}
        />
      </Box>
    </Box>
  );
};
export default PermanentDrawerRight;
