import { Box, Grid, Typography,Paper  } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
  boxShadow:'none'
}));
const CustomerInfo = () => {
  return (
    <Box sx={{ m: { xs: 1, sm: 2 }, border: "3px solid rgba(0, 0, 0, 0.06)" }}>
      <Box sx={Style.table.tableWrapBox}>
        <Typography sx={style.headingText}>Customer Info</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2.5}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>Customer Name:</Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>John Smith</Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>Email:</Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>JohnSmith@wca.com</Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>Contact no:</Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>+1 452 2653</Item>
          </Grid>
          <Grid item xs={2.5}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}>Address:</Item>
          </Grid>
          <Grid item xs={8}>
            <Item sx={{
              fontSize:"14px",
              bgcolor:"inherit"
            }}> 22 , baker Strat</Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerInfo;
const style = {
  headingText: {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "38px",
    color: "#000000",
    borderBottom: '1px solid gray'
  },
};