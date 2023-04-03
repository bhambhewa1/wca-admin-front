import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import CustomGrid from "../../../components/Grids/CustomGrid";
import InputField from "../../../components/Input/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Odometer from "./customs/Odometer";
import Colors from "./customs/Colors";
import OptionAndServiceStatus from "./customs/OptionAndServiceStatus";
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
const VehicleInformation = () => {
  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const price = [
    { price: "$10,000", text: "Trade price" },
    { price: "$10,000", text: "Target auction" },
    { price: "$10,000", text: "Target detail" },
    { price: "$10,000", text: "Manhiem" },
    { price: "$10,000", text: "Trade in fair" },
  ];

  const purchasePrice = [{ price: "", text: "Enter Purchase price" }, ""];
  return (
    <>
      <Box
        sx={{
          width: "100%",
          mt: "20px",
          borderTop: "2px solid #ECECEC",
        }}>
        <Grid container columnGap={"12px"}>
          {price.map((item, index) => (
            <Grid
              key={index}
              flex={"1 1 auto"}
              sx={{
                ml: "10px",
                mr: "10px",
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
                {item.price}
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
        <Grid container columnGap={"12px"} rowGap={"12px"}>
          {purchasePrice.map((item, index) => (
            <Grid
              key={index}
              flex={"1 1 auto"}
              sx={{
                ml: "10px",
                mr: "10px",
                borderRight: index === 0 ? "2px solid #ECECEC" : "",
                pt: "15px",
                pb: "10px",
                maxWidth: "50%",
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
                  <Box>
                    <Typography>Gibbrish</Typography>
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
          pt: "10px",
          pb: "10px",
        }}>
        <Grid columnGap={"12px"} rowGap={"12px"} flexDirection={"row"} display={"flex"}>
          <Grid
            flex={"1 1 auto"}
            sx={{
              ml: "10px",
              mr: "10px",
              borderRight: "2px solid #ECECEC",
              maxWidth: "50%",
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
              <Odometer />
              <Colors />
              <Box
                sx={{
                  width: "100%",
                  mt: "20px",
                  borderTop: "2px solid #ECECEC",
                  pt: "10px",
                  pb: "10px",
                }}>
                <Grid columnGap={"10px"} container>
                  <Grid
                    flex={"1 1 auto"}
                    sx={{
                      borderRight: "2px solid #ECECEC",
                      mt: "10px",
                    }}
                    item>
                    <Item
                      sx={{
                        p: "0px 20px 0px 0px",
                        fontSize: "14px",
                        color: "#000",
                        boxShadow: "none",
                        textAlign: "left",
                        borderRadius: "0px",
                      }}>
                      Vehicle History
                      <Typography>Frame damage</Typography>
                    </Item>
                  </Grid>
                  <Grid
                    flex={"1 1 auto"}
                    sx={{
                      pt: "15px",
                      ml: "30px",
                    }}
                    item>
                    <Item
                      sx={{
                        p: "0px",
                        fontSize: "14px",
                        color: "#000",
                        boxShadow: "none",
                        textAlign: "left",
                      }}>
                      Owners
                      <Typography sx={{ display: "flex", justifyContent: "space-between", width: "70%", mt: "10px" }}>Unknown</Typography>
                    </Item>
                  </Grid>
                </Grid>
              </Box>
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
          <Grid
            flex={"1 1 auto"}
            sx={{
              ml: "10px",
              mr: "10px",
              borderRight: "2px solid #ECECEC",
              maxWidth: "50%",
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
              <OptionAndServiceStatus />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default VehicleInformation;
