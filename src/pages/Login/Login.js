import { Box, Typography, Backdrop, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import * as yup from "yup";
import InputField from "../../components/Input/InputField";
import Toastify from "../../components/SnackBar/Toastify";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getLogin } from "../../redux/action/login/index";
import { connect } from "react-redux";
import "./Login.css";
import { storage } from "../../config/storage";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email").email("Please enter valid email"),
  password: yup.string().required("Please enter your password.").min(8, "Password is too short - should be 8 chars minimum."),
});

const defaultValues = {
  email: "",
  password: "",
  //   password: "",
  //   remember: true,
};

const Login = ({ getLogin }) => {
  const [open, setOpen] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { control, formState, handleSubmit, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const onSubmit = async (model) => {
    setloader(true);
    let item = model;
    let user_type = { user_type: 1 };
    Object.assign(item, user_type);
    getLogin(item).then((res) => {
      setloader(false);
      if (res.data.status) {
        toast.success(res?.data?.message);
        storage.set.authToken(res?.data?.token);
        setTimeout(() => {
          setloader(false);
          navigate("/profile");
        }, 1000);
      } else {
        res?.data?.errors?.map((item) => {
          return toast.error(item);
        });
        // toast.error(res?.data?.errors);
        // storage.set.userId(res?.data?.data?.id);
        setTimeout(() => {
          if (res?.data?.is_email_verified === 0) {
            navigate("/");
          }
          setloader(false);
        }, 1000);
      }
    });
  };

  return (
    <>
      <Box sx={style.outBox}>
        <Box sx={style.mainBox}>
          <Box sx={{ width: "50%", height: "100vh", display: { xs: "none", sm: "flex" } }}>
            <img
              alt="logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              // className="rightBox"
              src={require("../../assests/loginBigImg.png")}
            />
          </Box>

          <Box sx={style.leftBox}>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <form
              name="LoginForm"
              className="loginForm"
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
              }}>
              <img
                alt="logo"
                // className="logoSize"
                style={{ width: "130px", height: "82px" }}
                src={require("../../assests/logo@2x.png")}
              />
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "35px" },
                  lineHeight: {
                    xs: "29px",
                    sm: "29px",
                    md: "30px",
                    lg: "31px",
                  },
                  fontWeight: "500",
                  font: "normal normal medium 35px/43px Gilroy",
                  letterSpacing: "0px",
                  color: "#F15F23",
                  mt: 6,
                  mb: 2,
                }}>
                Welcome to WCA
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "24px" },
                  mb: 2,
                }}>
                Sign in to access your WCA Account
              </Typography>

              <InputField
                control={control}
                helperText={errors?.email?.message}
                errors={!!errors.email}
                type={"text"}
                placeholder={"Please enter email address"}
                formlabel="Email Address"
                size={{ xs: "20px", md: "22px", lg: "24px" }}
                color={"#333333"}
                name="email"
                required={"*"}
              />

              <Box sx={{ height: "25px" }} />

              <InputField
                control={control}
                helperText={errors?.password?.message}
                errors={!!errors.password}
                variant="filled"
                placeholder={"Enter your password"}
                formlabel="Password"
                size={{ xs: "20px", md: "22px", lg: "24px" }}
                color={"#333333"}
                name="password"
                type={"password"}
                required={"*"}
              />

              {/* <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}>
                <Link
                  to="/ForgetPassword"
                  className="fontlink1"
                  style={{
                    fontWeight: 400,
                    color: "#4969B2",
                    textDecoration: "none",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}>
                  Forgot Password
                </Link>
              </Box> */}

              <Button
                disableRipple
                sx={{
                  width: "100%",
                  "&.MuiButtonBase-root:hover": {
                    bgcolor: "#FF8D2A",
                    border: "1.5px solid #FF8D2A",
                  },
                  bgcolor: "#FF8D2A",
                  color: "#FFFFFF",
                  border: "1.5px solid #FF8D2A",
                  mb: 2,
                  mt: 4,
                  borderRadius: "5px",
                  fontSize: { xs: "16px", md: "18px", lg: "20px" },
                  fontWeight: 400,
                  textTransform: "none",
                }}
                // color="warning"
                variant="outlined"
                type="submit">
                Sign In
              </Button>
            </form>
            <Toastify />
          </Box>
        </Box>
      </Box>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getLogin: (item) => dispatch(getLogin(item)),
  };
}
export default connect(null, mapDispatchToProps)(Login);

const style = {
  outBox: {
    width: "100%",
    bgcolor: "#F3F0EE",
    overFlow: "hidden",
    // pt: 5,
    // pb: 5,
  },
  mainBox: {
    maxWidth: "1530px",
    width: "100%",
    minHeight: "500px",
    ml: "auto",
    mr: "auto",
    bgcolor: "white",
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: { xs: "center", sm: "flex-end" },
  },
  leftBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "100%", sm: "50%" },
  },
};
