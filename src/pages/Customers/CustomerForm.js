import * as yup from "yup";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { getCustomerdata, updateCustomer } from "../../redux/action/customers";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
// import LoaderComponent from "../Loader/LoaderComponent";
import { styled } from "@mui/material/styles";
import { Button, Skeleton, Typography, TextField, FormLabel, Box, Select, Switch, FormControlLabel } from "@mui/material";
import { storage } from "../../config/storage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
// import { UserContext } from "../Main/Main";
// import { UserContext } from "../home/main";

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  emailValidation: yup.boolean(),
  phoneValidation: yup.boolean(),
  email: yup
    .string()
    // .when("emailValidation", {
    //     is: true,
    //     then: yup.string()
    .required("Please enter your email")
    .email("Please enter valid email"),
  // }),
  phone: yup
    .string()
    // .when("phoneValidation", {
    //     is: true,
    //     then: yup
    //     .string()
    .required("Please enter your phone number")
    .matches(/^[0-9]*$/, "Please enter valid phone number")
    .min(10, `Enter minimum 10 numbers `)
    .max(10, `Enter maximum 10 numbers`),
  // }),
  address: yup.string().required("Please Enter address"),
  validate_Password: yup.boolean(),
  password: yup.string().when("validate_Password", {
    is: true,
    then: yup.string().required("Please enter your password.").min(8, "Password is too short - should be 8 char minimum."),
  }),
  confirm_password: yup.string().when("validate_Password", {
    is: true,
    then: yup
      .string()
      .required("Confirm your password.")
      .min(8, "Password is too short - should be 8 char minimum.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
});
const Style = {
  label: {
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "16px",
    color: "#333333",
  },
  typographyStyle: {
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: { xs: "29px", md: "42px" },
    letterSpacing: "0em",
    textAlign: "center",
    color: "#000000",
    display: "flex",
    pb: 1,
    pt: 1,
    pl: { xs: 0, md: 3.5 },
  },
  inputStyle: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "30%",
      lg: "30%",
      xl: "30%",
    },
    mb: 2,
  },
  star: {
    color: "red",
  },
  rowBoxStyle: {
    width: "95%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
  },
  validationStyle: {
    color: "red",
    margin: "10px",
  },
};

const StaffForm = ({ getCustomerdata, updateCustomer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    customer_id: "",
    firstName: "",
    lastName: "",
    // emailValidation:false,
    email: "",
    address: "",
    // phoneValidation:false,
    phone: "",
    password: "",
    confirm_password: "",
    validate_Password: false,
  });
  const [loading, setLoading] = useState(false);
  //   useEffect(() => {
  //   // adminInfo?.setAdminName({
  //   //   n1: userData.first_name,
  //   //   n2: userData.last_name,
  //   // });
  // }, [])
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.state) {
      // userData.validate_Password = false
      setLoading(true);
      getCustomer();
    } else {
      userData.validate_Password = true;
    }
  }, []);

  const getCustomer = () => {
    let data = { customer_id: location.state };
    userData.validate_Password = false;
    getCustomerdata(data).then((res) => {
      setLoading(false);
      if (res?.data?.status) {
        const result = res.data.data;
        setUserData({
          customer_id: result.customer_id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
          address: result.address,
        });
      } else {
        res?.data?.errors.map((error) => {
          toast.error(error);
        });
      }
    });
  };
  const formik = useFormik({
    initialValues: userData,
    validationSchema: schema,
    onSubmit: (value) => {
      setUserData(value);
      onSubmit(value);
    },
    enableReinitialize: true,
  });
  const onSubmit = (value) => {
    if (!location.state) {
      userData.validate_Password = true;
    }
    Object.assign(value, { customer_id: userData.customer_id });
    Object.assign(value, { user_type: 2 });
    if (value.password === undefined || value.confirm_password === undefined) {
      value.password = "";
      delete value.confirm_password;
    }
    setLoading(true);
    delete value.validate_Password;
    updateCustomer(value).then((res) => {
      setLoading(false);
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          navigate("/customers");
        }, 2000);
      } else {
        value.validate_Password = true;
        res.errors.map((error) => {
          toast.error(error);
        });
      }
    });
    // }
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      name="emailValidation"
      disableRipple
      {...props}
      checked={formik.values.emailValidation}
      onChange={formik.handleChange}
    />
  ))(({ theme }) => ({
    width: 32,
    height: 20,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 16,
      height: 16,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  const IOSSwitch1 = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      name="phoneValidation"
      disableRipple
      {...props}
      checked={formik.values.phoneValidation}
      onChange={formik.handleChange}
    />
  ))(({ theme }) => ({
    width: 32,
    height: 20,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 16,
      height: 16,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <Box
      sx={{
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
      <form name="RegisterForm" onSubmit={formik.handleSubmit}>
        <Typography sx={Style.typographyStyle}>{location.state ? "Edit : Customer" : "Add New : Customer"}</Typography>
        <Box
          sx={{
            width: "100%",
            borderBottom: "3px solid rgba(0, 0, 0, 0.06)",
            borderTop: "3px solid rgba(0, 0, 0, 0.06)",
            // pb: 1,
            "&.css-drk5z1-MuiPaper-root": {
              padding: 0,
            },
          }}>
          <Typography sx={Style.typographyStyle}>Customer information</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Box sx={Style.rowBoxStyle}>
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={Style.inputStyle}>
                  <FormLabel sx={Style.label}>
                    First Name
                    <span style={Style.star}>*</span>
                  </FormLabel>

                  <TextField
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    type="text"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                        fontSize: "14px",
                      },
                    }}
                    color="primary"
                    placeholder="Enter First Name here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                    autoComplete="false"
                  />
                  {formik.errors.firstName && formik.touched.firstName ? (
                    <p style={Style.validationStyle}>{formik.errors.firstName}</p>
                  ) : null}
                </Box>
              )}
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={Style.inputStyle}>
                  <FormLabel sx={Style.label}>
                    Last Name
                    <span style={Style.star}>*</span>
                  </FormLabel>

                  <TextField
                    name="lastName"
                    value={formik.values.lastName}
                    id="lastName"
                    onChange={formik.handleChange}
                    type="text"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                        fontSize: "14px",
                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter Last Name here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                  {formik.errors.lastName && formik.touched.lastName ? <p style={Style.validationStyle}>{formik.errors.lastName}</p> : null}
                </Box>
              )}
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={Style.inputStyle}>
                  <FormLabel sx={Style.label}>
                    Email
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <TextField
                    name="email"
                    value={formik.values.email}
                    id="email"
                    autoComplete="false"
                    onChange={formik.handleChange}
                    type="text"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                        fontSize: "14px",
                      },
                    }}
                    color="primary"
                    placeholder="Enter Email here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                  {formik.errors.email && formik.touched.email ? <p style={Style.validationStyle}>{formik.errors.email}</p> : null}
                  {/* <FormControlLabel
                                control={<IOSSwitch sx={{ m: 1 }}  />}
                                label="Required Valiidation?"
                            /> */}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                pl: 3,
                pr: 3,
              }}>
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
                  <FormLabel sx={Style.label}>
                    Phone Number
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <TextField
                    name="phone"
                    value={formik.values.phone}
                    id="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="phone"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter Phone Number here"
                    sx={{
                      width: "100%",
                      border: "none",
                      fontSize: "14px",
                    }}
                  />
                  {formik.errors.phone && formik.touched.phone ? <p style={Style.validationStyle}>{formik.errors.phone}</p> : null}
                  {/* <FormControlLabel
                                control={<IOSSwitch1 sx={{ m: 1 }}  />}
                                label="Required Valiidation?"
                            /> */}
                </Box>
              )}
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={{ width: { xs: "100%", sm: "65%" } }}>
                  <FormLabel sx={Style.label}>
                    Address
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <TextField
                    name="address"
                    value={formik.values.address}
                    id="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="address"
                    variant="filled"
                    InputProps={{ disableUnderline: true, pt: "10px" }}
                    inputProps={{
                      style: {
                        paddingTop: "16px",
                        paddingBottom: "15px",
                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter address here"
                    sx={{
                      width: "100%",
                      border: "none",
                      fontSize: "14px",
                    }}
                  />
                  {formik.errors.address && formik.touched.address ? <p style={Style.validationStyle}>{formik.errors.address}</p> : null}
                </Box>
              )}
            </Box>
          </Box>
          {location.state && (
            <Typography sx={{ mb: 2, ml: 3, mt: 1 }}>
              <input
                type="checkbox"
                name="validate_Password"
                id="validate_Password"
                onChange={formik.handleChange}
                checked={formik.values.validate_Password}
                value={formik.values.validate_Password}
              />
              <label for="validate_Password"> Do you want to change the password?</label>
            </Typography>
          )}
          {formik.values.validate_Password && (
            <>
              <Typography
                sx={{
                  fontSize: { xs: "20px", md: "20px" },
                  fontWeight: { xs: "500", md: "700" },
                  mb: 2,
                  mt: 1,
                  pl: { xs: 0, md: 3.5 },
                  color: "#000000",
                }}>
                Password
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Box sx={Style.rowBoxStyle}>
                  {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
                  {!loading && (
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "47%",
                          lg: "47%",
                          xl: "47%",
                        },
                        mb: 2,
                      }}>
                      <FormLabel sx={Style.label}>
                        Password
                        <span style={Style.star}>*</span>
                      </FormLabel>
                      <TextField
                        name="password"
                        value={formik.values.password}
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="password"
                        variant="filled"
                        InputProps={{ disableUnderline: true, pt: "10px" }}
                        inputProps={{
                          style: {
                            paddingTop: "16px",
                            paddingBottom: "15px",
                          },
                        }}
                        autoComplete="off"
                        color="primary"
                        placeholder="Enter Password here"
                        sx={{
                          width: "100%",
                          border: "none",
                          fontSize: "14px",
                        }}
                      />
                      {/* {formik.errors.password && formik.touched.password ?  ( */}
                      <p style={Style.validationStyle}>{formik.errors.password}</p>
                      {/* ) : null} */}
                    </Box>
                  )}
                  {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
                  {!loading && (
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "100%",
                          md: "47%",
                          lg: "47%",
                          xl: "47%",
                        },
                        mb: 2,
                      }}>
                      <FormLabel sx={Style.label}>
                        Confirm Password
                        <span style={Style.star}>*</span>
                      </FormLabel>
                      <TextField
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        id="confirm_password"
                        onChange={formik.handleChange}
                        type="password"
                        variant="filled"
                        autoComplete="false"
                        InputProps={{ disableUnderline: true, pt: "10px" }}
                        inputProps={{
                          style: {
                            paddingTop: "16px",
                            paddingBottom: "15px",
                            fontSize: "14px",
                          },
                        }}
                        color="primary"
                        placeholder="Enter confirm password here"
                        sx={{
                          width: "100%",
                          border: "none",
                        }}
                      />
                      {/* {formik.errors.confirm_password && formik.touched.confirm_password ?  ( */}
                      <p style={Style.validationStyle}>{formik.errors.confirm_password}</p>
                      {/* ) : null} */}
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "35%", lg: "40%" },
            float: "right",
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
            pt: 4,
            pb: 3,
            pr: 3,
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
              fontSize: "18px",
              lineHeight: "21px",
              fontWeight: 400,
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
            onClick={() => navigate("/customers")}>
            Cancel
          </Button>
          <Button
            disableRipple
            sx={{
              pl: "25px",
              pr: "25px",
              pt: "10px",
              pb: "10px",
              fontSize: "18px",
              lineHeight: "21px",
              fontWeight: 400,
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
            type="submit">
            Save
          </Button>
        </Box>
      </form>
      <Toastify />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomerdata: (data) => dispatch(getCustomerdata(data)),
    updateCustomer: (userData) => dispatch(updateCustomer(userData)),
  };
};

export default connect(null, mapDispatchToProps)(StaffForm);
