import styled from "@emotion/styled";
import { Box, Button, FormLabel, Grid, MenuItem, Paper, Select, Typography } from "@mui/material";
import React from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const VehicleHistory = () => {
  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          mt: "20px",
          borderTop: "2px solid #ECECEC",
          pt: "10px",
          pb: "10px",
        }}>
        <Grid container>
          <Grid
            flex={"1 1 auto"}
            sx={{
              borderRight: "2px solid #ECECEC",
              mt: "10px",
            }}
            xs={5.8}
            item>
            <Item
              sx={{
                // p: "0px 20px 0px 0px",
                fontSize: "14px",
                color: "#000",
                boxShadow: "none",
                textAlign: "left",
                borderRadius: "0px",
              }}>
              <Typography sx={{ color: "#000000" }}>Vehicle History</Typography>
              <Button
                disableRipple
                sx={{
                  fontSize: { xs: "12px", xl: "16px" },
                  color: "#000",
                  mb: "20px",
                  mt: 2,
                  border: "2px solid #ECECEC",
                  p: "5px",
                  minWidth: "40px",
                  textTransform: "none",
                }}>
                Frame Damage
              </Button>
            </Item>
          </Grid>
          <Grid
            flex={"1 1 auto"}
            sx={{
              pt: "15px",
              ml: "20px",
            }}
            xs={5.5}
            item>
            <Item
              sx={{
                p: "0px",
                fontSize: "14px",
                color: "#000",
                boxShadow: "none",
                // textAlign: "left",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Typography sx={{ textAlign: "left", pb: 2, color: "#000000" }}>Owners</Typography>
              <Select
                SelectDisplayProps={{ style: { padding: 5 } }}
                sx={{
                  width: "70%",
                }}>
                <MenuItem>Null</MenuItem>
                <MenuItem>Null</MenuItem>
                <MenuItem>Null</MenuItem>
              </Select>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VehicleHistory;
