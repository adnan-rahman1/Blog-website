import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
/* Custom Import */
import {
  showLoading,
  showNotification,
} from "../../redux/actions/notificationAction";
import { createPost, deletePost, getAllPost, updatePost } from "../../api/Post";
import DeleteModel from "../utils/DeleteModel";
import {
  showSimpleCUModel,
  showSimpleDeleteModel,
} from "../../redux/actions/modelAction";
import PostCUModel from "../utils/PostCUModel";
/* Custom import */
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "@emotion/styled";
import TrackRoute from "../header/TrackRoute";

const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "left" },
  { id: "update", label: "Update", minWidth: 100, align: "center" },
  { id: "del", label: "Delete", minWidth: 100, align: "center" },
];

const StyledTableContainer = styled(TableContainer)({
  maxHeight: "75vh",
});
const StyledTitle = styled(Typography)({
  color: "#fff",
  flex: "1 1 100%",
});
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const Posts = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { authenticated, token } = useSelector((rs) => rs.userReducer);
  const { simpleLoading } = useSelector((rs) => rs.notificationReducer);
  const { simpleCUModelOpen, simpleUModelOpen, simpleDeleteModelOpen } =
    useSelector((rs) => rs.modelReducer);

  const [state, setState] = useState({
    id: 0,
    post: {},
    posts: [],
    msg: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openSimpleCUModel = () => {
    dispatch(showSimpleCUModel({ simpleCUModelOpen: true }));
  };

  const openSimpleUpdateModel = (post) => {
    setState({
      ...state,
      id: post.id,
      post: { ...post, createdAt: null, modifiedAt: null },
    });
    dispatch(showSimpleCUModel({ simpleUModelOpen: true }));
  };
  const openSimpleDeleteModel = (post) => {
    setState({ ...state, id: post.id, post: post });
    dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: true }));
  };

  const getPosts = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getAllPost();
    if (res.status == 200) {
      setState({ ...state, posts: res.data });
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      setState({ ...state, msg: res.data.message });
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const handleOnCreatePost = async (post) => {
    const res = await createPost(post);
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
      setState({ ...state, posts: [...state.posts, res.data.post] });

      dispatch(
        showSimpleCUModel({
          simpleCUModelOpen: false,
          err: false,
          errMsg: {},
        })
      );
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showSimpleCUModel({ err: true, errMsg: { ...res.data } }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const handleOnUpdatePost = async (post) => {
    const res = await updatePost(post);
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

      const posts = state.posts.filter((p) => p.id !== post.id);
      setState({ ...state, posts: [...posts, post] });

      dispatch(
        showSimpleCUModel({
          simpleUModelOpen: false,
          err: false,
          errMsg: {},
        })
      );
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showSimpleCUModel({ err: true, errMsg: { ...res.data } }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const handleOnCreate = async (post, images) => {
    dispatch(showLoading({ simpleLoading: true }));
    let newPost = {
      ...post,
      pictures: images,
    };
    await handleOnCreatePost(newPost);
  };

  const handleOnUpdate = async (post, images) => {
    dispatch(showLoading({ simpleLoading: true }));
    let newPost = { ...post };
    if (images.length > 0) {
      newPost = {
        ...post,
        pictures: [...post.pictures, ...images],
      };
    }
    await handleOnUpdatePost(newPost);
  };

  const handleOnDelete = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await deletePost(state.id);
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
      let posts = state.posts.filter((p) => p.id != state.id);
      if (posts.length <= 0)
        setState({ ...state, msg: "No Post found", posts: [] });
      else setState({ ...state, posts: posts });
      dispatch(
        showSimpleDeleteModel({
          simpleDeleteModelOpen: false,
          err: false,
          errMsg: {},
        })
      );
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showSimpleDeleteModel({ errMsg: res.data.name }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  useEffect(() => {
    if (authenticated && token !== "") {
      getPosts();
    }
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "flex-start",
          },
          display: simpleCUModelOpen || simpleUModelOpen ? "none" : "flex",
          minHeight: "94vh",
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {!simpleLoading && state.posts.length > 0 && (
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            style={{ width: matches ? "100%" : "auto" }}
          >
            <StyledToolbar variant="dense">
              <StyledTitle variant="h6" id="tableTitle" component="div">
                Posts
              </StyledTitle>
              <Tooltip title="Create post">
                <IconButton
                  aria-label="filter list"
                  onClick={openSimpleCUModel}
                >
                  <AddCircleOutlineIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </StyledToolbar>
            <StyledTableContainer>
              <Table
                sx={{
                  // width: "60rem",
                  [theme.breakpoints.down("sm")]: {
                    width: "100%",
                  },
                  backgroundColor: theme.palette.background.paper,
                }}
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        // style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.posts != undefined &&
                    state.posts.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">
                            <Typography color="secondary">
                              {row.title}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="warning"
                              onClick={() => openSimpleUpdateModel(row)}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() => openSimpleDeleteModel(row)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </StyledTableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={10}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
        {!simpleLoading && state.posts.length <= 0 && (
          <Grid
            container
            spacing={2}
            alignItems="center"
            direction="row"
            justifyContent="center"
          >
            <Grid item>
              <Typography
                style={{ opacity: 0.1, textAlign: "center" }}
                variant="h3"
              >
                {state.msg}
              </Typography>
            </Grid>
            <Grid item>
              <IconButton aria-label="Create Post" onClick={openSimpleCUModel}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>

      {simpleCUModelOpen && (
        <PostCUModel
          op="Create post"
          title="Create a post"
          handleOnOperation={handleOnCreate}
        />
      )}
      {simpleUModelOpen && (
        <PostCUModel
          op="Update post"
          title="Edit a post"
          post={state.post}
          handleOnOperation={handleOnUpdate}
        />
      )}
      {simpleDeleteModelOpen && (
        <DeleteModel title={state.post.title} handleOnDelete={handleOnDelete} />
      )}

      <TrackRoute title="Manage Posts" />
    </>
  );
};

export default Posts;
