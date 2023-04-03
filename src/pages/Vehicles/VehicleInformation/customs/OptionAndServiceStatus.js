import { Button, Grid, Typography } from "@mui/material";
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
const OptionAndServiceStatus = () => {
  const price1 = [
    {
      price:
        "Standard:• dual power seats •std dual zone automatic ac std •leather std •stabilitrak std",
      text: "Option",
      box: ['Manual Transmission', '4 wheel Drive']
    },
    { text: "Service Status", box: ['Extended warranty', 'Flunked Shop', 'Protection package'] },
  ];
  return (
    <Grid sx={{ mr: "10px"}}>
      {price1.map((item, index) => (
        <Grid key={index} flex={"1 1 auto"} item  >
          <Item
            sx={{
              p: index===1?"50px 0px 80px 0px":"10px 0px 80px 0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              borderBottom: index===0?"2px solid #ECECEC":'',
              borderRadius: "0px",
              textAlign: "left",
              fontWeight: "700",
            }}>
            {item.text}
            <Typography
              sx={{
                fontSize: "12px",
                color: "#707070",
                mt: "10px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}>
              {item.price}
              </Typography>

              <Grid container>
                {item.box.map((data) => (
                  < Grid
                    sx={{
                      border: "2px solid #ECECEC",
                      // p: "8px 15px 8px 15px",
                      p:1,
                      fontSize:'12px',
                      borderRadius: "5px",
                      color: "#000",
                      fontWeight: "600",
                      mr:2,
                      mt:1
                    }}>
                    {data}
                  </Grid>
               ) )}


            </Grid>
          </Item>
        </Grid>
      ))
      }
    </Grid >
  );
};

export default OptionAndServiceStatus;
