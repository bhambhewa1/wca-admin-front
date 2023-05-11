/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { makeStyles, styled } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, Button, TextField, Typography } from "@mui/material";
// import CustomGrid from "../../../../components/Grids/CustomGrid";
import ConditionDisclosure from "../customs/ConditionDisclosure";
import report1 from "../../../../assests/report1.png";
import report2 from "../../../../assests/report2.png";
import report3 from "../../../../assests/report3.png";
import report4 from "../../../../assests/report4.png";
import report5 from "../../../../assests/report5.png";

import Odometer from "../customs/Odometer";
import Colors from "../customs/Colors";
import OptionAndServiceStatus from "../customs/OptionAndServiceStatus";
import VehicleHistory from "./VehicleHistory";
import { useOutletContext } from "react-router-dom";
import { addVIN, editVehicleItem } from "../../../../redux/action/vehicle/vehicle";
import { storage } from "../../../../config/storage";
import { connect } from "react-redux";
import LoaderComponent from "../../../../components/Loader/LoaderComponent";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));

const useStyles = makeStyles(() => ({
  input: {
    fontWeight: 600,
    "&::placeholder": {
      fontWeight: 700,
    },
    fontSize: "14px",
    border: "none",
  },
}));
const VehicleInfoData = ({ addVIN, editVehicleItem }) => {
  const classes = useStyles();
  const [vehicData, setVehicleData] = useOutletContext();
  const [purchaseprice, setPrice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [tradeprice, setTradeprice] = React.useState(vehicData?.trade_price);
  console.log("purchaseprice", purchaseprice);
  React.useEffect(() => {
    setPrice(vehicData?.purchase_price);
    setTradeprice(vehicData?.trade_price);
  }, [vehicData]);
  const handleChange = (e) => {
    setPrice(e.target.value);
  };
  const OnSavingPurchasePrice = () => {
    setLoading(true);
    let data1 = { vehicles_id: storage.fetch.vehicleId() };
    let data = { vehicles_id: storage.fetch.vehicleId(), purchase_price: purchaseprice, vin: vehicData?.vin, miles: "" };
    addVIN(data).then((res) => {
      if (res?.data?.status) {
        editVehicleItem(data1).then((res) => {
          if (res?.data?.status) {
            setVehicleData(res?.data?.data);
            setPrice(res?.data?.data?.purchase_Price);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });
  };
  const price = [
    { price: tradeprice, text: "Trade price" },
    { price: "10000", text: "Target auction" },
    { price: vehicData?.target_retail, text: "Target Retail" },
    { price: "10000", text: "Manhiem" },
    { price: "10000", text: "Trade in fair" },
  ];
  const image = [report1, report2, report3, report4, report5];
  const purchase_Price = [{ price: "", text: "Enter Purchase price" }, ""];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          // mt: "20px",
          borderTop: "2px solid #ECECEC",
        }}>
        <Grid
          container
          columnGap={"12px"}
          sx={{
            width: "97%",
          }}>
          {price.map((item, index) => (
            <Grid
              key={index}
              flex={"1 1 auto"}
              sx={{
                ml: "10px",
                // mr: "10px",
                borderRight: index === 0 || index === 1 ? "2px solid #ECECEC" : "",
                pt: "15px",
                pb: "10px",
              }}
              item>
              <Item
                sx={{
                  pt: "20px",
                  pb: "20px",
                  fontSize: "24px",
                  color: "#000",
                  boxShadow: "none",
                  border: index === 3 || index === 4 ? "2px solid #ECECEC" : "",
                  borderRadius: "5px",
                }}>
                ${Number(item.price).toLocaleString()}
                <Typography sx={{ fontSize: "12px", color: "#707070" }}>{item.text}</Typography>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "20px",
          borderTop: "2px solid #ECECEC",
          pt: "10px",
          pb: "10px",
        }}>
        <Grid container rowGap={"12px"}>
          {purchase_Price.map((item, index) => (
            <Grid
              key={index}
              flex={"1 1 auto"}
              sx={{
                ml: "10px",
                // mr: "10px",
                borderRight: index === 0 ? "2px solid #ECECEC" : "",
                pt: "15px",
                pb: "10px",
                maxWidth: "49.2%",
              }}
              item>
              <Item
                sx={{
                  // pt: "20px",
                  // pb: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#000",
                  textAlign: "left",
                  boxShadow: "none",
                  borderRadius: "5px",
                  p: "0px",
                }}>
                {index === 0 ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "70%" }}>
                      <Typography sx={{ fontSize: "14px", fontWeight: "800", textAlign: "left", color: "#000" }}>
                        Enter purchase price
                      </Typography>
                      <TextField
                        placeholder="Enter purchase price"
                        variant="filled"
                        inputProps={{
                          style: { padding: "20px 20px 20px 20px", borderRadius: "5px", fontWeight: "600" },
                        }}
                        InputProps={{
                          classes: { input: classes.input },
                          disableUnderline: "true",
                        }}
                        value={purchaseprice}
                        onChange={(e) => handleChange(e)}
                        sx={{
                          p: "8px 20px 0px 0px",
                          borderRadius: "5px",
                          color: "#000",
                          fontWeight: "600",
                          width: "100%",
                          // bgcolor: "#D6D6D6",
                        }}
                      />
                    </Box>
                    <Button
                      sx={{
                        mr: "20px",
                        mt: "25px",
                        bgcolor: "#F15F23",
                        boxShadow: "none",
                        p: "5px 30px 5px 30px",
                        textTransform: "none",
                        "&.MuiButtonBase-root:hover": {
                          bgcolor: "#F15F23",
                          boxShadow: "none",
                        },
                      }}
                      onClick={() => OnSavingPurchasePrice()}
                      variant="contained">
                      Save
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {image.map((item) => (
                      <img alt="reportIcons" style={{ maxWidth: "60px", maxHeight: "60px" }} src={item} />
                    ))}
                  </Box>
                )}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: "20px",
          borderTop: "2px solid #ECECEC",
          // borderBottom: "2px solid #ECECEC",

          pt: "10px",
          pb: "10px",
        }}>
        <Grid
          container
          sx={{
            borderBottom: "2px solid #ECECEC",
            pb: "10px",
          }}>
          <Grid
            flex={"1 1 auto"}
            xs={12}
            sm={5.8}
            xl={5.9}
            sx={{
              ml: "10px",
              // mr: "10px",
              borderRight: "2px solid #ECECEC",
              // maxWidth: "50%",
            }}
            item>
            <Item
              sx={{
                // pt: "20px",
                // pb: "20px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#000",
                textAlign: "left",
                boxShadow: "none",
                p: "0px",
              }}>
              <Odometer odoValue={vehicData?.miles} Vin={vehicData?.vin} base={vehicData?.base} />
              <Colors int_color={vehicData?.base_int_color} ext_color={vehicData?.base_ext_color} />
              <VehicleHistory />
            </Item>
            <Item
              sx={{
                // pt: "20px",
                // pb: "20px",
                bgcolor: "red",
                fontSize: "12px",
                fontWeight: "700",
                color: "#000",
                textAlign: "left",
                boxShadow: "none",
                p: "0px",
              }}></Item>
          </Grid>
          <Grid flex={"1 1 auto"} xs={12} sm={5.8} xl={5.9} item sx={{ ml: "10px" }}>
            <Item
              sx={{
                // pt: "20px",
                // pb: "20px",
                fontSize: "12px",
                fontWeight: "700",
                color: "#000",
                textAlign: "left",
                boxShadow: "none",
                p: "0px",
              }}>
              <OptionAndServiceStatus data={vehicData} />
            </Item>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: "100%",
            //   borderBottom: "2px solid #ECECEC",
            bgcolor: "white",
            pt: "10px",
            // pb: "10px",
          }}>
          <ConditionDisclosure />
        </Box>
      </Box>
      <LoaderComponent open={loading} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVIN: (data) => dispatch(addVIN(data)),
    editVehicleItem: (data1) => dispatch(editVehicleItem(data1)),
  };
};

export default connect(null, mapDispatchToProps)(VehicleInfoData);
