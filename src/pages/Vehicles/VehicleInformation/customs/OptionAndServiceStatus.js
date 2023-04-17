import { Button, Grid, Typography } from "@mui/material";
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
const OptionAndServiceStatus = () => {
  const price1 = [
    {
      price: "Standard:• dual power seats •std dual zone automatic ac std •leather std •stabilitrak std",
      text: "Option",
      box: [
        { name: "Manual Transmission", isSelect: false },
        { name: "4 wheel Drive", isSelect: false },
      ],
    },
    {
      text: "Service Status",
      box: [
        { name: "Extended warranty", isSelect: false },
        { name: "Flunked Shop", isSelect: false },
        { name: "Protection package", isSelect: false },
      ],
    },
  ];
  const [priceData, setPricedata] = useState(price1);
  const onSelectHandle = (item, index, ind) => {
    // console.log(index, ind);
    const duplicateData = priceData;
    duplicateData[index]?.box?.map((item, i) => {
      if (ind === i && !item.isSelect) {
        item.isSelect = true;
      } else if (item.isSelect && ind === i) {
        item.isSelect = false;
      }
      return item;
    });
    // console.log(duplicateData);
    setPricedata([...duplicateData]);
  };
  return (
    <Grid sx={{ mr: "10px" }}>
      {priceData.map((item, index) => (
        <Grid key={index} flex={"1 1 auto"} item>
          <Item
            sx={{
              p: index === 1 ? "50px 0px 80px 0px" : "10px 0px 80px 0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              borderBottom: index === 0 ? "2px solid #ECECEC" : "",
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
              {item.box.map((data, ind) => (
                <Grid
                  sx={{
                    // p: "8px 15px 8px 15px",
                    // p: 1,
                    fontSize: "12px",
                    borderRadius: "5px",
                    color: "#000",
                    fontWeight: "600",
                    mr: 2,
                    mt: 1,
                  }}>
                  <button
                    onClick={() => onSelectHandle(item, index, ind)}
                    style={{ width: "100%", padding: "10px", border: data?.isSelect ? "2px solid black" : "2px solid #ECECEC" }}>
                    {data.name}
                  </button>
                </Grid>
              ))}
            </Grid>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionAndServiceStatus;
