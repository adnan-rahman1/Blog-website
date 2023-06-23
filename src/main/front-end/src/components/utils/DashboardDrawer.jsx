import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Hidden from "@mui/material/Hidden";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CardHeader from "@mui/material/CardHeader";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "@emotion/styled";
import { authUser } from "../../redux/actions/authUserAciton";

// Icon Start
import TagIcon from "@mui/icons-material/Tag";
import CategoryIcon from "@mui/icons-material/Category";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { protectedRoutes } from "../header/ApiRoutes";
import { showNotification } from "../../redux/actions/notificationAction";
// Icon End

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  marginTop: "65px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  background: theme.palette.grey[50],
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DashboardDrawer = (props) => {
  const dashboardIcons = {
    Dashboard: <DashboardIcon fontSize="large" />,
    Posts: <ArticleIcon fontSize="large" />,
    Categories: <CategoryIcon fontSize="large" />,
    Tags: <TagIcon fontSize="large" />,
    Projects: <AccountTreeIcon fontSize="large" />,
    Photos: <PhotoSizeSelectActualIcon fontSize="large" />,
    Profile: <ManageAccountsIcon fontSize="large" />,
  };

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector(rs => rs.userReducer);
  const { currentRoute } = useSelector(rs => rs.pathReducer);

  const avatar =
    user.avatar == undefined
      ? ""
      : [user.avatar.location, user.avatar.name].join("/");

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    setOpen(false);
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
    <Hidden mdDown>
      <StyledDrawer open={open} variant="permanent">
        <DrawerHeader>
          {open && (
            <CardHeader
              style={{ paddingBottom: 0, paddingTop: 0 }}
              avatar={<Avatar alt="Adnan Rahman" src={avatar} />}
              title={[user.firstName, user.lastName].join(" ")}
            />
          )}
          <IconButton disableRipple onClick={handleDrawerClose}>
            {open ? (
              <ChevronLeftIcon />
            ) : (
              <Avatar alt="Remy Sharp" src={avatar} />
            )}
          </IconButton>
        </DrawerHeader>
        <List disablePadding={true}>
          {protectedRoutes.map((route, index) => (
            <ListItemButton
              onClick={() => setOpen(false)}
              component={Link}
              to={route.to}
              key={index}
              style={{
                color: `${
                  currentRoute != route.to
                    ? theme.palette.secondary.main
                    : theme.palette.background.default
                }`,
                background: `${
                  currentRoute === route.to
                    ? theme.palette.secondary.main
                    : "inherit"
                }`,
              }}
              selected={currentRoute == route.to}
            >
              <ListItemIcon
                style={{
                  color: `${
                    currentRoute != route.to
                      ? theme.palette.secondary.main
                      : theme.palette.background.default
                  }`,
                }}
              >
                {dashboardIcons[route.label]}
              </ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItemButton>
          ))}
          <ListItemButton
            style={{
              color: theme.palette.secondary.main,
            }}
            component={Link}
            to="/"
            onClick={handleLogout}
          >
            <ListItemIcon style={{ color: theme.palette.secondary.main }}>
              <ExitToAppIcon fontSize="large" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </StyledDrawer>
    </Hidden>
  );
};

export default DashboardDrawer;
