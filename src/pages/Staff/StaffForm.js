import * as yup from "yup";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { getstaffdata, updateStaff } from "../../redux/action/staff";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
// import LoaderComponent from "../Loader/LoaderComponent";
import { Button, Skeleton, Typography, TextField, FormLabel, Box, Select, MenuItem } from "@mui/material";
import { storage } from "../../config/storage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
// import { UserContext } from "../Main/Main";
// import { UserContext } from "../home/main";

const schema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter your email").email("Please enter valid email"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9]*$/, "Please enter valid phone number")
    .min(10, `Enter minimum 10 numbers `)
    .max(10, `Enter maximum 10 numbers`),
  type: yup.string().required("Please select type"),
  validate_Password: yup.boolean(),
  password: yup.string().when("validate_Password", {
    is: true,
    then: yup.string().nullable().required("Please enter your password.").min(8, "Password is too short - should be 8 char minimum."),
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
    pl: { xs: 1, md: 3 },
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

const StaffForm = ({ getstaffdata, updateStaff }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    staff_id: "",
    firstName: "",
    lastName: "",
    email: "",
    type: "",
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
      getStaff();
    } else {
      userData.validate_Password = true;
    }
  }, []);

  const getStaff = () => {
    let data = { staff_id: location.state };
    userData.validate_Password = false;
    getstaffdata(data).then((res) => {
      setLoading(false);
      if (res?.data?.status) {
        const result = res.data.data;
        setUserData({
          staff_id: result.staff_id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
          type: result.type,
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
    Object.assign(value, { staff_id: userData.staff_id });
    if (value.password === undefined || value.confirm_password === undefined) {
      value.password = "";
      delete value.confirm_password;
    }
    setLoading(true);
    delete value.validate_Password;
    updateStaff(value).then((res) => {
      setLoading(false);
      if (res?.data?.status) {
        toast.success(res?.data?.message);
        setTimeout(() => {
          navigate("/staff");
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
  return (
    <Box
      sx={{
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
      <form name="RegisterForm" onSubmit={formik.handleSubmit}>
        <Typography sx={Style.typographyStyle}>Staff</Typography>
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
          <Typography sx={Style.typographyStyle}>Staff information</Typography>
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
                      },
                    }}
                    color="primary"
                    placeholder="Enter First Name here"
                    sx={{
                      width: "100%",
                      border: "none",
                      fontSize: "14px",
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
                </Box>
              )}
            </Box>
            <Box sx={Style.rowBoxStyle}>
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={Style.inputStyle}>
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
                        fontSize: "14px",
                      },
                    }}
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter Phone Number here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                  {formik.errors.phone && formik.touched.phone ? <p style={Style.validationStyle}>{formik.errors.phone}</p> : null}
                </Box>
              )}
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && (
                <Box sx={Style.inputStyle}>
                  <FormLabel sx={Style.label}>
                    Type
                    <span style={Style.star}>*</span>
                  </FormLabel>
                  <Select
                    variant="filled"
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                    disableUnderline
                    SelectDisplayProps={{ style: { padding: 3, marginLeft: "10px", color: "#000000", backgroundColor: "transparent" } }}
                    MenuProps={{ disableScrollLock: true }}
                    inputProps={{
                      style: {
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        fontSize: "14px",
                      },
                    }}
                    sx={{
                      height: "53px",
                      minWidth: "200px",
                      fontSize: "14px",
                      fontWeight: "400",
                      width: "100%",
                      borderBottom: "none",
                    }}>
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="level 1 supervisor"> level 1 supervisor</MenuItem>
                    <MenuItem value="level 2 supervisor"> level 2 supervisor</MenuItem>
                  </Select>
                  {formik.errors.type && formik.touched.type ? <p style={Style.validationStyle}>{formik.errors.type}</p> : null}
                </Box>
              )}
              {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
              {!loading && <Box sx={Style.inputStyle}></Box>}
            </Box>
          </Box>
          {location.state && (
            <Typography sx={{ mb: 2, ml: { xs: 1, sm: 3 } }}>
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
                  pl: { xs: 1, md: 3 },
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
                            fontSize: "14px",
                          },
                        }}
                        autoComplete="off"
                        color="primary"
                        placeholder="Enter Password here"
                        sx={{
                          width: "100%",
                          border: "none",
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
            onClick={() => navigate("/staff")}>
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
    getstaffdata: (data) => dispatch(getstaffdata(data)),
    updateStaff: (userData) => dispatch(updateStaff(userData)),
  };
};

export default connect(null, mapDispatchToProps)(StaffForm);
