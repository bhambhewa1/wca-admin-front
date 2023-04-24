import * as React from "react";
import ScoreCard from "./customs/ScoreCard";
import LocalMarket from "./customs/LocalMarket";
import ManheimReport from "./customs/ManheimReport";
import RetailDescription from "./customs/RetailDescription";
import { Box, Paper } from "@mui/material";
import VehicleInfoData from "./customs/VehicleInfoData";
import styled from "@emotion/styled";
import { MarketCheck } from "../../../redux/action/vehicle/vehicle";
import { connect } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
 
}));
const Market = {
  Option:[
    { name: "Manual Transmission", isSelect: false },
    { name: "4 wheel Drive", isSelect: false },
  ],
  odometer:"25010",
  int_color:'grey',
  ext_color:'red',
  
}
const VehicleInformation = ({ MarketCheck }) => {
  const [data, setData] = React.useState(Market)

  React.useEffect(() => {
    // MarketCheck().then()
    console.log(data);
  }, [data])
  
  return (
      <Box sx={{
        bgcolor: '#F9FAFE',
      }}>
        <Item>
          <VehicleInfoData data={data} setData={setData} />
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
const mapDispatchToProps = (dispatch) => {
  return {
    MarketCheck: () => dispatch(MarketCheck()),
    // deleteStaff: (data) => dispatch(deleteStaff(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleInformation);

