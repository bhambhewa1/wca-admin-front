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
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  tab: {
    fontSize: "18px",
    fontWeight: "400",
    "&.Mui-selected": {
      // background: "#F15F23",
      color: "white",
      borderBottom: 0,
    },
    "& .MuiBox-root": {
      padding: "0px",
    },
    textTransform: "none",
    "&.MuiTab-root.Mui-selected": {
      color: "white",
      textTransform: "none",
      border: "none",
    },
    "&.MuiButtonBase-root": {
      textTransform: "none",
      marginRight: 25,
    },
    "&.css-1jbwg7a-MuiButtonBase-root-MuiTab-root": {
      background: "#DDDDDD",
      color: "#000000",
    },
    "&.css-1jbwg7a-MuiButtonBase-root-MuiTab-root.Mui-selected": {
      background: "#F15F23",
    },
  },
  TabPanel: {
    "& .MuiBox-root": {
      padding: "0px",
      textTransform: "none",
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
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", tabValue);

  const handleChangeTab = (event, newValue) => {
    console.log("va", newValue);
    setTabValue(newValue);
  };
  const handleSearch = (e) => {
    setSearch_val(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") onSubmit(search_val);
    if (e.key === "Backspace" && perv_search_val !== "" && search_val.length === 0) {
      setSearch_val("");
      onSubmit("");
    }
  };
  const handleOpen = () => {
    console.log("r");
    setOpen(true);
  };
  const Submit = () => {
    navigate("/vehicles/details");
  };
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "300px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        pb: "20px",
        // bgcolor: "red",
      }}>
      <Dialog open={open}>
        <form handleSubmit={Submit}>
          <DialogTitle sx={{ borderBottom: "1px solid #dddddd" }}>Add Vehicle</DialogTitle>
          <DialogContent sx={{ borderBottom: "1px solid #dddddd" }}>
            <FormLabel>Enter VIN number</FormLabel>
            <TextField
              variant="filled"
              sx={{ width: "100%" }}
              InputProps={{ disableUnderline: true }}
              inputProps={{
                style: {
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  color: "#A8A8A8",
                },
              }}></TextField>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: { xs: "100%", md: "35%", lg: "70%" },
                float: "right",
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                pb: 3,
                pr: 3,
                pl: { xs: 2, md: 0 },
              }}>
              <Button
                disableRipple
                sx={{
                  mr: { md: 3 },
                  pl: "25px",
                  pr: "25px",
                  pt: "10px",
                  pb: "10px",
                  fontSize: "16px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  border: "1px solid #EB5757",
                  bgcolor: "#EB5757",
                  width: { xs: "40%", md: "50%" },
                  color: "white",
                  "&.MuiButtonBase-root:hover": {
                    border: "1px solid #EB5757",
                    bgcolor: "#EB5757",
                    color: "white",
                  },
                }}
                variant="outlined"
                className="btn"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disableRipple
                sx={{
                  pl: "25px",
                  pr: "25px",
                  pt: "10px",
                  pb: "10px",
                  fontSize: "16px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  color: "white",
                  bgcolor: "#27AE60",
                  border: "1px solid #27AE60",
                  width: { xs: "40%", md: "50%" },
                  "&.MuiButtonBase-root:hover": {
                    border: "1px solid #27AE60",
                    color: "white",
                    bgcolor: "#27AE60",
                  },
                }}
                variant="outlined"
                className="btn"
                // type="submit"
                onClick={Submit}>
                Next
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between" },
          width: "100%",
          pb: 2,
          borderBottom: "3px solid rgba(0, 0, 0, 0.06)",
          // borderTop: "3px solid rgba(0, 0, 0, 0.06)",
        }}>
        <Typography sx={style.headingText}>{headerText}</Typography>
        {tabValue === 0 && location.pathname !== "/vehicles/soldandunsold" && (
          <Button variant="contained" onClick={button_one_onClick} sx={style.button_one}>
            {button_one}
          </Button>
        )}
      </Box>

      {location.pathname === "/vehicles" && (
        <Box
          sx={{
            display: "flex",
            pb: 2,
            borderColor: "divider",
          }}>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            sx={{
              borderBottom: "none",
            }}>
            <Tab classes={tabClasses} label={button_two} {...a11yProps(0)} />
            <Tab classes={tabClasses} label={button_three} {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={tabValue} index={0} classes={tabPanelClasses}>
            {/* <Typography>Hello</Typography> */}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {/* <Typography>Hi</Typography> */}
          </TabPanel>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography sx={{ mb: "15px", mt: "15px" }}>{searchText}</Typography>
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
                  xs: "30vw",
                  sm: "30vw",
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
            onKeyDown={handleEnter}
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
    boxShadow: "none",
    color: "white",
    // width: "120px",
    textTransform: "none",
    height: "40px",
    fontSize: "18px",
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
    fontSize: "24px",
    lineHeight: "29px",
    color: "#000000",
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
