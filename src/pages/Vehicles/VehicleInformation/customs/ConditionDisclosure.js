import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Light from "../../../../assests/Light@2x.png";
import Body from "../../../../assests/Body@2x.png";
import Mechanical from "../../../../assests/Mechanical@2x.png";
import Other from "../../../../assests/Other@2x.png";
import Glass from "../../../../assests/Glass@2x.png";
import Interior from "../../../../assests/Interior@2x.png";
import Tyre from "../../../../assests/Wheel@2x.png";
import Market from "../../../../assests/After Market@2x.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const data = [
  { text: "Lights", icon: Light },
  { text: "Mechanical", icon: Mechanical },
  { text: "Other", icon: Other },
  { text: "Body", icon: Body },
  { text: "Glass", icon: Glass },
  { text: "Interior", icon: Interior },
  { text: "Tyre/Wheel", icon: Tyre },
  { text: "After Market", icon: Market },
];
const data1 = [
  { text: "Abs", icon: Light },
  { text: "Battery", icon: Mechanical },
  { text: "Brake", icon: Other },
  { text: "Engine", icon: Body },
  { text: "Traction", icon: Glass },
  { text: "Airbag/srs", icon: Interior },
  { text: "Tpms", icon: Tyre },
  { text: "Hybrid battery", icon: Market },
];
const ConditionDisclosure = () => {
  return (
    <>
      <Typography sx={{ fontSize: "12px", color: "#000", fontWeight: "700", ml: "10px" }}>Condition Disclosure</Typography>

      <Grid container sx={{ mb: "20px" }}>
        {data.map((item, index) => (
          <Grid
            flex={"1 1 auto"}
            sx={{
              border: "2px solid #ECECEC",
              mt: "10px",
              ml: "10px",
              mr: "10px",
              borderRadius: "10px",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: "20px",
            }}
            item>
            <img alt="icon" style={{ width: "30px" }} src={item.icon} />

            <Item
              sx={{
                fontSize: "14px",
                color: "#000",
                p: "0px",
                boxShadow: "none",
              }}>
              {item.text}
              <Typography sx={{ color: "#007A4D" }}>$0</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ width: "98%", ml: "10px", border: "1px solid #ECECEC" }} />
      <Grid
        sx={{ ml: "10px", mr: "10px", width:{xs:'93%',lg:"50%"}, flexWrap: "wrap", mt: "10px", mb: "10px" }}
        container
        rowGap={"10px"}
        columnGap={"10px"}>
        {data1.map((item, index) => (
          <Grid
            flex={"1 1 auto"}
            sx={{
              border: "2px solid #ECECEC",
              borderRadius: "5px",
              minWidth: "15%",
              maxWidth: {xs:"70%",lg:"18%"},
            }}
            item>
            <Item
              sx={{
                fontSize: "12px",
                color: "#000",
                p: "5px ",
                boxShadow: "none",
              }}>
              {item.text}
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ConditionDisclosure;
