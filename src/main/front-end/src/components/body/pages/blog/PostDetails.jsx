import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import CardActionArea from "@mui/material/CardActionArea";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails } from "../../../../api/Post";
import { showLoading } from "../../../../redux/actions/notificationAction";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

import DateRangeIcon from "@mui/icons-material/DateRange";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styled from "@emotion/styled";
import TrackRoute from "../../../header/TrackRoute";
import Divider from "@mui/material/Divider";

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
}));
const StyledNextPostChip = styled(Chip)(({ theme }) => ({
  cursor: "pointer",
  background: theme.palette.secondary.main,
  flexFlow: "row-reverse",
  marginLeft: "auto",
  borderRadius: "3px",
}));

const PostDetails = () => {
  const params = useParams();
  const theme = useTheme();
  const themeMode = theme.palette.mode;
  const { globalLoading } = useSelector((rs) => rs.notificationReducer);
  const { user } = useSelector((rs) => rs.userReducer);
  const avatar =
    user == null ? "" : [user.avatar.location, user.avatar.name].join("/");

  const dispatch = useDispatch();
  const [state, setState] = useState({
    current: {},
    prev: null,
    next: null,
  });
  const [scrollPosition, setScrollPosition] = useState(0);


  const getSinglePost = async () => {
    dispatch(showLoading({ simpleLoading: true, globalLoading: true }));
    const res = await getPostDetails(params.id);
    if (res.status == 200) {
      const { current, prev, next } = res.data;
      setState({
        current: current,
        prev: prev,
        next: next,
      });
      dispatch(showLoading({ simpleLoading: false, globalLoading: false }));
    } else {
      dispatch(showLoading({ simpleLoading: false, globalLoading: false }));
    }
  };

  const getDocHeight = () => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  };
  const calculateScrollDistance = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = getDocHeight();
    const totalDocScrollLength = docHeight - windowHeight;
    const scrollPos = Math.floor((scrollTop / totalDocScrollLength) * 100);
    setScrollPosition(scrollPos);
  };

  useEffect(getSinglePost, [window.location.pathname]);
  useEffect(() => {
    window.onscroll = (e) => calculateScrollDistance();
  });

  return (
    <Grid container justifyContent="space-evenly">
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <LinearProgress
          color="secondary"
          variant="determinate"
          value={scrollPosition}
          style={{ background: "inherit", height: "2.5px" }}
        />
      </Grid>
      <Grid item xs={12} sm={11} md={8} lg={6}>
        <Card
          elevation={0}
          variant="elevation"
          style={{
            background: "inherit",
            borderRadius: 0
          }}
        >
          {!globalLoading ? (
            <StyledCardMedia
              component="img"
              height="300"
              image={state.current.pictures != undefined ? [state.current.pictures[0].location, state.current.pictures[0].name].join("/") : ""}
              alt="No cover image"
            />
          ) : (
            <Skeleton height={300} />
          )}
          <CardHeader
            title={
              <Typography
                sx={{
                  opacity: 0.8,
                  paddingBottom: 0,
                  textAlign: "left",
                  fontWeight: 500,
                  fontSize: "2.2rem",
                  color: theme.palette.secondary.main,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1.8rem",
                  },
                  [theme.breakpoints.down("xs")]: {
                    fontSize: "1.5rem",
                  },
                }}
                variant="h4"
              >
                {globalLoading ? (
                  <Skeleton animation="wave" height={80} />
                ) : (
                  state.current.title
                )}
              </Typography>
            }
            subheader={
              <Typography
                sx={{
                  marginTop: 1,
                  [theme.breakpoints.down("sm")]: {
                    marginBottom: 0,
                  },
                }}
                variant="subtitle1"
                color="primary"
              >
                {!globalLoading && user != null ? (
                  <>
                    <Chip
                      color="primary"
                      style={{
                        borderRadius: 0,
                        borderTopLeftRadius: "2px",
                        borderBottomLeftRadius: "2px",
                      }}
                      avatar={
                        <DateRangeIcon style={{ background: "inherit" }} />
                      }
                      label={state.current.humanReadableDate}
                    />
                    <Chip
                      color="secondary"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: "2px",
                      }}
                      avatar={<Avatar src={avatar} />}
                      label={`${user.firstName} ${user.lastName}`}
                    />
                  </>
                ) : (
                  <Skeleton
                    style={{ marginTop: -15, marginBottom: 30 }}
                    width={250}
                    animation="wave"
                  />
                )}
              </Typography>
            }
          />
        </Card>
        <Divider/>
        {!globalLoading ? (
            <div>
              <Box
                style={{ opacity: 0.9 }}
                sx={{
                  marginTop: 2,
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  color: theme.palette.text.secondary,
                  fontSize: "1.18rem",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1.05rem",
                  },
                  lineHeight: 1.8,
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, "")}
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {state.current.description}
                </ReactMarkdown>
              </Box>
            </div>
        ) : (
          <Skeleton animation="wave" variant="rect" height={768} />
        )}
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={4}
        lg={3}
        alignContent="flex-start"
        justifyContent="space-around"
        sx={{
          marginTop: 2,
          paddingLeft: "16px",
          paddingRight: "16px",
          color: theme.palette.secondary.main,
          opacity: 0.9,
          fontSize: "1.2rem",
          wordSpacing: 1.5,
          lineHeight: 1.6,
          [theme.breakpoints.down("sm")]: {
            fontSize: "1.2rem",
          },
        }}
      >
        {!globalLoading && state.prev != null && (
          <Grid item item xs={12} sm={11} md={12} lg={12}>
            <Card
              variant="elevation"
              style={{
                marginBottom: state.next == null ? "30px" : "inherit",
              }}
            >
              <CardActionArea
                disableRipple
                component={Link}
                to={`/blog/${state.prev.id}/${state.prev.slug}`}
              >
                <CardHeader
                  title={state.prev.title}
                  subheader={state.prev.subTitle}
                />
                <CardContent>
                  {state.prev.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      color="secondary"
                      style={{ margin: 1 }}
                      label={tag.name}
                      variant={themeMode === "dark" ? "contained" : "outlined"}
                      size="small"
                    />
                  ))}
                  {state.prev.categories.map((category) => (
                    <Chip
                      key={category.id}
                      color="secondary"
                      style={{ margin: 1 }}
                      label={category.name}
                      variant={themeMode === "dark" ? "contained" : "outlined"}
                      size="small"
                    />
                  ))}
                </CardContent>
                <CardActions>
                  <Chip
                    icon={<ArrowBackIcon />}
                    style={{ borderRadius: "3px", cursor: "pointer" }}
                    label="Previous Post"
                    size="large"
                    color="secondary"
                    variant="contained"
                  />
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        )}
        {!globalLoading && state.next != null && (
          <Grid item item xs={12} sm={11} md={12} lg={12}>
            <Card
              variant="elevation"
              sx={{
                marginTop: 2,
                marginBottom: 4,
              }}
            >
              <CardActionArea
                disableRipple
                component={Link}
                to={`/blog/${state.next.id}/${state.next.slug}`}
              >
                <CardHeader
                  title={state.next.title}
                  subheader={state.next.subTitle}
                />
                <CardContent>
                  {state.next.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      color="secondary"
                      style={{ margin: 1 }}
                      label={tag.name}
                      variant={themeMode === "dark" ? "contained" : "outlined"}
                      size="small"
                    />
                  ))}
                  {state.next.categories.map((category) => (
                    <Chip
                      key={category.id}
                      color="secondary"
                      style={{ margin: 1 }}
                      label={category.name}
                      variant={themeMode === "dark" ? "contained" : "outlined"}
                      size="small"
                    />
                  ))}
                </CardContent>
                <CardActions>
                  <StyledNextPostChip
                    color="secondary"
                    icon={
                      <ArrowForwardIcon
                        color="secondary"
                        style={{
                          marginLeft: -6,
                          marginRight: "6px",
                        }}
                      />
                    }
                    label="Next Post"
                    variant="contained"
                  />
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>

      <TrackRoute title="Blog" />
    </Grid>
  );
};

export default PostDetails;
