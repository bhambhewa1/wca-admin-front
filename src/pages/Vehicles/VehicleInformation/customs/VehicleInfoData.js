import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
// import CustomGrid from "../../../../components/Grids/CustomGrid";
import InputField from "../../../../components/Input/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ConditionDisclosure from "../customs/ConditionDisclosure";
import * as yup from "yup";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
}));
const defaultValues = {
  price: "",
};
const schema = yup.object().shape({
  email: yup.string().required("Please enter your email").email("Please enter valid email"),
  password: yup.string().required("Please enter your password.").min(8, "Password is too short - should be 8 char minimum."),
});
const VehicleInfoData = () => {
  const [vehicData, setVehicleData] = useOutletContext();
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const price = [
    { price: vehicData?.trade_price, text: "Trade price" },
    { price: "10,000", text: "Target auction" },
    { price: vehicData?.target_retail, text: "Target Retail" },
    { price: "10,000", text: "Manhiem" },
    { price: "10,000", text: "Trade in fair" },
  ];
  const image = [report1, report2, report3, report4, report5];
  const purchasePrice = [{ price: "", text: "Enter Purchase price" }, ""];
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
                ${item.price}
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
          {purchasePrice.map((item, index) => (
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
                  <Box sx={{ width: "70%" }}>
                    <InputField
                      control={control}
                      helperText={errors?.price?.message}
                      errors={!!errors.price}
                      type={"text"}
                      placeholder={""}
                      formlabel={item.text}
                      size={"14px"}
                      color={"#333333"}
                      name="price"
                      required={"*"}
                    />
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
              <Odometer odoValue={vehicData?.miles} />
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
    </>
  );
};

export default VehicleInfoData;
