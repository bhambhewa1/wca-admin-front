import { Button, Fade, Grid, Menu, MenuItem, Paper, Typography, styled } from "@mui/material";
import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const data = [
  { text: "Historic Average", past30Days: "past 30d", past1Month: "6 month ago", past1year: "last yr" },
  { text: "Mileage", past30Days: "98,000", past1Month: "100,000", past1year: "110,000" },
  { text: "Value", past30Days: "16,000", past1Month: "18,000", past1year: "20,000" },
];
const data1 = [
  { text: "Base Price", price: "$14,500" },
  { text: "Adjusted MMR", price: "$16,000" },
];

const ManheimReport = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(true);

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Typography sx={{ fontSize: "18px", ml: "10px", color: "#000", fontWeight: "700", borderBottom: "2px solid #ECECEC" }}>
        Manheim
      </Typography>
      <Button
        sx={{ textTransform: "none", color: "#1569CA", fontWeight: "600", mb: "2px", p: "8px 0px 8px 0px", ml: "20px" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        4D SUV R/T
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
      <Grid container sx={{ mb: "20px", borderTop: "2px solid #ECECEC", width: "97%", ml: "20px", mr: "20px" }}>
        {data1.map((item, index) => (
          <Grid
            flex={"1 1 auto"}
            sx={{
              mt: "10px",

              borderRadius: "0px",
            }}
            item>
            <Item
              sx={{
                fontSize: "14px",
                bgcolor: index === 0 ? "#E9ECF0" : "#EEFAF7",
                color: "#000",
                p: "5px",
                boxShadow: "none",
              }}>
              {item.text}
              <Typography sx={{ color: index === 0 ? "#000" : "#4BB543", fontSize: "24px" }}>{item.price}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Typography sx={{ textAlign: "center", color: "#000", mb: "10px" }}>Typical range $11,000 - $17,000</Typography>
      <Grid sx={{ mb: "20px" }}>
        {data.map((item, index) => (
          <Grid
            flex={"1 1 auto"}
            sx={{
              borderTop: "2px solid #ECECEC",
              ml: "20px",
              mr: "20px",
              borderRadius: "0px",
            }}
            item>
            <Item
              sx={{
                fontSize: "14px",
                color: "#000",
                p: "10px 0px 10px 0px",
                boxShadow: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Typography sx={{ color: "#000", textAlign: "left", width: "25%", fontWeight: index !== 1 ? "700" : "" }}>
                {item.text}
              </Typography>
              <Typography sx={{ color: "#000", textAlign: "left", width: "25%" }}>{item.past30Days}</Typography>
              <Typography sx={{ color: "#000", textAlign: "left", width: "25%" }}>{item.past1Month}</Typography>

              <Typography sx={{ color: "#000", textAlign: "left", width: "25" }}>{item.past1year}</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ManheimReport;
