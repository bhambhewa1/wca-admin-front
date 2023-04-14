import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
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
const Colors = () => {
  const [color, setColor] = useState(false);
  const [index, setIndex] = useState();
  return (
    <Grid columnGap={"10px"} container>
      <Grid
        flex={"1 1 auto"}
        sx={{
          borderRight: "2px solid #ECECEC",
          mt: "10px",
        }}
        item
      >
        <Item
          sx={{
            p: "0px 20px 0px 0px",
            fontSize: "14px",
            color: "#000",
            boxShadow: "none",
            textAlign: "left",
            borderRadius: "0px",
          }}
        >
          Colors
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "75%",
              mt: "10px",
            }}
          >
            <Box
              sx={{
                p: "10px",
                bgcolor: "whitesmoke",
                borderRadius: "5px",
                border: "1px solid #ECECEC",
              }}
            ></Box>
            <Typography>Exterior</Typography>
            <Box
              sx={{ p: "10px", bgcolor: "black", borderRadius: "5px" }}
            ></Box>
            <Typography>Black</Typography>
          </Box>
        </Item>
      </Grid>
      <Grid sx={{ width: "50%" }} container rowGap={"10px"} columnGap={"10px"}>
        <Grid
          flex={"1 1 auto"}
          sx={{
            pt: "15px",
            ml: {xs:'0px',lg:"30px"},
          }}
          item
        >
          <Item
            sx={{
              p: "0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              textAlign: "left",
            }}
          >
            Keys
            <Grid container flex={"1 1 auto"} columnGap={'5px'} sx={{width:'90%',pt:1}}>
              {[0, 1, 2, "+3"].map((item, ind) => (
                <Button
                  disableRipple
                  sx={{
                    fontSize: { xs: "12px", xl: "16px" },
                    color: "#000",
                    mb: "20px",
                    border: color
                      ? ind === index
                        ? "2px solid #F15F23"
                        : "2px solid #ECECEC"
                      : "2px solid #ECECEC",
                    p: "0px",
                    minWidth:'40px',
                  }}
                  onClick={() => {
                    setColor(true);
                    setIndex(ind);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Colors;
