import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const RetailDescription = () => {
    return (
        <Box sx={{ p: 1 }}>
          <Grid container sx={{ borderBottom: '2px solid #ECECEC' }} >
              <Typography sx={{ p: 2,color:'#000000',fontSize:'14px' }}>Latest Retail Description</Typography>
          </Grid>
          <Grid>
            <Typography sx={{ p: 2}}>No retail history found on this VIN</Typography>
          </Grid>
        </Box>
      );
}

export default RetailDescription