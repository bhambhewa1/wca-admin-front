import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const data = [
  {
    img: require('../../../../assests/download.jpg'),
    name: 'Durango',
    price: '$25,499',
    rt: 'R/T 5.7L V8',
    vin: '1C4SDHCT2EC405171',
    mi: '50,142 Mi',
    type: 'Pasco, WA',
    dom: 115
  },
  {
    img: require('../../../../assests/Mahindra-Scorpio-N-300620221053.jpg'),
    name: 'Durango',
    price: '$18,324',
    rt: 'R/T 5.7L V8',
    vin: '1C4SDHCT2EC405171',
    mi: '154,217 Mi',
    type: 'Holly, Mi',
    dom: 115
  },
  {
    img: require('../../../../assests/0x0.jpg'),
    name: 'Durango',
    price: '$24,999',
    rt: 'R/T 5.7L V8',
    vin: '1C4SDHCT2EC405171',
    mi: '102,909 Mi',
    type: 'Loganville, GA',
    dom: 115
  },
]
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const LocalMarket = () => {
  return (
    <Box sx={{ p: 1 }}>
      <Grid container sx={{ borderBottom: '2px solid #ECECEC' }} >
        <Grid xs={6}>
          <Typography sx={{ p: 2 }}>Local Market</Typography>
        </Grid>
        <Grid xs={6} sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <IconButton><OpenInNewRoundedIcon sx={{ fontSize: '20px', color: '#000000' }} /></IconButton>
        </Grid>
      </Grid>
      <Grid>
        {data.map((item) => (
          <Item sx={{ bgcolor: 'green', mt: 2 }}>
            <Grid container xs={11.9}  xl={12} sx={{ bgcolor: 'white', ml: 1 }} >
              <Grid xs={6} container >
                <Grid xs={3}>
                  <img
                    style={{
                      width: '90%',
                      padding: 7
                    }}
                    src={item.img}
                  />
                </Grid>
                <Grid xs={9} sx={{ fontSize: '14px' }}>
                  <Typography sx={{ fontWeight: 800, color: '#000000', fontSize: '16px' }}>{item.name}</Typography>
                  <Typography>{item.rt}</Typography>
                  <Grid container>
                    <Typography sx={{ borderRight: '1px solid black', pr: 1 }}>{item.vin}</Typography>
                    <Typography sx={{ pl: 1 }}>{item.mi}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid xs={5.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '800', color: '#000000' }}>{item.price}</Typography>
              </Grid>
            </Grid>
            <Grid container xs={11.9}  xl={12}  sx={{ bgcolor: '#ECECEC', ml: 1 }}>
              <Grid xs={6} sx={{
                p: 1
              }}>
                <Link style={{
                  textDecoration: 'none',
                  color: 'white',
                  backgroundColor: '#000000',
                  padding: '5px 30px 5px 30px',
                  fontSize: '14px',
                  borderRadius: '5px',
                }}>Used</Link>
              </Grid>
              <Grid xs={5.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Typography sx={{ fontSize: '14px' }}>DOM:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#000000' }}>{item.dom}</Typography>
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: '14px', pl: 1 }}>{item.type}</Typography>
              </Grid></Grid>
          </Item>
        ))}
      </Grid>
    </Box>
  );
};

export default LocalMarket;
