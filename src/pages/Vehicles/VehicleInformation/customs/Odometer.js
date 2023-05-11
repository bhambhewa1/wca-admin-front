import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Style } from "@mui/icons-material";

import { makeStyles } from "@mui/styles";
import AlertDialog from "../../../../components/Dialog/Dialog";
import LoaderComponent from "../../../../components/Loader/LoaderComponent";
import { connect } from "react-redux";
import { addVIN, editVehicleItem } from "../../../../redux/action/vehicle/vehicle";
import { storage } from "../../../../config/storage";
import { useOutletContext } from "react-router-dom";

const useStyles = makeStyles(() => ({
  input: {
    fontWeight: 600,
    "&::placeholder": {
      fontWeight: 700,
    },
    fontSize: "14px",
  },
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const Odometer = ({ odoValue, base, addVIN, Vin, editVehicleItem }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicData, setVehicleData] = useOutletContext();
  const classes = useStyles();
  const [odometerValue, setOdometerValue] = useState("");
  const handleChange = (e) => {
    if (e.target.value === "" || (Number(e.target.value) >= 0 && !Number.isNaN(Number(e.target.value)))) {
      setOdometerValue(e.target.value);
    }
    // setData({Odometer:e.target.value})
  };
  const handleSubmit = () => {
    let data1 = {
      vehicles_id: storage.fetch.vehicleId(),
    };
    setLoading(true);
    let data = {
      miles: odometerValue,
      vehicles_id: storage.fetch.vehicleId(),
      purchase_price: vehicData?.purchase_price,
      vin: Vin,
    };
    addVIN(data).then((res) => {
      setOpen(false);
      if (res?.data?.status) {
        editVehicleItem(data1).then((res) => {
          if (res?.data?.status) {
            setOdometerValue(res?.data?.data?.miles);
            setVehicleData(res?.data?.data);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });
  };
  const handleSubmit1 = () => {
    let data1 = {
      vehicles_id: storage.fetch.vehicleId(),
    };
    setLoading(true);
    let data = {
      miles: base,
      vehicles_id: storage.fetch.vehicleId(),
      purchase_price: vehicData?.purchase_price,

      vin: Vin,
    };
    addVIN(data).then((res) => {
      setOpen(false);
      if (res?.data?.status) {
        editVehicleItem(data1).then((res) => {
          if (res?.data?.status) {
            setOdometerValue(res.data.data.miles);
            setVehicleData(res?.data?.data);
            setLoading(false);
            // return(<VehicleInfoData/>)
          }
        });
      } else {
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    setOdometerValue(odoValue);
  }, [odoValue]);

  const price1 = [
    {
      price:
        "TRANSMISSION: Noise, Slip, Shudder, Module, Hard Engagement and/or Shift|Timing Component: Failure/Noise/Chain Stretch/Guide Failure|Gasket Leak: Timing Cover|Rust: Rocker Panels/Body Panels/Undercarriage / Recalls",
      text: "Common Problems",
    },
    { price: "Base:", text: "Odometer" },
  ];
  return (
    <Grid
      sx={{
        mr: "10px",
        bgcolor: "white",
      }}>
      <LoaderComponent open={loading} />
      <Dialog open={open}>
        <DialogTitle sx={{ borderBottom: "1px solid #dddddd", overflow: "hidden" }}>Enter miles</DialogTitle>

        <DialogContent
          sx={{
            borderBottom: "1px solid #dddddd",
            mt: 2,
            "&.MuiDialogContent-root": {
              pb: 0,
            },
          }}>
          {/* <form onSubmit={formik.handleSubmit}> */}
          <TextField
            placeholder="Enter Miles"
            onClick={() => setOpen(true)}
            InputProps={{
              classes: { input: classes.input },
              // inputProps: { min: 0 }
            }}
            inputProps={{
              pattern: "[0-9]*",
            }}
            value={odometerValue}
            onChange={(e) => handleChange(e)}
            sx={{
              p: "8px 20px 8px 20px",
              borderRadius: "5px",
              color: "#000",
              fontWeight: "600",
              width: "100%",
            }}
          />
          {/* {formik.errors.vin && formik.touched.vin ? <p style={{ color: "red", margin: "10px" }}>{formik.errors.vin}</p> : null} */}
          <LoaderComponent open={loading} />

          <DialogActions
            sx={{
              "&.MuiDialogActions-root": {
                pr: 0,
              },
            }}>
            <Box
              sx={{
                width: { xs: "100%", md: "35%", lg: "70%" },
                float: "right",
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                pb: 3,
                // pr: 3,
                pl: { xs: 2, md: 0 },
              }}>
              <Button
                disableRipple
                sx={{
                  mr: { md: 3 },
                  pl: "25px",
                  pr: "25px",
                  pt: "10px",
                  pb: "10px",
                  fontSize: "16px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  border: "1px solid #EB5757",
                  bgcolor: "#EB5757",
                  width: { xs: "40%", md: "50%" },
                  color: "white",
                  "&.MuiButtonBase-root:hover": {
                    border: "1px solid #EB5757",
                    bgcolor: "#EB5757",
                    color: "white",
                  },
                }}
                variant="outlined"
                className="btn"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                disableRipple
                sx={{
                  pl: "25px",
                  pr: "25px",
                  pt: "10px",
                  pb: "10px",
                  fontSize: "16px",
                  lineHeight: "21px",
                  // fontWeight: 400,
                  borderRadius: "5px",
                  textTransform: "none",
                  color: "white",
                  bgcolor: "#27AE60",
                  border: "1px solid #27AE60",
                  width: { xs: "40%", md: "50%" },
                  "&.MuiButtonBase-root:hover": {
                    border: "1px solid #27AE60",
                    color: "white",
                    bgcolor: "#27AE60",
                  },
                }}
                variant="outlined"
                className="btn"
                onClick={handleSubmit}
                // type="submit"
              >
                Submit
              </Button>
            </Box>
          </DialogActions>
          {/* </form> */}
        </DialogContent>
      </Dialog>
      {price1.map((item, index) => (
        <Grid key={index} flex={"1 1 auto"} item>
          <Item
            sx={{
              p: "10px 0px 20px 0px",
              fontSize: "14px",
              color: "#000",
              boxShadow: "none",
              borderBottom: "2px solid #ECECEC",
              borderRadius: "0px",
              textAlign: "left",
              fontWeight: "700",
            }}>
            {item.text}
            <Typography
              sx={{
                fontSize: "12px",
                color: index === 0 ? "#FF2C2C" : "#707070",
                mt: "10px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}>
              {item.price + Number(base).toLocaleString() + "/"}
              {index === 1 ? (
                <Button
                  sx={{ textTransform: "none", minWidth: "100px" }}
                  onClick={() => {
                    // setOdometerValue(base)
                    handleSubmit1();
                  }}>
                  Set to base
                </Button>
              ) : (
                ""
              )}
              {index === 1 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "70%",
                  }}>
                  <Typography
                    onClick={() => setOpen(true)}
                    sx={{
                      width: { xs: "35%", lg: "40%", xl: "20%" },
                      cursor: "pointer",
                      textAlign: "center",
                      ml: { xs: "30px", lg: "100px", xl: "200px" },
                      border: "2px solid rgb(236, 236, 236)",
                      color: "#000000",
                      p: 2,
                    }}>
                    {Number(odoValue).toLocaleString()}
                  </Typography>
                </Box>
              ) : (
                ""
              )}
            </Typography>
            <LoaderComponent open={loading} />
          </Item>
        </Grid>
      ))}
      {/* <Grid item>
        <Item
          sx={{
            p: "10px 0px 20px 0px",
            fontSize: "14px",
            color: "#000",
            boxShadow: "none",
            borderBottom: "2px solid #ECECEC",
            borderRadius: "0px",
            textAlign: "left",
            fontWeight: "700",
          }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#707070",
              mt: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              width: "100%",
              // justifyContent: "space-between",
            }}>
            Base: 77,000 /
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => {
                setOdometerValue(0);
              }}>
              Set to base
            </Button>
            <Typography sx={{ width: "60%", display: "flex", justifyContent: "flex-end" }}>
              <TextField
                placeholder="Enter Miles"
                value={odoValue}
                onChange={handleChange}
                sx={{
                  p: "8px 20px 8px 20px",
                  borderRadius: "5px",
                  color: "#000",
                  fontWeight: "600",
                  width: "60%",
                }}
              />
            </Typography>
          </Typography>
        </Item>
      </Grid> */}
    </Grid>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addVIN: (data) => dispatch(addVIN(data)),
    editVehicleItem: (data) => dispatch(editVehicleItem(data)),
  };
};

export default connect(null, mapDispatchToProps)(Odometer);
