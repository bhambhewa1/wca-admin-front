/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from "yup";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { getuserdata, updateUser } from "../../redux/action/profile";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
// import LoaderComponent from "../Loader/LoaderComponent";
import { Button, Skeleton, Typography, TextField, FormLabel, Box } from "@mui/material";
import { storage } from "../../config/storage";
import { UserContext } from "../../App";
// import { UserContext } from "../Main/Main";
// import { UserContext } from "../home/main";

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter your first name"),
  lastName: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter your email").email("Please enter valid email"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9\s]*$/, "Please enter valid phone number"),
  validate_Password: yup.boolean(),
  password: yup.string().when("validate_Password", {
    is: true,
    then: yup.string().required("Please enter your password.").min(8, "Password is too short - should be 8 chars minimum."),
  }),
  confirm_password: yup.string().when("validate_Password", {
    is: true,
    then: yup
      .string()
      .required("Confirm your password.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  }),
});
const Style = {
  label: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    color: "#333333",
  },
  typographyStyle: {
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: { xs: "30px", md: "60px" },
    letterSpacing: "0em",
    textAlign: "center",
    color: "#3D2E57",
    display: "flex",
    // pb: 2,
    pl: 3.5,
  },
  inputStyle: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "48%",
      lg: "49%",
      xl: "49%",
    },
    mb: 2,
  },
  star: {
    color: "red",
  },
  rowBoxStyle: {
    width: "100%",
    display: "flex",
    fontSize: "18px",
    fontWeight: "500",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
  },
  validationStyle: {
    color: "red",
    margin: "10px",
  },
};

const ProfilePage = ({ getuserdata, updateUser }) => {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    validate_Password: false,
  });
  const adminInfo = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [validate_Password, setValidate_Password] = useState(false);
  useEffect(() => {
    adminInfo?.setAdminName({
      n1: userData.firstName,
      n2: userData.lastName,
    });
  }, [userData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    let staff_id = { staff_id: storage.fetch.staffId() };
    getuserdata(staff_id).then((res) => {
      setLoading(false);
      if (res?.data?.status) {
        const result = res.data.data;
        storage.set.adminfirstname(result.firstName);
        storage.set.adminlastname(result.lastName);
        setUserData({
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
        });
      } else {
        toast.error(res?.data?.message);
      }
    });
  }, []);

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
    // adminInfo?.setAdminName({
    //   n1: userData.first_name,
    //   n2: userData.last_name,
    // });

    Object.assign(value, { staff_id: userData.staff_id });
    if (value.password === undefined || value.confirm_password === undefined) {
      value.password = null;
      delete value.confirm_password;
    }
    setLoading(true);
    updateUser(value).then((res) => {
      setLoading(false);
      if (res.data.status) {
        toast.success("Updated Successfully!!");
        getuserdata().then((res) => {
          setLoading(false);
          if (res.data.status) {
            const result = res.data.data;
            setUserData({
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              phone: result.phone,
            });
            storage.set.adminfirstname(res.data.data.firstName);
            storage.set.adminlastname(res.data.data.lastName);
          } else {
            setLoading(false);
            res?.data?.errors?.map((item) => {
              toast.error(item);
            });
          }
        });
      } else {
        res?.data?.errors?.map((item) => {
          // toast.error(item);
        });
      }
    });
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
        <Typography sx={Style.typographyStyle}>Profile</Typography>
        <Box
          sx={{
            width: "100%",
            borderBottom: "3px solid rgba(0, 0, 0, 0.06)",
            borderTop: "3px solid rgba(0, 0, 0, 0.06)",
            pb: 1,
          }}>
          <Typography sx={Style.typographyStyle}>Profile information</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: 3,
              pr: 3,
              // alignItems:'center'
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
                      mt: "10px",
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
                      mt: "10px",
                    }}
                  />
                  {formik.errors.lastName && formik.touched.lastName ? <p style={Style.validationStyle}>{formik.errors.lastName}</p> : null}
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
                    type="phone"
                    variant="filled"
                    InputProps={{ disableUnderline: true }}
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
                      mt: "10px",
                    }}
                  />
                  {formik.errors.phone && formik.touched.phone ? <p style={Style.validationStyle}>{formik.errors.phone}</p> : null}
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
                      mt: "10px",
                    }}
                  />
                  {formik.errors.email && formik.touched.email ? <p style={Style.validationStyle}>{formik.errors.email}</p> : null}
                </Box>
              )}
            </Box>
            <Typography sx={{ mb: 2 }}>
              <input
                type="checkbox"
                // name="validate_Password"
                // id="validate_Password"
                onChange={() => {
                  setValidate_Password(!validate_Password);
                }}
                value={validate_Password}
              />
              Do you want to change the password?
            </Typography>
            {validate_Password && (
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "20px", md: "20px" },
                    fontWeight: { xs: "500", md: "700" },
                    color: "#3D2E57",
                    mb: 2,
                  }}>
                  Set Password
                </Typography>

                <Box sx={Style.rowBoxStyle}>
                  {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
                  {!loading && (
                    <Box sx={Style.inputStyle}>
                      <FormLabel sx={Style.label}>
                        New Password
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
                          mt: "10px",
                        }}
                      />
                      <p style={Style.validationStyle}>{formik.errors.password}</p>
                    </Box>
                  )}
                  {loading && <Skeleton sx={Style.inputStyle} variant="rectangular" height={50} />}
                  {!loading && (
                    <Box sx={Style.inputStyle}>
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
                          mt: "10px",
                        }}
                      />
                      <p style={Style.validationStyle}>{formik.errors.confirm_password}</p>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "35%", lg: "40%" },
              float: "right",
              display: "flex",
              justifyContent: { xs: "space-between", md: "flex-end" },
              pt: 4,
              pb: 2,
              pr: 3,
            }}>
            <Button
              disableRipple
              sx={{
                mr: { md: 3 },
                pl: "35px",
                pr: "35px",
                pt: "10px",
                pb: "10px",
                fontSize: "16px",
                lineHeight: "21px",
                fontWeight: 400,
                borderRadius: "5px",
                textTransform: "none",
                border: "1px solid #EB5757",
                bgcolor: "#EB5757",
                color: "white",
                "&.MuiButtonBase-root:hover": {
                  border: "1px solid #EB5757",
                  bgcolor: "#EB5757",
                  color: "white",
                },
              }}
              variant="outlined"
              className="btn"
              onClick={formik.handleReset}>
              Cancel
            </Button>
            <Button
              disableRipple
              sx={{
                pl: "35px",
                pr: "35px",
                pt: "10px",
                pb: "10px",
                fontSize: "16px",
                lineHeight: "21px",
                fontWeight: 400,
                borderRadius: "5px",
                textTransform: "none",
                color: "white",
                bgcolor: "#27AE60",
                border: "1px solid #27AE60",
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
        </Box>
      </form>
      <Toastify />
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getuserdata: (data) => dispatch(getuserdata(data)),
    updateUser: (userData) => dispatch(updateUser(userData)),
  };
};

export default connect(null, mapDispatchToProps)(ProfilePage);
