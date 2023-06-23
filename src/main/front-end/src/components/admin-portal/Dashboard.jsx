import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getCategories } from "../../api/Category";
import { getAllPost } from "../../api/Post";
import { getTags } from "../../api/Tag";
import { Pie, Bar } from "react-chartjs-2";
import randomColor from "randomcolor";
import { useSelector, useDispatch } from "react-redux";
import TrackRoute from "../header/TrackRoute";
import { Chart, registerables } from "chart.js";
import { showLoading } from "../../redux/actions/notificationAction";
import { useTheme } from "@mui/material/styles";
import { getProjects } from "../../api/Project";
import axios from "axios";
import notificationReducer from "../../redux/reducers/notifacationReducer";
import Zoom from "@mui/material/Zoom";
import Fade from "@mui/material/Fade";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/system/Box";
Chart.register(...registerables);

const CategorizedPost = (props) => {
  const theme = useTheme();
  let currentCategories = props.categories;
  props.posts.map((post) => {
    post.categories.map((cat) => {
      currentCategories[cat.name] = props.categories[cat.name] + 1;
    });
  });
  const data = {
    labels: Object.keys(currentCategories),
    // labels: ["red", "green"],
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(currentCategories),
        // data: [1, 0],
        backgroundColor: Object.keys(currentCategories).map((c) =>
          randomColor()
        ),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                color: theme.palette.secondary.main,
              },
            },
          },
        }}
      />
    </div>
  );
};
const TaggedPost = (props) => {
  let currentTags = props.tags;
  const theme = useTheme();
  props.posts.map((post) => {
    post.tags.map((tag) => {
      currentTags[tag.name] = props.tags[tag.name] + 1;
    });
  });
  const data = {
    labels: Object.keys(currentTags),
    // labels: ["red", "green"],
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(currentTags),
        // data: [1, 0],
        backgroundColor: Object.keys(currentTags).map((t) => randomColor()),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                color: theme.palette.secondary.main,
              },
            },
          },
        }}
      />
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { simpleLoading } = useSelector((rs) => notificationReducer);
  const theme = useTheme();
  const [postState, setPostState] = useState({
    posts: [],
    isFetchPostsComplete: false,
  });
  const [tagState, setTagState] = useState({
    tags: [],
    isFetchTagsComplete: false,
  });
  const [categoryState, setCategoryState] = useState({
    categories: [],
    isFetchCategoriesComplete: false,
  });
  const [projectState, setProjectState] = useState({
    projects: [],
    isFetchProjectsComplete: false,
  });
  const [message, setMessage] = useState("");

  const [numberOfTagsUsedOnEachPosts, setNumberOfTagsUsedOnEachPosts] =
    useState({});
  const [
    numberOfCategoriesUsedOnEachPosts,
    setNumberOfCategoriesUsedOnEachPosts,
  ] = useState({});
  const [numberOfTagsUsedOnEachProjects, setNumberOfTagsUsedOnEachProjects] =
    useState({});
  const [
    numberOfCategoriesUsedOnEachProjects,
    setNumberOfCategoriesUsedOnEachProjects,
  ] = useState({});

  const getAllTags = async () => {
    const res = await getTags();
    if (res.status == 200) {
      setTagState({
        tags: res.data,
        isFetchTagsComplete: true,
      });
      return res.data;
    } else if (res.status == 400) {
      setMessage(res.data.message);
    }
  };
  const getAllCategories = async () => {
    const res = await getCategories();
    if (res.status == 200) {
      setCategoryState({
        categories: res.data,
        isFetchCategoriesComplete: true,
      });
      return res.data;
    } else if (res.status == 400) {
      setMessage(res.data.message);
    }
  };
  const getAllProjects = async () => {
    const res = await getProjects();
    if (res.status == 200) {
      setProjectState({
        projects: res.data,
        isFetchProjectsComplete: true,
      });
      return res.data;
    } else if (res.status == 400) {
      setMessage(res.data.message);
    }
  };

  const getPosts = async () => {
    const res = await getAllPost();
    if (res.status == 200) {
      setPostState({
        posts: res.data,
        isFetchPostsComplete: true,
      });
      return res.data;
    } else if (res.status == 400) {
      setMessage(res.data.message);
    }
  };

  const countOfPosts = (posts) => {
    const mTags = {};
    const mCategories = {};
    posts.map((post) => {
      // Array of Tag Objects
      post.tags.map((tag) => {
        if (mTags[tag.name]) {
          mTags[tag.name]++;
        } else {
          mTags[tag.name] = 1;
        }
      });
    });

    posts.map((post) => {
      // Array of Category Objects
      post.categories.map((category) => {
        if (mCategories[category.name]) {
          mCategories[category.name]++;
        } else {
          mCategories[category.name] = 1;
        }
      });
    });

    setNumberOfTagsUsedOnEachPosts(mTags);
    setNumberOfCategoriesUsedOnEachPosts(mCategories);
  };

  const countOfProjects = (projects) => {
    const mProjectTags = {};
    const mProjectCategories = {};
    projects.map((project) => {
      // Array of Tag Objects
      project.tags.map((tag) => {
        if (mProjectTags[tag.name]) {
          mProjectTags[tag.name]++;
        } else {
          mProjectTags[tag.name] = 1;
        }
      });
    });

    projects.map((project) => {
      // Array of Category Objects
      project.categories.map((category) => {
        if (mProjectCategories[category.name]) {
          mProjectCategories[category.name]++;
        } else {
          mProjectCategories[category.name] = 1;
        }
      });
    });

    setNumberOfTagsUsedOnEachProjects(mProjectTags);
    setNumberOfCategoriesUsedOnEachProjects(mProjectCategories);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Tags on each Projects",
      },
    },
  };

  useEffect(async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const responses = await axios.all([
      getAllTags(),
      getPosts(),
      getAllCategories(),
      getAllProjects(),
    ]);
    if (responses[0] && responses[1] && responses[2] && responses[3]) {
      countOfPosts(responses[1]);
      countOfProjects(responses[3]);
      dispatch(showLoading({ simpleLoading: false }));
    } else {
      dispatch(showLoading({ simpleLoading: false }));
    }
  }, []);

  return (
    <Grid
      sx={{
        paddingBottom: 2,
        paddingTop: 2,
        minHeight: "94vh",
        backgroundColor: theme.palette.background.default,
      }}
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Grid item xs={10} sm={8} md={4} lg={3}>
        <Card
          elevation={0}
          variant="elevation"
          style={{ background: "inherit" }}
        >
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            justifyContent="center"
          >
            <Grid item xs={6} sm={6} md={7} lg={6}>
              <Zoom in={postState.isFetchPostsComplete} timeout={500}>
                <Card variant="elevation" style={{ margin: 5 }}>
                  <CardContent>
                    <Typography variant="body1">Number of Posts</Typography>
                    <Typography variant="h5">
                      {postState.posts.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={6} sm={6} md={7} lg={6}>
              <Zoom in={projectState.isFetchProjectsComplete} timeout={500}>
                <Card style={{ margin: 5 }}>
                  <CardContent>
                    <Typography variant="body1">Number of Projects</Typography>
                    <Typography variant="h5">
                      {projectState.projects.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={6} sm={6} md={7} lg={6}>
              <Zoom in={tagState.isFetchTagsComplete} timeout={500}>
                <Card style={{ margin: 5 }}>
                  <CardContent>
                    <Typography variant="body1">Number of Tags</Typography>
                    <Typography variant="h5">{tagState.tags.length}</Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
            <Grid item xs={6} sm={6} md={7} lg={6}>
              <Zoom in={categoryState.isFetchCategoriesComplete}>
                <Card style={{ margin: 5 }}>
                  <CardContent>
                    <Typography variant="body1">
                      Number of Categories
                    </Typography>

                    <Typography variant="h5" style={{ padding: 5 }}>
                      {categoryState.categories.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={11} sm={8} md={4} lg={3}>
        {numberOfCategoriesUsedOnEachProjects && (
          <Fade in={!simpleLoading} timeout={500}>
            <Box mt={6}>
              <Bar
                data={{
                  labels: Object.keys(numberOfCategoriesUsedOnEachProjects),
                  datasets: [
                    {
                      label: "Number of Categories used on each Projects",
                      data: Object.values(numberOfCategoriesUsedOnEachProjects),
                      backgroundColor: Object.keys(
                        numberOfCategoriesUsedOnEachProjects
                      ).map((color) => randomColor()),
                    },
                  ],
                }}
              />
            </Box>
          </Fade>
        )}
      </Grid>
      <Grid item xs={11} sm={8} md={4} lg={3}>
        {numberOfTagsUsedOnEachProjects && (
          <Fade in={!simpleLoading} timeout={500}>
            <Box mt={6}>
              <Pie
                options={options}
                data={{
                  labels: Object.keys(numberOfTagsUsedOnEachProjects),
                  datasets: [
                    {
                      label: "Number of Tags used on each Projects",
                      data: Object.values(numberOfTagsUsedOnEachProjects),
                      backgroundColor: Object.keys(
                        numberOfTagsUsedOnEachProjects
                      ).map((color) => randomColor()),
                    },
                  ],
                }}
              />
            </Box>
          </Fade>
        )}
      </Grid>

      <Grid item xs={11} sm={11} md={5} lg={4}>
        {numberOfTagsUsedOnEachPosts && (
          <Fade in={!simpleLoading} timeout={500}>
            <Box mt={6}>
              <Bar
                data={{
                  labels: Object.keys(numberOfTagsUsedOnEachPosts),
                  datasets: [
                    {
                      label: "Number of Tags used on each Posts",
                      data: Object.values(numberOfTagsUsedOnEachPosts),
                      backgroundColor: Object.keys(
                        numberOfTagsUsedOnEachPosts
                      ).map((color) => randomColor()),
                    },
                  ],
                }}
              />
            </Box>
          </Fade>
        )}
      </Grid>
      <Grid item xs={11} sm={8} md={5} lg={5}>
        {numberOfCategoriesUsedOnEachPosts && (
          <Fade in={!simpleLoading} timeout={500}>
            <Box mt={6}>
              <Bar
                data={{
                  labels: Object.keys(numberOfCategoriesUsedOnEachPosts),
                  datasets: [
                    {
                      label: "Number of Categories used on each Posts",
                      data: Object.values(numberOfCategoriesUsedOnEachPosts),
                      backgroundColor: Object.keys(
                        numberOfCategoriesUsedOnEachPosts
                      ).map((color) => randomColor()),
                    },
                  ],
                }}
              />
            </Box>
          </Fade>
        )}
      </Grid>

      <TrackRoute title="Dashboard" />
    </Grid>
  );
};

export default Dashboard;
