import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const Odometer = ({data,setData}) => {
  console.log(setData);
  const [base,setBase] = useState(data)
  const handleChange = (e) =>{
    setBase(e.target.value)
    // setData({Odometer:e.target.value})
  }
  console.log(data,base)
  const price1 = [
    {
      price:
        "TRANSMISSION: Noise, Slip, Shudder, Module, Hard Engagement and/or Shift|Timing Component: Failure/Noise/Chain Stretch/Guide Failure|Gasket Leak: Timing Cover|Rust: Rocker Panels/Body Panels/Undercarriage / Recalls",
      text: "Common Problems",
    },
    // { price: "Base: 77,000 /", text: "Odometer" },
  ];
  return (
    <Grid sx={{
      mr: "10px",
      bgcolor: 'white'
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
              {index === 1 ? <Button sx={{ textTransform: "none" }}>Set to base</Button> : ""}
              {index === 1 ? (
                <Typography sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                  <TextField
                  placeholder="Enter Miles"
                    sx={{
                      p: "8px 20px 8px 20px",
                      borderRadius: "5px",
                      color: "#000",
                      fontWeight: "600",
                      width:{xs:'50%',xl:'30%'}
                    }}/>
                </Typography>
              ) : (
                ""
              )}
            </Typography>
          </Item>
        </Grid>
      ))}
      <Grid  item>
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
                width:'100%'
                // justifyContent: "space-between",
              }}>
              Base: 77,000 /
              <Button sx={{ textTransform: "none" }} onClick={()=>{setBase(77000)}}>Set to base</Button> 
                <Typography sx={{ width: "60%", display: "flex", justifyContent: "flex-end" }}>
                  <TextField
                  placeholder="Enter Miles"
                  value={base}
                  onChange={handleChange}
                    sx={{
                      p: "8px 20px 8px 20px",
                      borderRadius: "5px",
                      color: "#000",
                      fontWeight: "600",
                      width:'60%'
                    }}/>
                </Typography>
            </Typography>
          </Item>
        </Grid>
    </Grid>
  );
};

export default Odometer;
