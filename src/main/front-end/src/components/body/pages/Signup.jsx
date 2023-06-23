import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useTheme } from "@mui/material/styles";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import signupBg from "../../../assets/signup-bg.svg";

import styled from "@emotion/styled";
import TrackRoute from "../../header/TrackRoute";

const StyledSignUpBtn = styled(Button)(({ theme }) => ({
  marginLeft: "auto",
  textTransform: "none",
  marginRight: "8px",
}));

const StyledSignInBtn = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  textTransform: "none",
  marginLeft: "8px",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderTop: `3px solid ${theme.palette.primary.light}`,
  marginTop: "60px",
  [theme.breakpoints.down("md")]: {
    margin: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    border: 0,
    background: "rgba(255, 255, 255, 0)",
    boxShadow: "none",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const Signup = () => {
  const theme = useTheme();

  const [fieldValues, setFieldValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showEmail: false,
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setFieldValues({ ...fieldValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFieldValues({ ...fieldValues, showPassword: !fieldValues.showPassword });
  };
  const handleClickShowEmail = () => {
    setFieldValues({ ...fieldValues, showEmail: !fieldValues.showEmail });
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        alignContent="center"
        sx={{
          minHeight: "93vh",
          [theme.breakpoints.down("sm")]: {
            minHeight: "70vh",
          },
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
          <Fade timeout={300} in={true}>
            <img
              src={signupBg}
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
                  titleTypographyProps={{ variant: "h6" }}
                  title="Sign up"
                  subheader={
                    <Typography variant="body2" color="error">
                      Signup is disabled by admin
                    </Typography>
                  }
                  style={{ paddingBottom: 0 }}
                />
                <Box
                  sx={{
                    textAlign: "center",
                    display: { xs: "block", sm: "block", md: "none" },
                  }}
                >
                  <img
                    src={signupBg}
                    alt="signin"
                    style={{
                      width: "200px",
                      marginBottom: "8px",
                      marginTop: "16px",
                    }}
                  />
                </Box>
                <form noValidate autoComplete="off">
                  <CardContent>
                    <Grid item container spacing={1}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          color="secondary"
                          size="small"
                          variant="outlined"
                          autoComplete="on"
                          label="First Name"
                          fullWidth
                          onChange={handleChange("firstName")}
                        />
                      </Grid>
                      <Grid item item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          color="secondary"
                          size="small"
                          variant="outlined"
                          autoComplete="on"
                          label="Last Name"
                          sx={{
                            [theme.breakpoints.down("md")]: { marginTop: 1 },
                          }}
                          fullWidth
                          onChange={handleChange("lastName")}
                        />
                      </Grid>
                    </Grid>
                    <Grid item>
                      <TextField
                        color="secondary"
                        size="small"
                        sx={{
                          marginTop: 2,
                          marginBottom: 2,
                        }}
                        variant="outlined"
                        autoComplete="on"
                        label="Email"
                        fullWidth
                        type={fieldValues.showEmail ? "email" : "password"}
                        onChange={handleChange("email")}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                disableRipple
                                onClick={handleClickShowEmail}
                                onMouseDown={handleMouseDown}
                              >
                                {fieldValues.showEmail ? (
                                  <DraftsIcon />
                                ) : (
                                  <EmailIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item container spacing={1}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          color="secondary"
                          size="small"
                          variant="outlined"
                          autoComplete="off"
                          label="Password"
                          fullWidth
                          type={fieldValues.showPassword ? "text" : "password"}
                          onChange={handleChange("password")}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  disableRipple
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDown}
                                >
                                  {fieldValues.showPassword ? (
                                    <VisibilityIcon />
                                  ) : (
                                    <VisibilityOffIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                          color="secondary"
                          size="small"
                          sx={{
                            [theme.breakpoints.down("md")]: { marginTop: 1 },
                          }}
                          variant="outlined"
                          autoComplete="off"
                          label="Confirm Password"
                          fullWidth
                          type="password"
                          onChange={handleChange("confirmPassword")}
                        />
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disableFocusRipple
                              disableRipple
                              checked={false}
                              name="aggrement"
                              color="secondary"
                            />
                          }
                          label={
                            <Typography color="secondary" variant="subtitle1">
                              I have read the agreement
                            </Typography>
                          }
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions style={{ marginBottom: "10px" }}>
                    <StyledSignInBtn
                      disableElevation
                      disableRipple
                      size="large"
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/signin"
                      aria-label="settings"
                      startIcon={<LoginIcon />}
                    >
                      Sign in
                    </StyledSignInBtn>
                    <span></span>
                    <StyledSignUpBtn
                      disableElevation
                      disableRipple
                      size="large"
                      color="success"
                      variant="contained"
                      endIcon={<VpnKeyIcon />}
                    >
                      Register
                    </StyledSignUpBtn>
                  </CardActions>
                </form>
              </StyledCard>
            </Fade>
          </Grid>
        </Grid>
        <TrackRoute title="Sign up" />
      </Grid>
    </>
  );
};
export default Signup;
