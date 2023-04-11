import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  FormLabel,
  DialogActions,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: "#3D2E57",
    fontSize: { xs: "14px", sm: "18px" },
    fontWeight: "400",
    width: "45%",
    "&.MuiTab-root.Mui-selected": {
      backgroundColor: "#F15F23",
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.65rem",
      },
      color: "white",
      textTransform: "none",
    },
    "&.MuiButtonBase-root": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.125rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.65rem",
        width: "50%"
      },
      backgroundColor: "rgba(42, 34, 70, 0.1)",
      color: "#3D2E57",
      textTransform: "none",
      marginRight: '7%',
    },
  },
}));

const TopBox = ({
  headerText,
  button_one,
  button_two,
  button_three,
  searchText,
  sortingText,
  onClick,
  //   orders,
  //   deleteAPI,
  onSubmit,
  perv_search_val,
  search_val,
  setSearch_val,
  handleChange,
  numSelected,
  value,
  button_one_onClick,
}) => {
  const classes = useStyles();
  const tabClasses = { root: classes.tab };
  const tabPanelClasses = { root: classes.TabPanel };
  const [tabValue, setTabValue] = React.useState(0);
  const route = ["/vehicles/negotiating", "/vehicles/purchased"];

  const navigate = useNavigate();
  const location = useLocation();
  const handleTabChange = (event, newValue) => { };

  const handleSearch = (e) => {
    setSearch_val(e.target.value);
    onSubmit(e.target.value);
  };
  // const handleEnter = (e) => {
  //   if (e.key === "Enter") onSubmit(search_val);
  //   if (
  //     e.key === "Backspace" &&
  //     perv_search_val !== "" &&
  //     search_val.length === 0
  //   ) {
  //     setSearch_val("");
  //     onSubmit("");
  //   }
  // };
 
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "300px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
      }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between" },
          width: "100%",
          // pb: 2,
          // p: 3,
          borderBottom: "3px solid rgba(0, 0, 0, 0.06)",
          // borderTop: "3px solid rgba(0, 0, 0, 0.06)",
        }}>
        <Typography sx={style.headingText}>{headerText}</Typography>
        {location.pathname !== "/vehicles/purchased" && location.pathname !== "/vehicles/soldandunsold" && location.pathname !== "/appointments" && (
          <Button variant="contained" onClick={button_one_onClick} sx={style.button_one}>
            {button_one}
          </Button>
        )}
      </Box>

      {(location.pathname === "/vehicles/negotiating" || location.pathname === "/vehicles/purchased") && (
        <Box
          sx={{
            display: "flex",
            pb: 2,
            pt: 2,
            borderColor: "divider",
          }}>
          <Tabs
            value={location.pathname}
            onChange={handleTabChange}
            indicatorColor="white"
            aria-label="basic tabs example"
            sx={{
              borderBottom: "none",
              width: {xs:"100%",sm:"50%"},pl:{xs:1,sm:3}
            }}>
            <Tab classes={tabClasses}
              label={button_two}
              value={route[0]}
              LinkComponent={Link}
              to={route[0]}
            />
            <Tab classes={tabClasses}
              label={button_three}
              value={route[1]}
              LinkComponent={Link}
              to={route[1]}
            />
          </Tabs>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          p: {xs:1,sm:3},
          pb: 0,
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography sx={{ mb: "15px" }}>{searchText}</Typography>
          <TextField
            variant="filled"
            inputProps={{
              style: {
                paddingTop: "8px",
                paddingBottom: "8px",
                color: "#A8A8A8",
              },
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderRadius: "5px",
                fontSize: "16px",
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "210px",
                  lg: "262px",
                  xl: "262px",
                },
                height: "40px",
                mr: 2,
              },

              startAdornment: (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex", color: "#DDDDDD" },
                  }}>
                  <SearchIcon sx={{ fontSize: "20px" }} />
                </Box>
              ),
            }}
            onChange={handleSearch}
            // onKeyDown={handleEnter}
            placeholder="Search"
          />
        </Box>
        {location.pathname === "/vehicles" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}>
            <Typography sx={{ mb: "15px", mt: "15px" }}>{sortingText}</Typography>
            <Select
              variant="filled"
              value={value}
              onChange={handleChange}
              displayEmpty
              disableUnderline
              SelectDisplayProps={{ style: { padding: 3, marginLeft: "10px" } }}
              MenuProps={{ disableScrollLock: true }}
              inputProps={{
                style: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                },
              }}
              sx={{
                height: "41px",
                minWidth: "200px",
                fontSize: "18px",
                fontWeight: "400",
                borderBottom: "none",
                color: "#dddddd",
              }}>
              <MenuItem value="">Select</MenuItem>
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Inprogress</MenuItem>
              <MenuItem value={2}>Completed</MenuItem>
            </Select>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TopBox;
const style = {
  button_one: {
    bgcolor: "#F15F23",
    fontWeight: 400,
    "&.MuiButtonBase-root:hover": {
      bgcolor: "#F15F23",
      boxShadow: "none",
    },
    m: { xs: 1, sm: 2 },
    boxShadow: "none",
    color: "white",
    // width: "120px",
    textTransform: "none",
    height: "40px",
    fontSize: {xs:'12px',sm:"18px"},
  },
  button_two: {
    bgcolor: "#FF8D2A",
    fontWeight: 400,
    "&.MuiButtonBase-root:hover": {
      bgcolor: "#FF8D2A",
      boxShadow: "none",
    },
    boxShadow: "none",
    color: "white",
    width: "120px",
    height: "40px",
    textTransform: "none",
    fontSize: "18px",
  },
  headingText: {
    fontSize: {xs:'14px',sm:"20px"},
    fontWeight: "700",
    color: "#000000",
    p: { xs: 1, sm: 3 },
    display:'flex',
    alignItems:'center'
  },
  typographyStyle1: {
    fontFamily: "Effra",
    fontSize: "22px",
    lineHeight: "26px",
    fontWeight: "400",
    marginRight: "10px",
    // marginBottom: "10px",
    // marginTop: "10px",
    // bgcolor: "red",
  },
};
