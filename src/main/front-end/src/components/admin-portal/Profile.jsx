import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrors,
  showLoading,
  showNotification,
} from "../../redux/actions/notificationAction";
import { updateUserInfo } from "../../api/user";
import { uploadImage } from "../../api/picture";
import { authUser } from "../../redux/actions/authUserAciton";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styled from "@emotion/styled";
import TrackRoute from "../header/TrackRoute";

import facebook from "../../assets/facebook.png";
import artstation from "../../assets/artstation.png";
import hackerrank from "../../assets/hackerrank.png";
import linkedin from "../../assets/linkedin.png";
import stack from "../../assets/stack.png";
import github from "../../assets/github.png";
import youtube from "../../assets/youtube.png";

const StyledForm = styled("form")(({ theme }) => ({
  padding: "20px 30px",
  margin: "auto",
  [theme.breakpoints.down("sm")]: {
    padding: 0,
  },
}));
const StyledInput = styled("input")({
  display: "none",
});

const socialLinks = [
  { name: "facebook", src: facebook },
  { name: "youtube", src: youtube },
  { name: "stackoverflow", src: stack },
  { name: "github", src: github },
  { name: "linkedin", src: linkedin },
  { name: "hackerrank", src: hackerrank },
  { name: "artstation", src: artstation },
];

const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useSelector((rs) => rs.userReducer);
  const { imageUploading, err, errMsg } = useSelector(
    (rs) => rs.notificationReducer
  );

  const [state, setState] = useState({
    userInfo: {
      ...user,
    },
    confirmPassword: "",
    selectedSocialItem: "github",
  });

  const handleFormData = (event) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [event.target.name]: event.target.value,
      },
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectedSocialItem = (event) => {
    setState({ ...state, selectedSocialItem: event.target.value });
  };
  const handleChangeSocialTextField = (event) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        social: {
          ...state.userInfo.social,
          [event.target.name]: event.target.value,
        },
      },
    });
  };

  const handleImageUpload = async (event) => {
    dispatch(showLoading({ imageUploading: true }));
    const storeImgStruct = { section: "profile", directory: "profile" };
    const res = await uploadImage(event.target.files[0], storeImgStruct);
    if (res.status == 200) {
      setState({
        ...state,
        userInfo: { ...state.userInfo, avatar: res.data.picture },
      });
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "success",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );

      dispatch(showLoading({ imageUploading: false }));
    } else if (res.status == 400) {
      dispatch(showLoading({ imageUploading: false }));
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "error",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
    }
  };

  const handleOnUpdate = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await updateUserInfo(state.userInfo);
    if (res.status == 200) {
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "success",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
      dispatch(authUser({ user: res.data.user }));
      dispatch(showErrors({ err: false, errMsg: {} }));
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showErrors({ err: true, errMsg: { ...res.data } }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const socialMenuItem = () => (
    <Select
      IconComponent=""
      color="secondary"
      autoWidth
      disableUnderline={true}
      variant="standard"
      value={state.selectedSocialItem}
      onChange={handleSelectedSocialItem}
    >
      {socialLinks.map((s, index) => (
        <MenuItem disableRipple key={index} value={s.name} label={s.name}>
          <img src={s.src} width="24px" height="24px" />
        </MenuItem>
      ))}
    </Select>
  );

  return (
    <Grid
      sx={{
        minHeight: "94vh",
      }}
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Grid item xs={11} sm={10} md={9} lg={5}>
        {user != null && (
          <Card variant="outlined" style={{ margin: "16px 0" }}>
            <Avatar
              sx={{
                position: "relative",
                margin: "auto",
                marginTop: "16px",
                width: theme.spacing(20),
                height: theme.spacing(20),
              }}
              src={[
                state.userInfo.avatar.location,
                state.userInfo.avatar.name,
              ].join("/")}
              alt="Adnan Rahman"
            />
            <CardHeader
              style={{ textAlign: "center" }}
              title={`${state.userInfo.firstName} ${state.userInfo.lastName}`}
              titleTypographyProps={{ variant: "h4" }}
              subheader="Full-Stack Software Engineer"
            />
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                {state.userInfo.about}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid
                container
                alignItems="center"
                style={{ textAlign: "center" }}
                direction="row"
                justifyContent="center"
              >
                <Grid item>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.name}
                      component="a"
                      href={user.social[social.name]}
                      target="_blank"
                    >
                      <img
                        src={social.src}
                        alt={social.name}
                        height="32px"
                        width="32px"
                      />
                    </IconButton>
                  ))}
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        )}
      </Grid>
      <Grid item xs={11} sm={10} md={9} lg={5}>
        <Hidden smDown>
          <Toolbar />
        </Hidden>
        {user != null && (
          <Card
            variant="outlined"
            sx={{
              marginBottom: "24px",
            }}
          >
            <StyledForm noValidate autoComplete="off">
              <CardHeader
                style={{ textAlign: "center" }}
                titleTypographyProps={{ variant: "h4" }}
                title="Account Details"
                subheader="Update your personal information if needed"
              />
              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      color="secondary"
                      error={errMsg.firstName && err}
                      onChange={handleFormData}
                      size="small"
                      name="firstName"
                      value={state.userInfo.firstName}
                      type="text"
                      autoComplete="off"
                      label="First Name"
                      helperText={
                        errMsg.firstName
                          ? errMsg.firstName
                          : "Enter your first name"
                      }
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      color="secondary"
                      error={errMsg.lastName && err}
                      onChange={handleFormData}
                      size="small"
                      name="lastName"
                      value={state.userInfo.lastName}
                      type="text"
                      autoComplete="off"
                      label="Last Name"
                      helperText={
                        errMsg.lastName
                          ? errMsg.lastName
                          : "Enter your last name"
                      }
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="secondary"
                      error={errMsg.email && err}
                      onChange={handleFormData}
                      size="small"
                      name="email"
                      value={state.userInfo.email}
                      type="email"
                      autoComplete="off"
                      label="Email"
                      helperText={
                        errMsg.email ? errMsg.email : "Enter your email address"
                      }
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      color="secondary"
                      error={
                        state.userInfo.password != state.confirmPassword
                          ? true
                          : false
                      }
                      onChange={handleFormData}
                      size="small"
                      name="password"
                      value={state.userInfo.password}
                      autoComplete="off"
                      label="New password"
                      helperText={
                        state.userInfo.password !== state.confirmPassword
                          ? "password doesn't match"
                          : "enter your new password"
                      }
                      fullWidth
                      type="password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="secondary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      name="confirmPassword"
                      value={state.confirmPassword}
                      color="secondary"
                      error={
                        state.userInfo.password != state.confirmPassword
                          ? true
                          : false
                      }
                      onChange={handleFormData}
                      size="small"
                      autoComplete="off"
                      label="Confirm New Password"
                      helperText={
                        state.userInfo.password != state.confirmPassword
                          ? "password doesn't match"
                          : "confirm your new password"
                      }
                      fullWidth
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledInput
                      onChange={handleImageUpload}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        size="medium"
                        color="secondary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <AddAPhotoIcon fontSize="large" />
                      </IconButton>
                    </label>
                    <label htmlFor="contained-button-file">
                      &nbsp;
                      {imageUploading ? "Uploadig........" : "Upload photo"}
                      &nbsp;
                    </label>
                    {imageUploading && (
                      <CircularProgress
                        style={{
                          color: theme.palette.primary.main,
                          marginBottom: "-4px",
                        }}
                        value={90}
                        size={19}
                        thickness={9}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextField
                      color="secondary"
                      error={errMsg.about && err}
                      value={state.userInfo.about}
                      multiline
                      onChange={handleFormData}
                      rows={5}
                      size="small"
                      name="about"
                      autoComplete="off"
                      label="About"
                      helperText={
                        errMsg.about ? errMsg.about : "Write about yourself"
                      }
                      fullWidth
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size="small"
                      color="secondary"
                      value={state.userInfo.social[state.selectedSocialItem]}
                      name={state.selectedSocialItem}
                      variant="outlined"
                      type="text"
                      autoComplete="off"
                      label="Social Link"
                      fullWidth
                      onChange={handleChangeSocialTextField}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {socialMenuItem()}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                <Button
                  size="large"
                  disabled={state.userInfo.password !== state.confirmPassword}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    marginBottom: "16px",
                    marginRight: "8px",
                  }}
                  startIcon={<SaveIcon />}
                  onClick={handleOnUpdate}
                >
                  Save
                </Button>
              </CardActions>
            </StyledForm>
          </Card>
        )}
      </Grid>
      <TrackRoute title="Manage Account" />
    </Grid>
  );
};

export default Profile;
