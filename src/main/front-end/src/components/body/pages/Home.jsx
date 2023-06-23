import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";

import bg from "../../../assets/bg-front.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  showLoading,
  showNotification,
} from "../../../redux/actions/notificationAction";
import { getFeaturedPosts } from "../../../api/Post";

import TrackRoute from "../../header/TrackRoute";
import styled from "@emotion/styled";

// Home Page Images Images
import hero2 from "../../../assets/heroimg-2.svg";
import mongodb from "../../../assets/mongodb.svg";
import mysql from "../../../assets/mysql.svg";
import ansible from "../../../assets/ansible.svg";
import reactjs from "../../../assets/reactjs.svg";
import springboot from "../../../assets/springboot.svg";
import docker from "../../../assets/docker.svg";
import aws from "../../../assets/aws.svg";
import kubernetes from "../../../assets/kubernetes.svg";
import terraform from "../../../assets/terraform.svg";
import jenkin from "../../../assets/jenkin.svg";
import jest from "../../../assets/jest.svg";
import cucumber from "../../../assets/cucumber.svg";
import nginx from "../../../assets/nginx.svg";
import git from "../../../assets/git.svg";
import nodejs from "../../../assets/nodejs.svg";
import redis from "../../../assets/redis.svg";
import vault from "../../../assets/vault.svg";
import postgresql from "../../../assets/postgresql.svg";
import desktop from "../../../assets/desktop.svg";
import tablet from "../../../assets/tablet.svg";
import smartphone from "../../../assets/smartphone.svg";
// Home Page Images

import Marquee from "react-fast-marquee";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const HeroSection = styled(Box)({
  backgroundImage: `url(${bg})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  minHeight: "100vh",
  display: "flex",
  direction: "column",
  justifyContent: "center",
  alignItems: "center",
});
const HeroTextSection = styled(Box)(({ theme }) => ({
  borderRadius: 5,
  textAlign: "center",
  fontSize: "2rem",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "43%",
  // background: "#2f2e41",
  padding: 10,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
    top: "45%",
  },
  color: "rgba(255, 255, 255, 0.8)",
}));
const HeroButtonSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  fontSize: "2rem",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "48%",
  padding: 10,
  paddingLeft: 0,
  [theme.breakpoints.down("md")]: {
    left: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    top: "50%",
  },
}));

const FeaturedPost = styled(Typography)({
  opacity: 0.7,
  padding: "32px 0",
  textAlign: "center",
});

const StyledCard = styled(Card)(({ theme }) => ({
  ":hover": {},
}));
const StyledCardTitleTypography = styled(Typography)({
  fontWeight: 500,
  paddingBottom: "16px",
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Home = () => {
  const theme = useTheme();
  const xxScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const xsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const { user } = useSelector((rs) => rs.userReducer);

  const [posts, setPosts] = useState([]);

  const [index, setIndex] = useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const getAllFeaturedPosts = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getFeaturedPosts();
    if (res.status == 200) {
      setPosts(res.data);
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "error",
          msgText: "Invalid Email and Password",
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
      dispatch(showLoading({ simpleLoading: false }));
    }
  };
  useEffect(getAllFeaturedPosts, []);

  return (
    <Grid container alignItems="center" justifyContent="space-evenly">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            backgroundImage:
              "linear-gradient(to right top, #3943b7, #434dc1, #4d56ca, #5760d4, #606ade)",
          }}
        >
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={11} sm={8} md={8} lg={5}>
              <Typography
                variant="h4"
                sx={{
                  [theme.breakpoints.down("md")]: {
                    fontSize: "24px",
                    paddingTop: "64px",
                  },
                  color: "#fafafa",
                  paddingBottom: "8px",
                  paddingTop: "48px",
                }}
              >
                Successfully achieve your business goals with a leading software
                development agency.
              </Typography>
              <Typography
                style={{
                  color: "#fafafa",
                  borderTop: "0.1px solid #fafafa",
                  fontSize: "18px",
                  paddingBottom: "16px",
                  paddingTop: "8px",
                }}
              >
                Grow your business, save time, and create beautiful custom
                software that delivers outstanding results.
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  fontSize: "18px",
                  marginBottom: "16px",
                  textTransform: "none",
                }}
                size="large"
              >
                Hire us
              </Button>
              <br />
            </Grid>
            <Grid item xs={10} sm={8} md={8} lg={5} style={{}}>
              <img
                style={{
                  height: "100%",
                  minWidth: "300px",
                  marginTop: "32px",
                  marginBottom: "48px",
                }}
                src={hero2}
                alt="heroimg2"
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Typography
          color="secondary"
          style={{ marginTop: "60px", fontWeight: 500 }}
          variant="h4"
        >
          Our Methodology
        </Typography>
        <Typography
          color="secondary"
          style={{
            fontSize: "18px",
            paddingBottom: 48,
          }}
        >
          As a company, we stand out because of our lifestyle and management
        </Typography>
      </Grid>
      <Grid item xs={11} sm={11} md={11} lg={8}>
        <ImageList
          variant="masonry"
          cols={xxScreen ? 1 : xsScreen ? 1 : mdScreen ? 2 : 3}
          gap={xxScreen ? 24 : xsScreen ? 24 : 16}
        >
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Specialized knowledge
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    We always stay up to date with the technological industry to
                    ensure our expertise can handle any project.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Solutions that scale
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    Our scalable solutions allow you to extend your project as
                    your business grows continuously. That way, you will not
                    need to reinvent the wheel and don't need to reinvest in the
                    same project and rebuild it.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Our communication process
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    At all stages of project development, you will be able to
                    communicate with our developers directly via Slack,
                    WhatsApp, Skype, or any kind of Video Conference software
                    that you prefer.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Keeping things transparent
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    Our pricing structure, development methods, technology
                    standards, and anything else that might affect the end
                    product are completely transparent.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Assurance of reliability
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    Keeping you informed on project status and delivering the
                    results are our top priorities on time. Each project comes
                    with our guarantee of client support for six months at no
                    additional cost.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
          <ImageListItem>
            <StyledCard
              variant="elevation"
              elevation={1}
              style={{ padding: 16 }}
            >
              <CardHeader
                title={
                  <StyledCardTitleTypography color="secondary" variant="h5">
                    Professional experience
                  </StyledCardTitleTypography>
                }
                subheader={
                  <Typography color="secondary" style={{ fontSize: 17 }}>
                    Our software development experience ranges from small to
                    large enterprises. We have been serving clients globally for
                    six years.
                  </Typography>
                }
              />
            </StyledCard>
          </ImageListItem>
        </ImageList>
      </Grid>

      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          color="secondary"
          style={{ marginTop: "40px", fontWeight: 500 }}
        >
          Our Specialties
        </Typography>
        <Typography
          color="secondary"
          style={{
            fontSize: "18px",
            paddingBottom: 48,
          }}
        >
          We use a variety of technologies to achieve the best results.
        </Typography>
      </Grid>

      <Grid item xs={11} sm={11} md={10} lg={8}>
        <Marquee gradient={false} direction="right">
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={docker}
            alt="docker"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={kubernetes}
            alt="kubernetes"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={terraform}
            alt="terraform"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={jenkin}
            alt="jenkin"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={ansible}
            alt="ansible"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={jest}
            alt="jest"
          />
        </Marquee>
        <Marquee gradient={false}>
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={mysql}
            alt="mysql"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={mongodb}
            alt="mongodb"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={reactjs}
            alt="reactjs"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={springboot}
            alt="springboot"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={vault}
            alt="vault"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={postgresql}
            alt="postgresql"
          />
        </Marquee>
        <Marquee gradient={false} direction="right">
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={git}
            alt="git"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={nodejs}
            alt="nodejs"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={redis}
            alt="redis"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={cucumber}
            alt="cucumber"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={nginx}
            alt="nginx"
          />
          <img
            width="250px"
            style={{ paddingLeft: "8px", paddingRight: "8px" }}
            src={aws}
            alt="aws"
          />
        </Marquee>
      </Grid>

      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Typography
          color="secondary"
          style={{ marginTop: "80px", fontWeight: 500 }}
          variant="h4"
        >
          See what we offer
        </Typography>
        <Typography
          color="secondary"
          style={{
            fontSize: "18px",
            paddingBottom: 40,
          }}
        >
          We offer different types of development based on our expertise.
        </Typography>
      </Grid>

      <Grid container item xs={12} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={10} md={5} lg={4}>
          <AutoPlaySwipeableViews
            interval={5000}
            index={index}
            onChangeIndex={handleChangeIndex}
          >
            <Card style={{ height: "170px", padding: 8, margin: 16 }}>
              <CardHeader
                title={
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 500, paddingBottom: "8px" }}
                  >
                    Software Development
                  </Typography>
                }
                subheader={
                  <Typography style={{ fontSize: 17 }}>
                    We use deep domain knowledge with advanced technologies to
                    build software that accelerates your business.
                  </Typography>
                }
              />
            </Card>
            <Card style={{ height: "170px", padding: 8, margin: 16 }}>
              <CardHeader
                title={
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 500, paddingBottom: "8px" }}
                  >
                    Web Development
                  </Typography>
                }
                subheader={
                  <Typography style={{ fontSize: 17 }}>
                    With the help of the latest technologies, we develop
                    enterprise-class applications that is secure, robust, and
                    scalable.
                  </Typography>
                }
              />
            </Card>
            <Card style={{ height: "170px", padding: 8, margin: 16 }}>
              <CardHeader
                title={
                  <Typography
                    variant="h5"
                    style={{ fontWeight: 500, paddingBottom: "8px" }}
                  >
                    Mobile Development
                  </Typography>
                }
                subheader={
                  <Typography style={{ fontSize: 17 }}>
                    Using modern libraries and frameworks, we develop and deploy
                    high-performing iOS and Android applications.
                  </Typography>
                }
              />
            </Card>
          </AutoPlaySwipeableViews>
        </Grid>
        <Grid item xs={11} sm={11} md={4} lg={4} style={{ textAlign: "center" }}>
          {index == 0 && (
            <Fade in={true} timeout={1000}>
              <img
                src={desktop}
                height="360px"
                width="340px"
                style={{
                  filter: `drop-shadow(0 0px 3px ${theme.palette.secondary.main})`,
                }}
              />
            </Fade>
          )}
          {index == 1 && (
            <Fade in={true} timeout={1000}>
              <img
                src={tablet}
                height="360px"
                style={{
                  filter: `drop-shadow(0 0px 3px ${theme.palette.secondary.main})`,
                }}
              />
            </Fade>
          )}
          {index == 2 && (
            <Fade in={true} timeout={1000}>
              <img
                src={smartphone}
                style={{
                  filter: `drop-shadow(0 0px 3px ${theme.palette.secondary.main})`,
                }}
                height="360px"
              />
            </Fade>
          )}
        </Grid>
      </Grid>

      <Grid item xs={10} style={{ textAlign: "center" }}>
        <Typography
          color="secondary"
          style={{ marginTop: "60px", fontWeight: 500 }}
          variant="h4"
        >
          What Makes Us a Good Choice
        </Typography>
        <Typography
          color="secondary"
          style={{
            fontSize: "18px",
            paddingBottom: 32,
          }}
        >
          We offer different types of development based on our expertise.
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12}>
        <HeroSection>
          <HeroTextSection>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Hello My name is...")
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString("<strong>Adnan Rahman</strong> and I am a..")
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString("Full-Stack Software Engineer")
                  .start();
              }}
            />
          </HeroTextSection>
          <HeroButtonSection>
            <Button
              disableRipple
              disableElevation
              sx={{
                background: "rgba(47, 46, 65, 0.8)",
                textTransform: "none",
                marginRight: "12px",
              }}
              component={Link}
              to="/project"
              variant="contained"
            >
              <Typography variant="h5" style={{ color: "#fff" }}>
                🚀 Explore
              </Typography>
            </Button>
            <Button
              disableElevation
              variant="contained"
              disableRipple
              sx={{
                background: "rgba(46, 125, 50, 0.8)",
                textTransform: "none",
              }}
              component={Link}
              to="/blog"
            >
              <Typography variant="h5" style={{ color: "#fff" }}>
                Learn 📚
              </Typography>
            </Button>
          </HeroButtonSection>
        </HeroSection>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {posts.length > 0 ? (
          <FeaturedPost variant="h4" color="secondary">
            Featured Posts
          </FeaturedPost>
        ) : (
          <FeaturedPost variant="h4" color="secondary">
            No Featured Posts
          </FeaturedPost>
        )}
      </Grid>
      <Grid
        container
        justifyContent="center"
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        {posts.length > 0 &&
          posts.map((post, i) => (
            <Grid item xs={12} sm={12} md={9} lg={6} key={post.id}>
              <FeaturedPostCard
                post={post}
                user={user}
              />
            </Grid>
          ))}
      </Grid> */}
      <TrackRoute title="Home" />
    </Grid>
  );
};

export default Home;

// Nothing to changed
