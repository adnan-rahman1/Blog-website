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

import { useTheme } from "@mui/material/styles";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { showLoading } from "../../redux/actions/notificationAction";
import { userForgetPassword } from "../../api/user";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailIcon from "@mui/icons-material/Email";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import forgetPassBg from "../../assets/forgetpasswordbg.svg";

import styled from "@emotion/styled";
import TrackRoute from "../header/TrackRoute";

const StyledForm = styled("form")(({ theme }) => ({
  width: "41ch",
}));
const StyledTextField = styled(TextField)({
  marginTop: "10px",
});
const StyledBackButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [fieldValues, setFieldValues] = useState({
    email: "",
    showEmail: false,
    msg: "Please enter your email address",
    msgColor: "textSecondary",
  });

  const handleChange = (event) => {
    setFieldValues({ ...fieldValues, [event.target.name]: event.target.value });
  };

  const handleClickShowEmail = () => {
    setFieldValues({ ...fieldValues, showEmail: !fieldValues.showEmail });
  };
  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    dispatch(showLoading({ simpleLoading: true }));
    const response = await userForgetPassword(fieldValues.email);
    if (response.status == 200) {
      setFieldValues({
        ...fieldValues,
        email: "",
        msg: response.data.message,
        msgColor: theme.palette.success.main,
      });
      dispatch(showLoading({ simpleLoading: false }));
    } else if (response.status == 400) {
      dispatch(showLoading({ simpleLoading: false }));
      setFieldValues({
        ...fieldValues,
        email: "",
        msg: "Please enter a valid email address.",
        msgColor: theme.palette.error.main,
      });
    }
  };

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
          <Fade in={true} timeout={300}>
            <img
              src={forgetPassBg}
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
          xs={11}
          sm={8}
          md={5}
          lg={4}
        >
          <Grid item>
            <Fade in={true}>
              <Card
                variant="elevation"
                sx={{
                  borderTop: `3px solid ${theme.palette.primary.light}`,
                  margin: "8px",
                  [theme.breakpoints.down("sm")]: {
                    border: 0,
                    background: "rgba(0, 0, 0, 0)",
                    boxShadow: "none",
                  },
                }}
              >
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
                    title="Reset Password"
                    subheader={
                      <Typography
                        variant="body2"
                        style={{ color: `${fieldValues.msgColor}` }}
                      >
                        {fieldValues.msg}
                      </Typography>
                    }
                  />
                  <Box
                    sx={{
                      textAlign: "center",
                      display: { xs: "block", sm: "block", md: "none" },
                    }}
                  >
                    <img
                      src={forgetPassBg}
                      alt="signin"
                      style={{
                        width: "250px",
                        marginBottom: "16px",
                        marginTop: "16px",
                      }}
                    />
                  </Box>
                  <CardContent>
                    <div>
                      <StyledTextField
                        color="secondary"
                        size="small"
                        value={fieldValues.email}
                        name="email"
                        variant="outlined"
                        type={fieldValues.showEmail ? "email" : "password"}
                        onChange={handleChange}
                        autoComplete="off"
                        label="Email"
                        fullWidth
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
                    </div>
                  </CardContent>
                  <CardActions style={{ marginBottom: "10px" }}>
                    <StyledBackButton
                      disableElevation
                      disableRipple
                      size="large"
                      color="primary"
                      variant="contained"
                      component={Link}
                      to="/signin"
                      sx={{ textTransform: "none", marginLeft: "8px" }}
                      startIcon={<ArrowBackIcon />}
                    >
                      Back
                    </StyledBackButton>
                    <Button
                      disableElevation
                      disableRipple
                      size="large"
                      color="success"
                      sx={{
                        marginLeft: "auto",
                        textTransform: "none",
                        marginRight: "8px",
                      }}
                      variant="contained"
                      onClick={handleSubmit}
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </CardActions>
                </StyledForm>
              </Card>
            </Fade>
          </Grid>
        </Grid>
        <TrackRoute title="Forget Password" />
      </Grid>
    </>
  );
};
export default ForgetPassword;
