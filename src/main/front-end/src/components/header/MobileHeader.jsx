import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import logo from "../../assets/logo.png";
import whtLogo from "../../assets/wht_logo.png";

import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { generalRoutes, protectedRoutes } from "./ApiRoutes";
import { showNotification } from "../../redux/actions/notificationAction";
import { authUser } from "../../redux/actions/authUserAciton";

const StyledMobileLogo = styled("img")({
  width: "160px",
  height: "42px",
  paddingTop: "16px", 
  paddingBottom: "10px",
});

const MobileHeader = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeMode = theme.palette.mode;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDashboard, setOpenDashboard] = useState(false);

  const { user, authenticated, token } = useSelector((rs) => rs.userReducer);
  const { currentRoute } = useSelector((rs) => rs.pathReducer);
  const avatar =
    user == null ? "" : [user.avatar.location, user.avatar.name].join("/");

  const handleLogout = () => {
    setOpenDrawer(false);
    dispatch(authUser({ token: "", authenticated: false }));
    dispatch(
      showNotification({
        open: true,
        varient: "filled",
        msgType: "success",
        msgText: "You are successfully logged out",
        anchorOrigin: { vertical: "top", horizontal: "center" },
      })
    );
  };

  return (
    <>
      <SwipeableDrawer
        PaperProps={{
          sx: {
            width: "70%",
            "&.MuiDrawer-paper": {
              background: theme.palette.background.default,
            },
          },
        }}
        style={{ zIndex: 1202 }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Link
          to="/"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: "100%",
            background: "rgba(47, 46, 65, 0.0)",
          }}
        >
          <StyledMobileLogo
            src={themeMode == "light" ? logo : whtLogo}
            alt="Full Stack App"
          />
        </Link>
        <List style={{ paddingTop: 0 }}>
          {authenticated && token !== "" ? (
            <>
              <ListItemButton
                disableRipple
                onClick={() => setOpenDashboard(!openDashboard)}
              >
                <ListItemAvatar style={{ minWidth: "40px" }}>
                  <Avatar
                    alt="Adnan Rahman"
                    src={avatar}
                    style={{ height: "30px", width: "30px" }}
                  />
                </ListItemAvatar>
                <ListItemText style={{ color: theme.palette.secondary.main }}>
                  {user != null
                    ? `${user.firstName} ${user.lastName}`
                    : "Adnan Rahman"}
                </ListItemText>
                {openDashboard ? (
                  <ArrowDropDownIcon />
                ) : (
                  <ArrowDropUpIcon />
                )}
              </ListItemButton>
              <Collapse in={openDashboard} timeout={120} unmountOnExit>
                <List
                  disablePadding
                >
                  {protectedRoutes.map((route, index) => (
                    <ListItemButton
                      disableRipple
                      style={{
                        background:
                          route.to == currentRoute
                            ? theme.palette.secondary.main
                            : theme.palette.background.default,
                        paddingLeft: theme.spacing(5),
                      }}
                      key={index}
                      component={Link}
                      to={route.to}
                      onClick={() => setOpenDrawer(false)}
                      selected={route.to === currentRoute}
                    >
                      <ListItemIcon style={{ color: route.to == currentRoute ? theme.palette.background.default : theme.palette.secondary.main }}>
                        {route.ico}
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          color:
                            route.to != currentRoute
                              ? theme.palette.secondary.main
                              : theme.palette.background.default,
                        }}
                        key={index}
                      >
                        {route.label}
                      </ListItemText>
                    </ListItemButton>
                  ))}
                  <ListItemButton
                    style={{
                      background: theme.palette.background.default,
                      paddingLeft: theme.spacing(5),
                    }}
                    component={Link}
                    to="/"
                    onClick={() => handleLogout()}
                  >
                    <ListItemIcon>
                      <ExitToAppIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      style={{ color: theme.palette.secondary.main }}
                    >
                      Logout
                    </ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ) : null}
          {generalRoutes.map((route, index) => (
            <ListItemButton
              style={{
                background:
                  route.to == currentRoute
                    ? theme.palette.primary.main
                    : "rgba(57, 67, 183, 0)",
              }}
              disableRipple
              key={index}
              component={Link}
              to={route.to}
              onClick={() => setOpenDrawer(false)}
              selected={route.to == currentRoute}
            >
              <ListItemIcon
                sx={{
                  color:
                    route.to === currentRoute
                      ? "#fafafa"
                      : theme.palette.secondary.main,
                }}
              >
                {route.ico}
              </ListItemIcon>
              <ListItemText
                key={index}
                sx={{
                  fontSize: "1rem",
                  color:
                    route.to === currentRoute
                      ? "#fafafa"
                      : theme.palette.secondary.main,
                }}
              >
                {route.label}
              </ListItemText>
            </ListItemButton>
          ))}
        </List>

        {!authenticated && !token && (
          <ButtonGroup
            variant="contained"
            sx={{
              justifyContent: "center",
              marginTop: "auto",
              marginBottom: 2,
            }}
            disableRipple
            disableElevation
            aria-label="contained secondary button group"
            color="secondary"
          >
            <Button
              disableElevation
              disableRipple
              size="large"
              color="primary"
              sx={{
                textTransform: "none",
              }}
              startIcon={<LoginIcon />}
              component={Link}
              to="/signin"
            >
              Sign in
            </Button>
            <Button
             disableElevation
              disableRipple
              size="large"
              color="success"
              sx={{
                textTransform: "none",
              }}
              endIcon={<VpnKeyIcon />}
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
          </ButtonGroup>
        )}
      </SwipeableDrawer>

      <IconButton
        disableRipple
        sx={{ ml: "auto", mr: "5px" }}
        onClick={props.toggleColorMode}
        color="secondary"
      >
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      <IconButton
        color="error"
        sx={{
          marginRight: "-20px",
        }}
        disableTouchRipple
        onClick={() => setOpenDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default MobileHeader;
