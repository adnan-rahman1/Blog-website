import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CopyrightIcon from "@mui/icons-material/Copyright";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import logo from "../../assets/logoshort.png";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const StyledLogo = styled("img")({
  margin: "auto",
  padding: "20px 20px 0 20px",
  width: "60px",
  height: "50px",
});

const StyledCommonHeaderTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[50],
  padding: "20px",
  paddingBottom: "5px",
}));
const StyledCommonTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  paddingLeft: "20px",
  "&:hover": {
    color: "#fff",
  },
}));
const StyledFooter = styled("footer")(({ theme }) => ({
  position: "relative",
  padding: "20px 0",
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.secondary.light,
}));

const StyledCopyRightSection = styled(Typography)(({ theme }) => ({
  marginTop: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[50],
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    marginLeft: "16px",
  },
}));

const StyledSocialIcon = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StyledFab = styled(Fab)(({theme}) => ({
  zIndex: 2,
  position: "fixed",
  bottom: 5,
  right: 0,
  border: "2px solid #fff",
  left: 0,
  boxShadow: 0,
  margin: "auto 15px 10px auto",
}));

const CustomFooter = (props) => {
  const theme = useTheme();
  const trigger = useScrollTrigger();

  return (
    <StyledFooter>
      <Zoom in={trigger} timeout={500}>
        <StyledFab
          color="primary"
          disableRipple
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          size="small"
        >
          <ArrowUpwardIcon />
        </StyledFab>
      </Zoom>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          style={{ textAlign: "center" }}
        >
          <StyledLogo src={logo} alt="Full Stack App" />
        </Grid>
        <Grid container item xs={11} sm={4} md={3} lg={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <StyledCommonHeaderTypo variant="h6">
              Useful Services
            </StyledCommonHeaderTypo>
            <Link to="/privacy-policy" target="_blank">
              <StyledCommonTypo variant="subtitle1">
                Privacy Policy
              </StyledCommonTypo>
            </Link>
            <Link to="/terms-conditions" target="_blank">
              <StyledCommonTypo variant="subtitle1">
                Terms & Conditions
              </StyledCommonTypo>
            </Link>
            <Link to="/cookies-policy" target="_blank">
              <StyledCommonTypo variant="subtitle1">
                Cookies Policy
              </StyledCommonTypo>
            </Link>
            <Link to="/disclaimer" target="_blank">
              <StyledCommonTypo variant="subtitle1">
                Disclaimer
              </StyledCommonTypo>
            </Link>
          </Grid>
        </Grid>
        <Grid container item xs={11} sm={3} md={3} lg={3}>
          {/* {!globalLoading && user.social != null && */}
          <Grid item item xs={12} sm={12} md={12} lg={12}>
            <StyledCommonHeaderTypo variant="h6">
              Follow me:
            </StyledCommonHeaderTypo>
            <Button
              style={{
                padding: 0,
                margin: 0,
                textTransform: "none",
                display: "block",
              }}
              variant="text"
              component="a"
              href="https://www.facebook.com"
              target="_blank"
            >
              <StyledCommonTypo variant="subtitle1">
                <StyledSocialIcon>
                  <FacebookIcon />
                  &nbsp;Facebook
                </StyledSocialIcon>
              </StyledCommonTypo>
            </Button>
            <Button
              style={{
                padding: 0,
                margin: 0,
                textTransform: "none",
                display: "block",
              }}
              variant="text"
              component="a"
              href="https://www.youtube.com"
              target="_blank"
            >
              <StyledCommonTypo variant="subtitle1">
                <StyledSocialIcon>
                  <YouTubeIcon />
                  &nbsp;Youtube
                </StyledSocialIcon>
              </StyledCommonTypo>
            </Button>
            <Button
              style={{
                padding: 0,
                margin: 0,
                textTransform: "none",
                display: "block",
              }}
              variant="text"
              component="a"
              href="https://www.github.com"
              target="_blank"
            >
              <StyledCommonTypo variant="subtitle1">
                <StyledSocialIcon>
                  <GitHubIcon />
                  &nbsp;Github
                </StyledSocialIcon>
              </StyledCommonTypo>
            </Button>
            <Button
              style={{
                padding: 0,
                margin: 0,
                textTransform: "none",
                display: "block",
              }}
              variant="text"
              component="a"
              href="https://www.linkedin.com"
              target="_blank"
            >
              <StyledCommonTypo variant="subtitle1">
                <StyledSocialIcon>
                  <LinkedInIcon />
                  &nbsp;LinkedIn
                </StyledSocialIcon>
              </StyledCommonTypo>
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={11} sm={4} md={3} lg={3}>
          <Grid item item xs={12} sm={12} md={12} lg={12}>
            <StyledCommonHeaderTypo variant="h6">
              Our Location:
            </StyledCommonHeaderTypo>

            <Link to="/about" target="_blank">
              <StyledCommonTypo variant="subtitle1">
                <StyledSocialIcon>
                  <ContactSupportIcon />
                  &nbsp;Contact Us
                </StyledSocialIcon>
              </StyledCommonTypo>
            </Link>
            <StyledCommonTypo variant="subtitle1">
              <StyledSocialIcon>
                <LocationOnIcon />
                &nbsp;New York, USA.
              </StyledSocialIcon>
            </StyledCommonTypo>
          </Grid>
        </Grid>

        <Divider
          sx={{
            marginTop: 5,
            background: theme.palette.grey[300],
            opacity: 0.3,
            width: "100%",
          }}
        />
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <StyledCopyRightSection>
            Copyright&nbsp;
            <CopyrightIcon />
            &nbsp;2022. All Rights Reserved.
          </StyledCopyRightSection>
        </Grid>
      </Grid>
    </StyledFooter>
  );
};
export default CustomFooter;
