import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../redux/actions/authUserAciton";

import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "@emotion/react";
import { generalRoutes } from "./ApiRoutes";
import { showNotification } from "../../redux/actions/notificationAction";

const LaptopHeader = (props) => {
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { user, authenticated, token } = useSelector(
    (state) => state.userReducer
  );
  const { currentRoute } = useSelector((state) => state.pathReducer);
  const avatar =
    user == null ? "" : [user.avatar.location, user.avatar.name].join("/");

  const activeTabColor =
    themeMode === "dark"
      ? theme.palette.success.main
      : theme.palette.primary.main;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleLogout = () => {
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
    setOpen(false);
  };

  const anchorRef = useRef(null);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (
      prevOpen.current === true &&
      open === false &&
      anchorRef.current != null
    ) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Tabs
        sx={{
          marginLeft: "auto",
          textAlign: "right",
        }}
        value={false}
      >
        {generalRoutes.map((route, index) => (
          <Tab
            sx={{
              fontSize: "1rem",
              textTransform: "none",
              color:
                route.to === currentRoute
                  ? activeTabColor
                  : theme.palette.secondary.light,
            }}
            key={index}
            disableRipple
            label={route.label}
            value={route.to}
            component={Link}
            to={route.to}
          />
        ))}
      </Tabs>
      {!authenticated && (
        <>
          <Button
            disableRipple
            sx={{
              color: theme.palette.secondary.light,
              fontSize: "1rem",
              textTransform: "none",
              padding: "12px 16px",
              "&:hover": {
                background: "inherit",
              },
            }}
            variant="text"
            startIcon={<LoginIcon />}
            component={Link}
            to="/signin"
          >
            Sign in
          </Button>
          <Button
            disableRipple
            sx={{
              textTransform: "none",
              borderRadius: "30px",
              padding: "6px 16px",
              marginLeft: "16px",
              color: "#fff",
              "&:hover": {
                background: theme.palette.success.main,
              },
            }}
            color="primary"
            variant="contained"
            startIcon={<VpnKeyIcon />}
            component={Link}
            to="/signup"
          >
            Register
          </Button>
        </>
      )}
      {authenticated && token !== "" && (
        <>
          <Button
            variant="outlined"
            style={{
              background: theme.palette.background.default,
              marginLeft: "16px",
              borderRadius: "20px",
              border: `2px solid ${theme.palette.primary.main}`,
              paddingLeft: 5,
              textTransform: "none",
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar
              alt="Remy Sharp"
              src={avatar}
              style={{ height: "30px", width: "30px" }}
            />
            <Typography
              color="secondary"
              variant="subtitle1"
              style={{ paddingLeft: "5px" }}
            >
              {user != null && `${user.firstName} ${user.lastName}`}
            </Typography>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper
                  style={{
                    background: theme.palette.background.default,
                    color: theme.palette.secondary.main,
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem
                        component={Link}
                        to="/dashboard"
                        onClick={handleClose}
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to="/dashboard/profile"
                      >
                        Profile
                      </MenuItem>
                      <MenuItem component={Link} to="/" onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
      <IconButton
        disableTouchRipple
        sx={{ ml: "16px" }}
        onClick={props.toggleColorMode}
        color="secondary"
      >
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </>
  );
};

export default LaptopHeader;
