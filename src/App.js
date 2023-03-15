import React, { createContext } from "react";
import { useLocation } from "react-router-dom";
import Index from "./routes/index";
import "./App.css";
import Drawer from "./components/Drawer/drawer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { storage as LocalStorage } from "./config/storage";
const THEME = createTheme({
  typography: {
    fontFamily: "Gilroy, SemiBold",
    // fontStyle: "gilroy",
    fontSize: "18px",
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
  },
});
export const UserContext = createContext();

const App = () => {
  const [adminName, setAdminName] = React.useState({
    n1: LocalStorage.fetch.adminfirstname(),
    n2: LocalStorage.fetch.adminlastname(),
  });
  const location = useLocation();
  return (
    <ThemeProvider theme={THEME}>
      <UserContext.Provider value={{ adminName, setAdminName }}>
        <Box
          sx={{
            bgcolor: "#FAFAFA",
          }}>
          {location.pathname !== "/" ? <Drawer /> : <Index />}
        </Box>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
