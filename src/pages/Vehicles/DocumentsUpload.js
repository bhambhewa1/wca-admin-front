import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { makeStyles, styled } from "@mui/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#F5F9FA" : "#F5F9FA",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
//   color: theme.palette.text.secondary,
//   boxShadow: "",
  color: "rgba(0, 0, 0, 0.06)"
}));

const DocumentsUpload = () => {
  return (
    <>
      {/* <Box sx={{display:'flex', justifyContent: "center"}}> */}
      <Grid sx={{ ml: "10px" }} container rowGap={"10px"} columnGap={"50px"}>
        <Grid item xl={5.6}>
          <Item>Driver license</Item>
          <Typography>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Typography>
        </Grid>
        <Grid item xl={5.6} sx={{ border: "1px solid black" }}>
        <Typography sx={{p:2,borderBottom: "1px solid black"}}>Vehicle Registeration</Typography>
          <Typography sx={{p:2}}>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old.
          </Typography>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
};

export default DocumentsUpload;
