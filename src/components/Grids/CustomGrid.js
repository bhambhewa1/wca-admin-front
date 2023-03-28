import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const CustomGrid = ({ price, columnGap, rowGap, ml, mr, border, borderRight }) => {
  return (
    <Grid container columnGap={columnGap} rowGap={rowGap}>
      {price.map((item, index) => (
        <Grid key={index} flex={"1 1 auto"} sx={{ ml: ml, mr: mr }} item>
          <Item
            sx={{
              pt: "20px",
              pb: "20px",
              fontSize: "24px",
              color: "#000",
              boxShadow: "none",
              border: index === 3 || index === 4 ? border : "",
              borderRight: index === 0 ? borderRight : "",
              borderRadius: "5px",
            }}>
            <Typography sx={{ fontSize: "12px", color: "#707070" }}>{item.text}</Typography>

            {item.price}
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomGrid;
