import { Box, Grid, Typography, Paper, Button, IconButton } from "@mui/material";
import React from "react";
// import { Style } from "../../const/Style";
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import SpeedIcon from '@mui/icons-material/Speed';
import HistoryIcon from '@mui/icons-material/History';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import OfflinePinRoundedIcon from '@mui/icons-material/OfflinePinRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  // color: theme.palette.text.secondary,
  boxShadow: 'none'
}));
const data = [
  {
    name:'Odometer',
    icon:<SpeedIcon sx={{fontSize:'20px'}} color='success'/>,
    text:'18,000 MI'
  },
  {
    name:'History',
    icon:<HistoryIcon  sx={{fontSize:'20px'}} color='success'/>,
    text:'Clean'
  },
  {
    name:'Depreciation',
    icon:<TrendingDownIcon  sx={{fontSize:'20px'}} color='error'/>,
    text:`$18.22 Daily ${'\n'} $480.22 Monthly`
  },
  {
    name:'Common Problems',
    icon:<ErrorOutlineIcon  sx={{fontSize:'20px'}} color="warning"/>,
    text:'TRANSMISSION: Noise, Slip, Shudder, Module, Hard Engagement and/or Shift|Timing Component: Failure/Noise/Chain Stretch/Guide Failure|Gasket Leak: Timing Cover|Rust: Rocker Panels/Body Panels/Undercarriage / Recalls'
  },
]
const data1 = [
  {
    name:'Options',
    icon:<OfflinePinRoundedIcon sx={{fontSize:'24px'}} color='error'/>,
    text:'$0'
  },
  {
    name:'Demage',
    icon:<WarningRoundedIcon  sx={{fontSize:'24px'}} color='success'/>,
    text:'$0'
  }
]
const ScoreCard = () => {
  return (
    <Box sx={{boxShadow:'2px solid #ECECEC'}}>
        <Typography sx={style.headingText}>Scorecard</Typography>
        <Grid container >
        <Grid item xs={6} flex="1 1 auto" sx={{borderRight:'2px solid #ECECEC',mt:'15px',mb:'15px'}}>
          {data.map((item)=>(
            <Grid container  flex="1 1 auto">
            <Grid  lg={1} sx={{pt:1,pl:1}}>
              <IconButton >{item.icon}</IconButton>
            </Grid>
            <Grid sx={{p:1}} lg={11}>
              <Typography sx={{fontSize:'12px'}}>{item.name}</Typography> 
               <Typography sx={{fontSize:'12px',color:'#000000'}}>{item.text}</Typography> 
            </Grid>
            </Grid>
          ))}
          </Grid>
          <Grid item xs={6} sx={{mt:'15px',mb:'15px'}}>
          {data1.map((item)=>(
            <Grid container  flex="1 1 auto" >
            <Grid  lg={1} sx={{pt:1,pl:1}}>
              <IconButton >{item.icon}</IconButton>
            </Grid>
            <Grid sx={{p:1}} lg={11}>
              <Typography sx={{fontSize:'12px'}}>{item.name}</Typography> 
               <Typography sx={{fontSize:'12px',color:'#000000'}}>{item.text}</Typography> 
            </Grid>
            </Grid>
          ))}
          </Grid>
        </Grid>
      </Box>
  );
};

export default ScoreCard;
const style = {
  headingText: {
    fontSize: "12px",
    fontWeight: "700",
    lineHeight: "38px",
    color: "#000000",
    pl:1,
    borderBottom: '2px solid #ECECEC'
  },
};
