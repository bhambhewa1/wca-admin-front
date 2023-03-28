import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import React from "react";
import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
  boxShadow: 'none'
}));
const CustomerInfo = () => {
  return (
    <Box sx={{ m: { xs: 1, sm: 2 ,boxShadow:'1px solid #dddddd'}}}>
        <Typography sx={style.headingText}>Customer Info</Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{pl:2,pr:2}}>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={{
              fontSize: "14px",
              fontWeight: 700,
              bgcolor: "inherit"
            }}>Customer Name:</Item>
            <Item sx={{
              fontSize: "14px",
              bgcolor: "inherit"
            }}>John Smith</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={{
              fontSize: "14px",
              fontWeight: 700,
              bgcolor: "inherit"
            }}>Email:</Item>
            <Item sx={{
              fontSize: "14px",
              bgcolor: "inherit"
            }}>JohnSmith@wca.com</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={{
              fontSize: "14px",
              fontWeight: 700,
              bgcolor: "inherit"
            }}>Contact no:</Item>
            <Item sx={{
              fontSize: "14px",
              bgcolor: "inherit"
            }}>+1 452 2653</Item>
          </Grid>
          <Grid item xs={12} sx={{
            display: 'flex'
          }}>
            <Item sx={{
              fontSize: "14px",
              fontWeight: 700,
              bgcolor: "inherit"
            }}>Address:</Item>
            <Item sx={{
              fontSize: "14px",
              bgcolor: "inherit"
            }}> 22 , baker Strat</Item>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent:"flex-end",
          }}>
            <Item sx={{
              fontWeight: 700,
              bgcolor: "#4969B2",
              width:'100px',
              mt:2
            }}><Link style={{
              display:'flex',
              textDecoration:"none",
              justifyContent:'space-around'
            }}>
                <EditIcon sx={{color:"white",fontSize:"20px"}}/>
                <Typography sx={{color:'white',fontSize:"16px"}}>Edit</Typography>
              </Link></Item>
          </Grid>
        </Grid>
        </Grid>
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
    pl:3,
    borderBottom: '1px solid gray'
  },
};