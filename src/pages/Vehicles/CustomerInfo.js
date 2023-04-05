import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
const CustomerInfo = () => {
  return (
    <Item >
      <Typography sx={style.headingText}>Customer Info</Typography>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ pl: 3, pr: 2,pb:7 }}>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={style.item}>Customer Name:</Item>
            <Item sx={style.item}>John Smith</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={style.item}>Email:</Item>
            <Item sx={style.item}>JohnSmith@wca.com</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={style.item}>Contact no:</Item>
            <Item sx={style.item}>+1 452 2653</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={style.item}>Address:</Item>
            <Item sx={style.item}> 22 , baker Strat</Item>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: "flex-end",
          }}>
            <Item sx={{
              fontWeight: 700,
              bgcolor: "#4969B2",
              width: '100px',
              p:1,
              mt: 1
            }}><Link style={{
              display: 'flex',
              textDecoration: "none",
              justifyContent: 'center'
            }}>
                <EditIcon sx={{ color: "white", fontSize: "20px" }} />
                <Typography sx={{ color: 'white', fontSize: "16px" }}>Edit</Typography>
              </Link></Item>
          </Grid>
        </Grid>
      </Grid>
    </Item>
  );
};

export default CustomerInfo;
const style = {
  headingText: {
    fontSize: "14px",
    fontWeight: "700",
    lineHeight: "38px",
    color: "#000000",
    pl: 3,
    borderBottom: '1px solid gray'
  },
  item: {
    fontSize: "14px",
    fontWeight: 700,
    bgcolor: "inherit",
    boxShadow: 'none',
    pt:1
  }
};