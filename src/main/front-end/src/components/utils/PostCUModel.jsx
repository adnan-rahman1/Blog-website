import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Hidden from "@mui/material/Hidden";
import { useTheme } from "@mui/material/styles";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../api/Category";
import { getTags } from "../../api/Tag";
import { showSimpleCUModel } from "../../redux/actions/modelAction";
import { deleteImage, uploadImage } from "../../api/picture";
import { showNotification } from "../../redux/actions/notificationAction";

import CancelIcon from "@mui/icons-material/Cancel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "@emotion/styled";

const StyledCircularProgress = styled(CircularProgress)({
  color: "#fff",
  position: "absolute",
  top: "50%",
  left: "auto",
  marginTop: -12,
});

const StyledInputLabel = styled(InputLabel)({
  margin: "30px 0 10px 0",
});
const StyledDivChip = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});
const StyledImageBox = styled("div")({
  display: "flex",
  direction: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Input = styled("input")({
  display: "none",
});

const PostCUModel = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { simpleCUModelOpen, simpleUModelOpen, err, errMsg } = useSelector(
    (rs) => ({ ...rs.modelReducer })
  );
  const { simpleLoading } = useSelector((rs) => ({
    ...rs.notificationReducer,
  }));
  const { op, title, post, handleOnOperation } = props;

  const [state, setState] = useState({
    post: post
      ? post
      : {
          id: "",
          title: "",
          subTitle: "",
          slug: "",
          featured: false,
          description: "",
          tags: [],
          categories: [],
          pictures: [],
        },
    images: post ? post.pictures : [],
    cover: post ? post.pictures.filter((pic) => pic.section == "cover")[0] : "",
  });

  const [featurePost, setFeaturePost] = useState(post ? post.featured : false);

  const [categoryState, setCategoryState] = useState({
    categories: [],
    categoriesLoading: false,
  });
  const [tagState, setTagState] = useState({
    tags: [],
    tagsLoading: false,
  });
  const [selectedTags, setSelectedTags] = useState(
    state.post.tags.map((tag) => tag.name)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    state.post.categories.map((category) => category.name)
  );

  const ref = useRef(null);

  const handleChangeTags = (event) => {
    setSelectedTags(event.target.value);
    const tags = event.target.value.map(
      (st) => tagState.tags.filter((t) => t.name == st)[0]
    );
    setState({ ...state, post: { ...state.post, tags: tags } });
  };

  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
    const categories = event.target.value.map(
      (sc) => categoryState.categories.filter((c) => c.name == sc)[0]
    );
    setState({ ...state, post: { ...state.post, categories: categories } });
  };

  const handleFieldChange = (event) => {
    setState({
      ...state,
      post: {
        ...state.post,
        [event.target.name]: event.target.value,
      },
    });
  };
  const handleSlugFieldOnFocus = (event) => {
    let slug = state.post.title.toLowerCase().split(" ").join("-");
    setState({
      ...state,
      post: {
        ...state.post,
        [event.target.name]: slug,
      },
    });
  };

  const handleClose = () => {
    dispatch(
      showSimpleCUModel({
        simpleCUModelOpen: false,
        simpleUModelOpen: false,
        err: false,
        errMsg: {},
      })
    );
  };

  const handleCheckBox = (event, c) => {
    setFeaturePost(event.target.checked);
    setState({
      ...state,
      post: {
        ...state.post,
        featured: event.target.checked,
      },
    });
  };

  const handleOperation = () => {
    handleOnOperation(state.post, state.images);
  };

  const handleFileUpload = async (file, section) => {
    let storeImgStruct = {
      section: section,
      directory: `post/${state.post.slug}`,
    };
    let res = await uploadImage(file, storeImgStruct);
    if (res.status === 200) {
      setState({
        ...state,
        images: [...state.images, res.data.picture],
        cover: section == "cover" && res.data.picture,
      });
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "success",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );

      if (section != "cover") {
        const data = {
          url: res.data.picture.location,
          width: 300,
          height: 200,
          alignment: "center", // or "center", "right"
          type: "image", // or "video"
        };
        let promise = Promise.resolve({ data });
        ref.current?.insertAtomicBlockAsync("IMAGE", promise, "");
      }
    } else if (res.status == 400) {
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "error",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
    }
  };
  const handleUploadCoverImage = (files) => {
    handleFileUpload(files[0], "cover");
  };
  const handleDeletePostImages = async (id) => {
    const res = await deleteImage(id);
    if (res.status == 200) {
      setState({
        ...state,
        images: state.images.filter((i) => i.id != id),
        cover: ""
      });
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "success",
          msgText: res.data.message,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
    } else if (res.status == 400) {
      dispatch(
        showNotification({
          open: true,
          varient: "filled",
          msgType: "warning",
          msgText: res.data.message,
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
        })
      );
    }
  };

  const getAllTags = async () => {
    setTagState({ ...tagState, tagsLoading: true });
    const res = await getTags();
    if (res.status == 200) {
      setTagState({ ...tagState, tags: res.data, tagsLoading: false });
    } else {
      setTagState({ ...tagState, tags: [], tagsLoading: false });
    }
  };

  const getAllCategories = async () => {
    setCategoryState({ ...categoryState, categoriesLoading: true });
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

  useEffect(getAllTags, []);
  useEffect(getAllCategories, []);

  return (
    <Dialog
      fullScreen
      open={simpleCUModelOpen || simpleUModelOpen}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <DialogTitle>
            <Typography
              variant="body1"
              fontSize={25}
              style={{ textAlign: "center", opacity: 0.7 }}
            >
              {title}
            </Typography>
            <IconButton
              style={{
                position: "absolute",
                right: theme.spacing(1),
                top: theme.spacing(1),
              }}
              aria-label="close"
              onClick={handleClose}
            >
              <CancelIcon color="error" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              color="secondary"
              size="small"
              value={state.post.title}
              name="title"
              fullWidth
              error={err}
              margin="dense"
              id="title"
              label="Title"
              type="text"
              onChange={handleFieldChange}
              helperText={errMsg.title ? errMsg.title : "Enter your post title"}
            />
            <TextField
              color="secondary"
              name="subTitle"
              value={state.post.subTitle}
              error={err}
              margin="dense"
              id="subtitle"
              label="Subtitle"
              type="text"
              fullWidth
              size="small"
              onChange={handleFieldChange}
              helperText={
                errMsg.sub_title ? errMsg.sub_title : "Enter your post subtitle"
              }
            />
            <TextField
              color="secondary"
              value={state.post.slug}
              name="slug"
              rows={5}
              error={err}
              margin="dense"
              label="Slug"
              id="slug"
              type="text"
              fullWidth
              size="small"
              onChange={handleFieldChange}
              onFocus={handleSlugFieldOnFocus}
              helperText={errMsg.slug ? errMsg.slug : "Enter your post slug"}
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={featurePost}
                    onChange={handleCheckBox}
                  />
                }
                label="Show as featured Post"
              />
            </FormGroup>

            <StyledInputLabel>
              Select Tags
              {tagState.tagsLoading && (
                <CircularProgress
                  size={14}
                  thickness={7}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </StyledInputLabel>
            {!tagState.tagsLoading && (
              <Select
                size="small"
                disabled={tagState.tags.length > 0 ? false : true}
                fullWidth
                multiple
                value={
                  tagState.tags.length > 0 ? selectedTags : ["No tag found"]
                }
                onChange={handleChangeTags}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        size="small"
                        key={value}
                        label={value}
                        style={{ margin: 1, borderRadius: "10px" }}
                        color="primary"
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tagState.tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.name}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            )}

            <StyledInputLabel>
              Select Categories
              {categoryState.categoriesLoading && (
                <CircularProgress
                  size={14}
                  thickness={7}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </StyledInputLabel>
            {!categoryState.categoriesLoading && (
              <Select
                color="secondary"
                size="small"
                disabled={categoryState.categories.length > 0 ? false : true}
                fullWidth
                multiple
                value={selectedCategories}
                onChange={handleChangeCategories}
                renderValue={(selected) => (
                  <StyledDivChip>
                    {selected.map((value) => (
                      <Chip
                        size="small"
                        key={value}
                        label={value}
                        style={{ margin: 1, borderRadius: "10px" }}
                        color="secondary"
                      />
                    ))}
                  </StyledDivChip>
                )}
                MenuProps={MenuProps}
              >
                {categoryState.categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}

            {post ? (
              <>
                <StyledInputLabel>Current Cover Photo</StyledInputLabel>
                <Box style={{ textAlign: "center" }}>
                  <img
                    style={{
                      height: "inherit",
                      paddingTop: 5,
                      maxWidth: "100%",
                      width: "300px",
                    }}
                    src={
                      state.cover != ""
                        ? [state.cover.location, state.cover.name].join("/")
                        : "cover image"
                    }
                  />
                </Box>
              </>
            ) : null}
            <label htmlFor="contained-cover-file">
              <Input
                disabled={state.cover ? true : false}
                accept="image/*"
                onChange={(e) => handleUploadCoverImage(e.target.files)}
                id="contained-cover-file"
                multiple
                type="file"
              />
              <Button
                color="secondary"
                startIcon={<CloudUploadIcon fontSize="large" />}
                fullWidth
                style={{
                  borderStyle: "dashed",
                  marginTop: "20px",
                  textTransform: "none",
                }}
                variant="outlined"
                component="span"
              >
                {state.cover != ""
                  ? "Cover picture uploaded"
                  : "Upload Project Picture"}
              </Button>
            </label>

            <StyledInputLabel>
              {state.images.length > 0
                ? `Total new post images: ${state.images.length}`
                : `No ${op} images...`}
            </StyledInputLabel>
            <StyledImageBox>
              {state.images.map((img, index) => (
                <div style={{ position: "relative" }} key={index}>
                  <IconButton
                    onClick={() => handleDeletePostImages(img.id)}
                    style={{ position: "absolute", zIndex: 2, right: 0 }}
                  >
                    <CancelIcon color="error" />
                  </IconButton>
                  <img
                    style={{
                      position: "relative",
                      width: "auto",
                      height: "150px",
                      maxWidth: "100%",
                      padding: 5,
                    }}
                    src={[img.location, img.name].join("/")}
                  />
                </div>
              ))}
            </StyledImageBox>

            <StyledInputLabel>Body</StyledInputLabel>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              spacing={1}
              justifyContent="space-around"
            >
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  color="secondary"
                  type="text"
                  value={state.post.description}
                  fullWidth
                  onChange={handleFieldChange}
                  name="description"
                  id="description"
                  label="Description"
                  multiline
                  variant="outlined"
                />
              </Grid>
              <Hidden lgDown>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Card variant="outlined">
                    <CardContent>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
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
                        {state.post.description}
                      </ReactMarkdown>
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
            </Grid>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "8px" }}
          >
            <Button
              disableElevation
              disabled={
                state.post.slug !== "" &&
                selectedCategories.length > 0 &&
                selectedTags.length > 0
                  ? false
                  : true
              }
              variant="contained"
              style={{ textTransform: "none" }}
              size="large"
              onClick={handleOperation}
            >
              <Typography variant="h5" style={{ color: "#fff" }}>
                {op}
              </Typography>
              {simpleLoading && (
                <StyledCircularProgress
                  color="secondary"
                  size={24}
                  thickness={5}
                />
              )}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PostCUModel;
