import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const data = ["Lights", "Mechanical", "Other", "Body", "Glass", "Interior", "Tyre/Wheel", "After Market"];
const ConditionDisclosure = () => {
  return (
    <>
      <Typography sx={{ fontSize: "12px", color: "#000", fontWeight: "700", ml: "10px" }}>Condition Disclosure</Typography>

      <Grid container sx={{ mb: "20px" }}>
        {data.map((item, index) => (
          <Grid
            flex={"1 1 auto"}
            sx={{
              border: "3px solid #ECECEC",
              mt: "10px",
              ml: "10px",
              mr: "10px",
              borderRadius: "10px",
            }}
            item>
            <Item
              sx={{
                p: "20px",
                fontSize: "14px",
                color: "#000",
                boxShadow: "none",
              }}>
              {item}
              <Typography sx={{ color: "#007A4D" }}>$0</Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ConditionDisclosure;
