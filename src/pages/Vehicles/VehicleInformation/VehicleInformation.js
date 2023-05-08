import * as React from "react";
import ScoreCard from "./customs/ScoreCard";
import LocalMarket from "./customs/LocalMarket";
import ManheimReport from "./customs/ManheimReport";
import RetailDescription from "./customs/RetailDescription";
import { Box, Paper } from "@mui/material";
import VehicleInfoData from "./customs/VehicleInfoData";
import styled from "@emotion/styled";
import { MarketCheck, editVehicleItem } from "../../../redux/action/vehicle/vehicle";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { storage } from "../../../config/storage";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
const Market = {
  Option: [
    { name: "Manual Transmission", isSelect: false },
    { name: "4 wheel Drive", isSelect: false },
  ],
  odometer: "25010",
  int_color: "grey",
  ext_color: "red",
};
const VehicleInformation = ({ editVehicleItem }) => {
  const [data, setData] = React.useState();
  const id = useParams();
  // let vehicle_id = id.id ? id.id : storage.fetch.vehicleId();
  let data1 = { vehicles_id: id.id };
  React.useEffect(() => {
    // MarketCheck().then()
    editVehicleItem(data1).then((res) => {
      if (res?.data?.status) {
        // setLoading(false);
        setData(res?.data?.data);
      } else {
        // setLoading(false);
      }
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#F9FAFE",
      }}>
      <Item>
        <VehicleInfoData data={data} setData={setData} />
      </Item>
      <Item sx={{ marginTop: 2 }}>
        <ScoreCard />
      </Item>
      {/* <Item sx={{ marginTop: 2 }}>
        <ManheimReport />
      </Item> */}
      <Item sx={{ marginTop: 2 }}>
        <LocalMarket localMarketPayloads={data} />
      </Item>
      <Item sx={{ marginTop: 2 }}>
        <RetailDescription />
      </Item>
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    editVehicleItem: (data) => dispatch(editVehicleItem(data)),
    // deleteStaff: (data) => dispatch(deleteStaff(data)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleInformation);
