import * as React from "react";
import ScoreCard from "./customs/ScoreCard";
import LocalMarket from "./customs/LocalMarket";
import ManheimReport from "./customs/ManheimReport";
import RetailDescription from "./customs/RetailDescription";
import { Box, Paper } from "@mui/material";
import VehicleInfoData from "./customs/VehicleInfoData";
import styled from "@emotion/styled";
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
 
}));
const VehicleInformation = () => {

  return (
      <Box sx={{
        bgcolor: '#F9FAFE',
      }}>
        <Item>
          <VehicleInfoData />
        </Item>
        <Item sx={{ marginTop:2}}>
          <ScoreCard />
        </Item>
        <Item sx={{ marginTop:2}}>
          <ManheimReport />
        </Item>
        <Item sx={{ marginTop:2}}>
          <LocalMarket />
        </Item>
        <Item sx={{ marginTop:2}}>
          <RetailDescription />
        </Item>
      </Box>
  );
};

export default VehicleInformation;
