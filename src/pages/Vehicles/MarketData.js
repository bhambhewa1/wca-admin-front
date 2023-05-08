import styled from '@emotion/styled';
import { Box, Paper } from '@mui/material';
import React from 'react'
import ManheimReport from './VehicleInformation/customs/ManheimReport';

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));
const MarketData = () => {
  return (
    <Box
    sx={{
      bgcolor: "#F9FAFE",
    }}>
    <Item sx={{ marginTop: 2 }}>
      <ManheimReport />
    </Item>
  </Box>
  )
}

export default MarketData