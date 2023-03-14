import * as yup from "yup";
import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { getuserdata, updateUser } from "../../redux/action/profile/index";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Toastify from "../../components/SnackBar/Toastify";
// import LoaderComponent from "../Loader/LoaderComponent";
import { Button, Skeleton, Typography, TextField, FormLabel, Box } from "@mui/material";
import { storage } from "../../config/storage";
// import { UserContext } from "../Main/Main";
// import { UserContext } from "../home/main";

const schema = yup.object().shape({
  first_name: yup.string().required("Please enter your first name"),
  last_name: yup.string().required("Please enter your last name"),
  email: yup.string().required("Please enter your email").email("Please enter valid email"),
  phone: yup
    .string()
    .required("Please enter your phone number")
    .matches(/^[0-9\s]*$/, "Please enter valid phone number"),
  dob: yup.string().required("Please enter your Date of birth"),
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
    fontWeight: 400,
    fontSize: "20px",
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
    pb: 3,
    pl: { xs: 0, md: 3 },
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

const ProfilePage = ({ getuserdata, updateUser }) => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    validate_Password: false,
  });
  // const adminInfo = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // adminInfo?.setAdminName({
    //   n1: userData.first_name,
    //   n2: userData.last_name,
    // });
  }, [userData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // setLoading(true);
    // getuserdata().then((res) => {
    //   setLoading(false);
    //   if (res.data.status) {
    //     const result = res.data.data;
    //     storage.set.adminfirstname(result.user_details.first_name);
    //     storage.set.adminlastname(result.user_details.last_name);
    //     setUserData({
    //       first_name: result.user_details.first_name,
    //       last_name: result.user_details.last_name,
    //       dob: result.user_details.dob,
    //       email: result.user_details.email,
    //       phone: result.user_details.phone,
    //     });
    //   } else {
    //     toast.error(res.data.message)
    //   }
    // });
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
    if (!value.validate_Password) {
      delete value.password;
      delete value.confirm_password;
      delete value.validate_Password;
    } else {
      delete value.validate_Password;
    }
    setLoading(true);
    updateUser(value).then((res) => {
      if (res.data.status) {
        toast.success("Updated Successfully!!");
        getuserdata().then((res) => {
          setLoading(false);
          if (res.data.status) {
            const result = res.data.data.user_details;

            setUserData(result);
            storage.set.adminfirstname(res.data.data.user_details.first_name);
            storage.set.adminlastname(res.data.data.user_details.last_name);
          } else {
            res?.data?.errors?.map((item) => {
              toast.error(item);
            });
          }
        });
      } else {
        res?.data?.errors?.map((item) => {
          // toast.error(item);
        });
        setLoading(false);
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
          }}>
          <Typography sx={Style.typographyStyle}>Profile information</Typography>
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
                    name="first_name"
                    value={formik.values.first_name}
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
                    }}
                    autoComplete="false"
                  />
                  {formik.errors.first_name && formik.touched.first_name ? (
                    <p style={Style.validationStyle}>{formik.errors.first_name}</p>
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
                    name="last_name"
                    value={formik.values.last_name}
                    id="last_name"
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
                    autoComplete="false"
                    color="primary"
                    placeholder="Enter Last Name here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                  {formik.errors.last_name && formik.touched.last_name ? (
                    <p style={Style.validationStyle}>{formik.errors.last_name}</p>
                  ) : null}
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
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "20px", md: "20px" },
              fontWeight: { xs: "500", md: "700" },
              mb: 2,
              pl: { xs: 0, md: 3 },
            }}>
            Set Password
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
                <Box sx={Style.inputStyle}>
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
                      },
                    }}
                    color="primary"
                    placeholder="Enter confirm password here"
                    sx={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                  <p style={Style.validationStyle}>{formik.errors.confirm_password}</p>
                </Box>
              )}
            </Box>
          </Box>
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
            onClick={formik.handleReset}>
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
    getuserdata: () => dispatch(getuserdata()),
    updateUser: (userData) => dispatch(updateUser(userData)),
  };
};

export default connect(null, mapDispatchToProps)(ProfilePage);
