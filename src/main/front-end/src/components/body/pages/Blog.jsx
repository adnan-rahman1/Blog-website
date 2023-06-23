import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Pagination from "@mui/material/Pagination";

import { useEffect, useState } from "react";
import { getPostsByPage } from "../../../api/Post";
import { showLoading } from "../../../redux/actions/notificationAction";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../api/Category";
import { getTags } from "../../../api/Tag";
import CircularProgress from "@mui/material/CircularProgress";

import SearchIcon from "@mui/icons-material/Search";

import styled from "@emotion/styled";
import TrackRoute from "../../header/TrackRoute";
import SideCard from "./blog/SideCard";
import BlogCard from "./blog/BlogCard";
import SearchSection from "./blog/SearchSection";

const StyledChip = styled(Chip)({
  margin: 1,
});

const StyledSearchIconBtn = styled(IconButton)(({ theme }) => ({
  marginLeft: "auto",
  borderRadius: "50%",
  marginTop: -3,
}));

const Blog = () => {
  const { globalLoading } = useSelector((s) => ({ ...s.notificationReducer }));
  const dispatch = useDispatch();

  const [state, setState] = useState({
    posts: [],
    pageCount: 0,
    totalElements: 0,
    isOnLoadPostFound: false,
  });

  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOrder, setSearchOrder] = useState("desc");
  const [showSearchField, setShowSearchField] = useState(false);
  const [pageIndex, setPageIndex] = useState({
    startIndex: 0,
    endIndex: 4,
  });

  const [categoryState, setCategoryState] = useState({
    categories: [],
    categoriesLoading: true,
  });
  const [tagState, setTagState] = useState({
    tags: [],
    tagsLoading: true,
  });

  const handlePageChange = (event, value) => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setPageIndex({
      ...pageIndex,
      startIndex: 5 * (value - 1),
      endIndex: 5 * value - 1,
    });
    setPage(value);
  };

  const handleSearchKeyword = (e) => {
    setSearchKeyword((searchKeyword) => e.target.value);
  };

  const handleSearchOrder = (event, order) => {
    if (order == null) order = "desc";
    setSearchOrder((searchOrder) => order);
  };

  const handleShowSearchField = () => {
    setSearchKeyword("");
    setShowSearchField(false);
  };

  const getAllPosts = async () => {
    dispatch(showLoading({ globalLoading: true }));
    const res = await getPostsByPage(page - 1, searchKeyword, searchOrder);
    if (res.status == 200) {
      setState({
        posts: res.data.posts,
        pageCount: res.data.totalPages,
        totalElements: res.data.totalElements,
        isOnLoadPostFound: true,
      });

      dispatch(showLoading({ globalLoading: false }));
    } else if (res.status == 400) {
      setState({ ...state, posts: [], msg: res.data.message });
      dispatch(showLoading({ globalLoading: false }));
    }
  };
  const getAllTags = async () => {
    const res = await getTags();
    if (res.status == 200) {
      setTagState({ ...tagState, tags: res.data, tagsLoading: false });
    } else if (res.status === 400)
      setTagState({ ...tagState, tags: [], tagsLoading: false });
  };
  const getAllCategories = async () => {
    const res = await getCategories();
    if (res.status == 200) {
      setCategoryState({
        ...categoryState,
        categories: res.data,
        categoriesLoading: false,
      });
    } else {
      setCategoryState({
        ...setCategoryState,
        categories: [],
        categoriesLoading: false,
      });
    }
  };
  useEffect(getAllPosts, [page, searchKeyword, searchOrder]);
  useEffect(getAllTags, []);
  useEffect(getAllCategories, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        minHeight: "94vh",
      }}
    >
      {!globalLoading && !state.isOnLoadPostFound && state.posts.length <= 0 ? (
        <Grid item xs={10}>
          <Box
            style={{
              height: "90vh",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography style={{ opacity: 0.2 }} color="error" variant="h4">
              No post found
            </Typography>
          </Box>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sm={11}
          md={12}
          lg={12}
          container
          direction="row"
          justifyContent="space-around"
        >
          <Grid
            item
            container
            direction="row"
            xs={11}
            sm={11}
            md={8}
            lg={8}
            alignContent="flex-start"
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box mb={2}></Box>
              <Collapse in={showSearchField}>
                <SearchSection
                  searchKeyword={searchKeyword}
                  handleSearchKeyword={handleSearchKeyword}
                  searchOrder={searchOrder}
                  handleSearchOrder={handleSearchOrder}
                  handleShowSearchField={handleShowSearchField}
                />
              </Collapse>
              <Collapse in={!showSearchField}>
                <Box style={{ display: "flex", height: "50px" }}>
                  <Typography
                    color="secondary"
                    style={{ fontSize: "28px", fontWeight: 500, opacity: 0.8 }}
                  >
                    {page == 1 ? "Recent Post" : "More Posts"}
                  </Typography>
                  <StyledSearchIconBtn
                    onClick={() => setShowSearchField(true)}
                    disableRipple
                  >
                    <SearchIcon fontSize="large" />
                  </StyledSearchIconBtn>
                </Box>
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {searchKeyword != "" && state.posts.length < 1 && (
                <Typography
                  style={{ opacity: 0.5, textAlign: "center" }}
                  color="error"
                  variant="body1"
                >
                  No post found
                </Typography>
              )}

              {searchKeyword != "" && state.posts.length > 0 && (
                <Typography
                  style={{
                    opacity: 0.5,
                    marginBottom: 8,
                    marginTop: 8,
                    textAlign: "center",
                  }}
                  color="secondary"
                  variant="body1"
                >
                  Searched for <strong>{searchKeyword} |</strong> Found (
                  <strong>{state.totalElements}</strong>)
                </Typography>
              )}

              {globalLoading ? (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                  }}
                >
                  <CircularProgress size={30} color="secondary" />
                </Box>
              ) : (
                <BlogCard posts={state.posts} />
              )}
            </Grid>
            {state.pageCount > 1 && state.posts.length > 0 && (
              <Grid item style={{ margin: "auto" }}>
                <Pagination
                  size="large"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                  page={page}
                  onChange={handlePageChange}
                  count={state.pageCount}
                  color="secondary"
                  defaultPage={1}
                />
                <Box mb={3} />
              </Grid>
            )}
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <SideCard
                title="All Categories"
                data={categoryState.categories}
                loading={categoryState.categoriesLoading}
              />
              <SideCard
                title="All Tags"
                data={tagState.tags}
                loading={tagState.tagsLoading}
              />
            </Grid>
          </Hidden>
        </Grid>
      )}
      <TrackRoute title="Blog" />
    </Grid>
  );
};
export default Blog;
