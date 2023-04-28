import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Style } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  input: {
    fontWeight: 600,
    "&::placeholder": {
      fontWeight: 700,
    },
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const Odometer = ({ odoValue }) => {
  const classes = useStyles();
  const [odometerValue, setOdometerValue] = useState("");
  const handleChange = (e) => {
    console.log(e);
    setOdometerValue(e.target.value);
    // setData({Odometer:e.target.value})
  };
  useEffect(() => {
    // console.log(odoValue);
    setOdometerValue(odoValue)
  }, [])
  
  // console.log(data,base)
  const price1 = [
    {
      price:
        "TRANSMISSION: Noise, Slip, Shudder, Module, Hard Engagement and/or Shift|Timing Component: Failure/Noise/Chain Stretch/Guide Failure|Gasket Leak: Timing Cover|Rust: Rocker Panels/Body Panels/Undercarriage / Recalls",
      text: "Common Problems",
    },
    { price: "Base: 00 /", text: "Odometer" },
  ];
  return (
    <Grid
      sx={{
        mr: "10px",
        bgcolor: "white",
      }}>
      {price1.map((item, index) => (
        <Grid key={index} flex={"1 1 auto"} item>
          <Item
            sx={{
              p: "10px 0px 20px 0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              borderBottom: "2px solid #ECECEC",
              borderRadius: "0px",
              textAlign: "left",
              fontWeight: "700",
            }}>
            {item.text}
            <Typography
              sx={{
                fontSize: "12px",
                color: index === 0 ? "#FF2C2C" : "#707070",
                mt: "10px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}>
              {item.price}
              {index === 1 ? (
                <Button
                  sx={{ textTransform: "none", minWidth: "100px" }}
                  onClick={() => {
                    setOdometerValue(0);
                  }}>
                  Set to base
                </Button>
              ) : (
                ""
              )}
              {index === 1 ? (
                <Typography
                  sx={{ width: { xs: "35%", lg: "40%", xl: "35%" }, textAlign: "right", ml: { xs: "30px", lg: "100px", xl: "200px" } }}>
                  <TextField
                    placeholder="Enter Miles"
                    InputProps={{
                      classes: { input: classes.input },
                    }}
                    value={odometerValue}
                    onChange={(e)=>handleChange(e)}
                    sx={{
                      p: "8px 20px 8px 20px",
                      borderRadius: "5px",
                      color: "#000",
                      fontWeight: "600",
                      width: "60%",
                    }}
                  />
                </Typography>
              ) : (
                ""
              )}
            </Typography>
          </Item>
        </Grid>
      ))}
      {/* <Grid item>
        <Item
          sx={{
            p: "10px 0px 20px 0px",
            fontSize: "14px",
            color: "#000",
            boxShadow: "none",
            borderBottom: "2px solid #ECECEC",
            borderRadius: "0px",
            textAlign: "left",
            fontWeight: "700",
          }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#707070",
              mt: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              width: "100%",
              // justifyContent: "space-between",
            }}>
            Base: 77,000 /
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                setOdometerValue(0);
              }}>
              Set to base
            </Button>
            <Typography sx={{ width: "60%", display: "flex", justifyContent: "flex-end" }}>
              <TextField
                placeholder="Enter Miles"
                value={odoValue}
                onChange={handleChange}
                sx={{
                  p: "8px 20px 8px 20px",
                  borderRadius: "5px",
                  color: "#000",
                  fontWeight: "600",
                  width: "60%",
                }}
              />
            </Typography>
          </Typography>
        </Item>
      </Grid> */}
    </Grid>
  );
};

export default Odometer;
