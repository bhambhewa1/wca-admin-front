import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Tabs,
  Tab,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import StaffList from "../../pages/Staff/StaffList";
import AppointmentsList from "../../pages/Appointments/AppointmentsList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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
      borderRadius: "5px",
      borderBottom: 0,
    },
    "& .MuiBox-root": {
      padding: "0px",
    },
    borderRadius: "5px",
    textTransform: "none",
    "&.MuiTab-root.Mui-selected": {
      color: "white",
      textTransform: "none",
    },
    "&.MuiButtonBase-root": {
      textTransform: "none",
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
}) => {
  const classes = useStyles();
  const tabClasses = { root: classes.tab };
  const tabPanelClasses = { root: classes.TabPanel };
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  console.log("locaton", tabValue);

  const handleChangeTab = (event, newValue) => {
    console.log("va", newValue);
    setTabValue(newValue);
  };
  const handleSearch = (e) => {
    setSearch_val(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") onSubmit(search_val);
    if (
      e.key === "Backspace" &&
      perv_search_val !== "" &&
      search_val.length === 0
    ) {
      setSearch_val("");
      onSubmit("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "300px",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        pb: "40px",
        mb: "10px",
        // bgcolor: "red",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between" },
          width: "100%",
          pb: 2,
          //   bgcolor: "yellow",
        }}
      >
        <Typography sx={style.headingText}>{headerText}</Typography>
       { tabValue === 0 &&<Button
          variant="contained"
          //   onClick={() => {
          //     onSubmit(search_val);
          //   }}
          sx={style.button_one}
        >
          {button_one}
        </Button>}
      </Box>

      {location.pathname === "/vehicles" && (
        <Box
          sx={{
            display: "flex",
            pb: 2,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            sx={{
              borderBottom: "none",
            }}
          >
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>{searchText}</Typography>
          <TextField
            variant="outlined"
            InputProps={{
              sx: {
                borderRadius: "5px",
                fontSize: "16px",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #3D2E57",
                },
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
            }}
            onChange={handleSearch}
            onKeyDown={handleEnter}
          />
        </Box>
        {location.pathname === "/vehicles" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography>{sortingText}</Typography>
            <Select
              value={value}
              onChange={handleChange}
              displayEmpty
              SelectDisplayProps={{ style: { padding: 3, marginLeft: "1px" } }}
              MenuProps={{ disableScrollLock: true }}
              sx={{
                height: "41px",
                minWidth: "119.29px",
                fontSize: "18px",
                fontWeight: "400",
                color: "#000000",
                ".MuiOutlinedInput-notchedOutline": {
                  border: "1px solid #3D2E57",
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
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
    // marginBottom: "25px",
  },
  typographyStyle1: {
    fontFamily: "Effra",
    fontSize: "22px",
    lineHeight: "26px",
    fontWeight: "400",
    marginRight: "10px",
  },
};
