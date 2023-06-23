import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Slide from "@mui/material/Slide";
import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import bg from "../../../assets/about_bg.svg";
import aboutHeroBg from "../../../assets/about-hero-bg.svg";
import aboutHeroBgWht from "../../../assets/about-hero-bg-wht.svg";
import aboutHeroBgMobile from "../../../assets/about-hero-bg-mobile.svg";
import aboutHeroBgMobileWht from "../../../assets/about-hero-bg-mobile-wht.svg";
import contactUsBg from "../../../assets/contact-us-bg.svg";
import SendIcon from "@mui/icons-material/Send";
import TrackRoute from "../../header/TrackRoute";
import styled from "@emotion/styled";


import facebook from "../../../assets/facebook.png";
import artstation from "../../../assets/artstation.png";
import hackerrank from "../../../assets/hackerrank.png";
import linkedin from "../../../assets/linkedin.png";
import stack from "../../../assets/stack.png"
import github from "../../../assets/github.png";
import youtube from "../../../assets/youtube.png"

const socialLinks = [
  { name: "facebook", src:facebook },
  { name: "youtube", src:youtube },
  { name: "stackoverflow", src:stack },
  { name: "github", src:github },
  { name: "linkedin", src:linkedin },
  { name: "hackerrank", src:hackerrank },
  { name: "artstation", src:artstation }
];

const StyledFormSection = styled("form")(({ theme }) => ({
  "& label.Mui-focused": {
    color: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `2px solid ${theme.palette.background.paper}`,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.background.paper,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.background.paper,
    },
  },
  padding: "24px",
  margin: "auto",
  [theme.breakpoints.down("md")]: {
    padding: "16px 0",
  },
}));
const StyledUserInfoCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginBottom: "30px",
    marginTop: "60px",
  },
}));

const StyledAboutGridSection = styled(Box)(({ theme }) => ({
  minHeight: "996px",
  width: "100vw",
  marginTop: "-60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  backgroundImage:
    theme.palette.mode === "dark"
      ? `url(${aboutHeroBg})`
      : `url(${aboutHeroBgWht})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  [theme.breakpoints.down("md")]: {
    backgroundImage:
      theme.palette.mode === "dark"
        ? `url(${aboutHeroBgMobile})`
        : `url(${aboutHeroBgMobileWht})`,
    backgroundSize: "cover",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "100vh"
  },
}));

const StyledContactFormImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginBottom: 0,
    marginTop: "20px",
    minWidth: "300px"
  },
}));

const StyledContactFormCard = styled(Card)(({ theme }) => ({
  marginTop: "16px",
  marginBottom: "16px",
  background: "inherit",
  border: 0,
  borderRadius: 0,
  borderLeft: `0.01px solid ${theme.palette.background.paper}`,
  [theme.breakpoints.down("md")]: {
    border: 0,
  },
}));
const StyledSocialIcon = styled(Icon)(({ theme }) => ({
  background: theme.palette.secondary.main,
  padding: 8,
  borderRadius: 50,
}));

const About = () => {
  const theme = useTheme();
  const themeMode = theme.palette.mode;

  const { user } = useSelector((rs) => rs.userReducer);

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Fade in={true} timeout={500}>
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {user != null && (
              <StyledAboutGridSection>
                <Card
                  variant="outlined"
                  style={{
                    fontWeight: "bold",
                    background: "unset", 
                    border: 0,
                    width: "max-content",
                  }}
                >
                  <Grow in={true} timeout={500}>
                    <Avatar
                      sx={{
                        border: "1px solid #3CC766",
                        margin: "auto",
                        width: theme.spacing(18),
                        height: theme.spacing(18),
                      }}
                      src={
                        user != null
                          ? [user.avatar.location, user.avatar.name].join("/")
                          : ""
                      }
                      alt="Adnan Rahman"
                    />
                  </Grow>
                  <Fade in={true} timeout={500}>
                    <CardHeader
                      sx={{
                        margin: "auto",
                        textAlign: "center",
                        paddingBottom: 0,
                      }}
                      title={
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "1.9rem",
                            color: theme.palette.secondary.main,
                            [theme.breakpoints.down("sm")]: {
                              fontSize: "1.5rem",
                            },
                          }}
                          fontWeight="500"
                        >
                          {[user.firstName, user.lastName].join(" ")}
                        </Typography>
                      }
                      subheader="Full-Stack Software Engineer"
                      subheaderTypographyProps={{
                        sx: {
                          background: "inherit",
                          color: theme.palette.success.main,
                          fontSize: "1.3rem",
                        },
                      }}
                    />
                  </Fade>
                  <CardActions>
                    <Grid
                      container
                      alignItems="center"
                      style={{ textAlign: "center" }}
                      direction="row"
                      justifyContent="center"
                    >
                      <Grid item>
                        {socialLinks.map((social, index) => (
                          <Slide
                            direction={index % 2 == 0 ? "left" : "right"}
                            in={true}
                            key={social.name}
                            timeout={(3 + index) * 30 + 300}
                          >
                            <IconButton
                              key={social.name}
                              component="a"
                              href={user.social[social.name]}
                              target="_blank"
                            >
                              <img src={social.src} height="32px" width="32px" alt={social.name} />
                            </IconButton>
                          </Slide>
                        ))}
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </StyledAboutGridSection>
            )}
          </Grid>
        </Grid>
      </Fade>
      <Hidden mdDown>
        <div style={{ margin: "65px" }}></div>
      </Hidden>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        alignContent="center"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Hidden mdDown>
          <Grid item xs={11} sm={10} md={6} lg={5}>
            <StyledUserInfoCard elevation={0} style={{ background: "inherit" }}>
              <img src={bg} alt="About me background" style={{ minWidth: "300px" }} />
            </StyledUserInfoCard>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={10} md={5} lg={4}>
          <StyledUserInfoCard
            variant="outlined"
            style={{ border: 0, background: "inherit" }}
          >
            <CardHeader
              title="Little bit about me..."
              titleTypographyProps={{
                variant: "h4",
                padding: 0,
                color:
                  themeMode === "dark" ? theme.palette.success.main : "primary",
              }}
            />
            {user != null && (
              <CardContent>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  style={{ fontSize: "1.3rem" }}
                >
                  {user.about}
                </Typography>
              </CardContent>
            )}
          </StyledUserInfoCard>
        </Grid>
      </Grid>
      <Hidden mdDown>
        <div style={{ margin: "65px" }}></div>
      </Hidden>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={12}
        lg={12}
        alignItems="center"
        justifyContent="space-around"
        style={{
          background: "rgba(131, 209, 134, 0.85)",
        }}
      >
        <Grid item xs={11} sm={11} md={6} lg={8}>
          <StyledContactFormImg src={contactUsBg} alg="contact background" />
        </Grid>
        <Grid item xs={11} sm={8} md={5} lg={4}>
          <StyledContactFormCard variant="outlined">
            <StyledFormSection noValidate autoComplete="off">
              <CardHeader
                style={{
                  textAlign: "center",
                  color: theme.palette.secondary.main,
                }}
                titleTypographyProps={{ variant: "h4" }}
                title="Contact Form"
                subheader="Get in touch with me"
              />
              <CardContent>
                <TextField
                variant="filled"
                  size="small"
                  sx={{ marginBottom: "16px" }}
                  type="text"
                  autoComplete="off"
                  label="Full Name"
                  fullWidth
                />
                <TextField
                variant="filled"
                  size="small"
                  sx={{ marginBottom: "16px" }}
                  type="email"
                  autoComplete="off"
                  label="Email"
                  fullWidth
                />
                <TextField
                variant="filled"
                  autoComplete="off"
                  label="Message"
                  fullWidth
                  multiline
                  rows={6}
                  type="text"
                />
              </CardContent>
              <CardActions style={{ justifyContent: "center" }}>
                <Button
                  disableRipple
                  sx={{
                    textTransform: "none",
                    background:
                      themeMode == "dark"
                        ? theme.palette.background.paper
                        : theme.palette.secondary.light,
                    "&:hover": {
                      background: theme.palette.primary.light,
                    },
                  }}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  <Typography variant="h5">Send Message</Typography>
                </Button>
              </CardActions>
            </StyledFormSection>
          </StyledContactFormCard>
        </Grid>
      </Grid>
      <TrackRoute title="About" />
    </Grid>
  );
};

export default About;
