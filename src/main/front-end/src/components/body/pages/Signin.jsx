import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { authUser } from "../../../redux/actions/authUserAciton";
import {
  showLoading,
  showNotification,
} from "../../../redux/actions/notificationAction";
import { authenticateUser, getCurrentUser } from "../../../api/user";
import signinBg from "../../../assets/signin-bg.svg";

import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styled from "@emotion/styled";
import TrackRoute from "../../header/TrackRoute";

const StyledForm = styled("form")(({ theme }) => ({
  width: "45ch",
  [theme.breakpoints.down("sm")]: {
    width: "41ch",
  },
}));

const StyledSignInBtn = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  textTransform: "none",
  marginRight: "8px",
}));

const StyledSignUpBtn = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  textTransform: "none",
  marginLeft: "8px",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const StyledForgetPasswordLink = styled(Link)(({ theme }) => ({
  marginTop: "8px",
  marginLeft: "auto",
  marginRight: 0,
  color: theme.palette.secondary.main,
  "&:hover": {
    textDecoration: "underline",
  },
  "&:active": {
    color: theme.palette.primary.dark,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: "60px",
  borderTop: `3px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("md")]: {
    marginTop: "8px",
    marginBottom: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    border: 0,
    background: "rgb(255, 255, 255, 0)",
    boxShadow: "none",
  },
}));

const Signin = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    dispatch(showLoading({ simpleLoading: true }));
    const response = await authenticateUser(email, password);
    if (response.status == 200) {
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "success",
          msgText: response.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );

      if (rememberMe) setCookieInTheBrowser(response.data.token);
      execAfterSuccessResponse(response.data, 2000);
    } else {
      dispatch(showLoading({ simpleLoading: false }));
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "error",
          msgText: "Invalid Email and Password",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
      setEmail("");
      setPassword("");
    }
  };

  const execAfterSuccessResponse = (res, delay) => {
    dispatch(
      authUser({
        user: res.user,
        authenticated: res.authenticated,
        token: res.token,
      })
    );
    dispatch(showLoading({ simpleLoading: false }));
    setRedirect(true);
  };

  const setCookieInTheBrowser = (tkn) => {
    let date = new Date();
    localStorage.setItem("remember-me", tkn);
    date.setDate(date.getDate() + 7);
  };

  useEffect(async () => {
    let tkn =
      localStorage.getItem("remmeber-me") != ""
        ? localStorage.getItem("remember-me")
        : "";
    const response = await getCurrentUser(tkn);
    if (response.data.authenticated) {
      execAfterSuccessResponse(response.data, 1);
    }
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        alignContent="center"
        sx={{
          minHeight: "93vh",
          [theme.breakpoints.down("sm")]: {
            minHeight: "70vh"
          }
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={6}
          lg={5}
          sx={{ display: { xs: "none", sm: "none", md: "block" } }}
        >
          <Fade in={true} timeout={300}>
            <img
              src={signinBg}
              alt="signin"
              style={{
                width: "800px",
                marginBottom: "16px",
                marginTop: "16px",
                filter: "drop-shadow(15px 10px 10px rgba(0, 0, 0, 0.5))",
              }}
            />
          </Fade>
        </Grid>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          item
          xs={12}
          sm={8}
          md={5}
          lg={4}
        >
          <Grid item>
            <Fade in={true}>
              <StyledCard variant="elevation">
                <StyledForm noValidate autoComplete="off">
                  <CardHeader
                    avatar={
                      <StyledAvatar aria-label="recipe">
                        <PersonOutlineIcon
                          style={{
                            color: "#fafafa",
                          }}
                        />
                      </StyledAvatar>
                    }
                    style={{ paddingBottom: 0 }}
                    titleTypographyProps={{ variant: "h6" }}
                    title="Sign in"
                    subheader={
                      <Typography variant="body2" color="textSecondary">
                        Please enter your credential
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box
                      sx={{
                        textAlign: "center",
                        display: { xs: "block", sm: "block", md: "none" },
                      }}
                    >
                      <img
                        src={signinBg}
                        alt="signin"
                        style={{
                          width: "200px",
                          marginBottom: "16px",
                          marginTop: "8px",
                        }}
                      />
                    </Box>
                    <div>
                      <TextField
                        key="email"
                        color="secondary"
                        size="small"
                        value={email}
                        name="email"
                        type={showEmail ? "email" : "password"}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="off"
                        label="Email"
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                disableRipple
                                onClick={() => setShowEmail(!showEmail)}
                                onMouseDown={handleMouseDown}
                              >
                                {showEmail ? <DraftsIcon /> : <EmailIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        color="secondary"
                        size="small"
                        value={password}
                        name="password"
                        autoComplete="off"
                        style={{
                          marginTop: 16,
                        }}
                        label="Password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                disableRipple
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDown}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <FormGroup row style={{ marginTop: 8 }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            disableFocusRipple
                            disableRipple
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            name="rememberMe"
                            color="secondary"
                          />
                        }
                        label="Remember me"
                      />
                      <StyledForgetPasswordLink to="/forget-password">
                        Forgot Password?
                      </StyledForgetPasswordLink>
                    </FormGroup>
                  </CardContent>
                  <CardActions style={{ marginBottom: "8px" }}>
                    <StyledSignUpBtn
                      disableElevation
                      size="large"
                      color="success"
                      variant="contained"
                      disableRipple
                      component={Link}
                      to="/signup"
                      aria-label="settings"
                      startIcon={<VpnKeyIcon />}
                    >
                      Register
                    </StyledSignUpBtn>
                    <StyledSignInBtn
                      disableRipple
                      disableElevation
                      size="large"
                      color="primary"
                      variant="contained"
                      onClick={handleSubmit}
                      endIcon={<LoginIcon />}
                    >
                      Sign in
                    </StyledSignInBtn>
                  </CardActions>
                </StyledForm>
              </StyledCard>
            </Fade>
          </Grid>
        </Grid>
        <TrackRoute title="Sign in"/>
        {redirect && <Navigate to="/dashboard" />}
      </Grid>
    </>
  );
};

export default Signin;
