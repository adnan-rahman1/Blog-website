import { cloneElement } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgress from "@mui/material/LinearProgress";
import HomeIcon from "@mui/icons-material/Home";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import logo from "../../assets/logo.png";
import whtLogo from "../../assets/wht_logo.png";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import MobileHeader from "./MobileHeader";
import LaptopHeader from "./LaptopHeader";
import Toast from "../utils/Toast";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 3 : 0,
  });
}

const StyledLaptopLogo = styled("img")({
  paddingTop: "16px",
  paddingBottom: "10px",
  width: "180px",
  height: "42px",
  marginLeft: "-15px",
});

const CustomHeader = (props) => {
  const { toggleColorMode } = props;

  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ElevationScroll>
        <AppBar
          sx={{
            zIndex: 1201,
            background: "inherit"
          }}
          enableColorOnDark
          position="sticky"
        >
          <Container>
            <Toolbar>
              <Link to="/">
                <StyledLaptopLogo
                  src={themeMode == "light" ? logo : whtLogo}
                  alt="Full Stack App"
                />
              </Link>
              {currentRoute != "/signin" &&
              currentRoute != "/signup" &&
              currentRoute != "/forget-password" ? (
                matches ? (
                  <MobileHeader toggleColorMode={toggleColorMode} />
                ) : (
                  <LaptopHeader toggleColorMode={toggleColorMode} />
                )
              ) : (
                <>
                  <IconButton
                    disableTouchRipple
                    color="secondary"
                    component={Link}
                    to="/"
                    sx={{
                      ml: "auto",
                      mr: "5px",
                    }}
                  >
                    <HomeIcon style={{ fontSize: 27 }} />
                  </IconButton>
                  <IconButton
                    disableTouchRipple
                    onClick={toggleColorMode}
                    color="secondary"
                    sx={{
                      [theme.breakpoints.down("md")]: {
                        marginRight: "-20px",
                      },
                    }}
                  >
                    {theme.palette.mode === "dark" ? (
                      <LightModeIcon />
                    ) : (
                      <DarkModeIcon />
                    )}
                  </IconButton>
                </>
              )}
            </Toolbar>
          </Container>
          {simpleLoading && (
            <LinearProgress
              color={themeMode == "light" ? "primary" : "secondary"}
              style={{width: "100%", height: "2.5px" }}
            />
          )}
        </AppBar>
      </ElevationScroll>
      <Toast />
    </>
  );
};

export default CustomHeader;
