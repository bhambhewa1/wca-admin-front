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
import { Collapse, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { UserContext } from "../../App";
import { storage as LocalStorage } from "../../config/storage";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
let drawerWidth = 280;

const PermanentDrawerRight = () => {
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // isMobile ? (drawerWidth = 80) : (drawerWidth = 240);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const adminInfo = React.useContext(UserContext);
  const [first, setfirst] = React.useState();
  const [data, setData] = React.useState(drawerData);

  let URL = location.pathname;

  React.useEffect(() => {
    const trimmedURL = URL.slice(0, 6);
    data.map((item, index) => {
      let trimmedRoute = item.Routes.slice(0, 6);
      trimmedURL === trimmedRoute
        ? (item.isActive = true)
        : (item.isActive = false);
    });
    setData([...data]);
  }, [location.pathname]);
  React.useEffect(() => {
    setfirst(adminInfo?.adminName);
  }, [adminInfo]);
  const redirect = (redirect) => {
    if (redirect) {
      navigate(redirect);
    } else {
    }
  };
  const handleClick = () => {
    setOpen(!open);
  }
  // const logOutAdmin = () => {
  //   LocalStorage.destroy.authToken();
  //   LocalStorage.destroy.adminfirstname();
  //   LocalStorage.destroy.adminlastname();
  //   navigate("/");
  // };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ bgcolor: "#ffffff", display: "flex", alignItems: "flex-end" }}
        >
          <ListItemButton
            onClick={() => navigate('/profile')}
            sx={{
              // width: { xs: "42%", sm: "25%", md: "20%", lg: "15%" },
              // minWidth: "15%",
              mr: { xs: 2, sm: 2, md: 2, lg: 8 },
              p: "15px",
              pr: 0,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                border: 1,
                borderRadius: "20px",
                borderColor: "black",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            <Typography component={"div"} sx={{ ml: "10px", height: "40px" }}>
              <Typography
                component={"div"}
                sx={{ color: "#3D2E57", lineHeight: "20px", fontSize: "18px" }}
              >
                {first?.n1} {first?.n2}
              </Typography>
              <Typography
                component={"div"}
                sx={{ color: "#A8A8A8", fontSize: "16px", lineHeight: "15px" }}
              >
                {"Admin"}
              </Typography>
            </Typography>
          </ListItemButton>
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
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              pt: 5,
              p: 2,
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
              }}
            >
              <Box>
                {/* {isMobile && (
                  <img
                    alt="logo"
                    className="logoSize"
                    style={{ width: "50px" }}
                  />
                )} */}
                {/* {!isMobile && ( */}
                <img
                  alt="logo"
                  className="logoSize"
                  src={require('../../assests/logo@2x.png')}
                  style={{ width: "129px", height: "83px" }}
                />
                {/* )} */}
              </Box>
            </Link>
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
              p: "8px",
            }}
          >
            <Typography sx={{
              color: "#B2C1F0",
              opacity: 1,
              fontSize: '24px',
              fontWeight: 700
            }}>Dashboard</Typography>
            {data.map((text, index) => (
              <>
                {text.val === "Vehicles" &&
                  <List>
                    <ListItem
                      sx={{
                        color: "white",
                        bgcolor: text.isActive ? "#2B4C9" : "",
                        borderRadius: "5px",
                        mt: "10px",
                      }}
                      key={index}
                      disablePadding
                    >
                      <ListItemButton onClick={() => {
                        redirect(text.Routes)
                        handleClick()
                      }}>
                        <ListItemIcon
                          sx={{
                            color: "white",
                            maxWidth: "22px",
                            minWidth: "18px",
                            mr: "30px",
                          }}
                        >
                          <img
                            alt="Icon"
                            src={text.src}
                            style={{
                              width: "100%",
                              // filter: text.isActive ? "invert(100%)" : "",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            fontWeight: "400",
                            fontSize: "18px",
                            display: { xs: "none", sm: "flex" },
                          }}
                          primary={text.val}
                        />
                            < ArrowForwardIosIcon color="white" />

                      </ListItemButton>

                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 5 , color:'white',fontSize:'18px'}}>
                          <ListItemText primary="Sold and Unsold vehicles" />
                        </ListItemButton>
                      </List>
                    </Collapse>
                  </List>
                }
                {text.val !== "Vehicles" &&
                  <ListItem
                    sx={{
                      color: "white",
                      bgcolor: text.isActive ? "#2B4C9" : "",
                      borderRadius: "5px",
                      mt: "10px",
                    }}
                    key={index}
                    disablePadding
                  >
                    <ListItemButton onClick={() => redirect(text.Routes)}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                          maxWidth: "22px",
                          minWidth: "18px",
                          mr: "30px",
                        }}
                      >
                        <img
                          alt="Icon"
                          src={text.src}
                          style={{
                            width: "100%",
                            // filter: text.isActive ? "invert(100%)" : "",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          fontWeight: "400",
                          fontSize: "18px",
                          display: { xs: "none", sm: "flex" },
                        }}
                        primary={text.val}
                      />
                    </ListItemButton>
                  </ListItem>
                }
              </>
            ))}
          </List>
        </Drawer>

        <Box
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            pt: "80px",
            // pb: "100px",
            // pl: { xs: "8px", lg: "20px" },
            // pr: { xs: "8px", lg: "20px" },
            ml: "auto",
            bgcolor: "white",
          }}
        >
          {/* <Box
            sx={{
              pt: 2,
              // pl: { xs: 1, lg: 3 },
              pr: { xs: 1, lg: 5 },
              borderRadius: 2,
            }}
          > */}
            <Index />
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
};
export default PermanentDrawerRight;
