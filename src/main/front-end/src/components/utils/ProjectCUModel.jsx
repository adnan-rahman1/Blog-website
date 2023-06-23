import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../api/Category";
import { getTags } from "../../api/Tag";
import { showSimpleCUModel } from "../../redux/actions/modelAction";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";

const StyledCircularProgress = styled(CircularProgress)({
  color: "#fff",
  position: "absolute",
  top: "50%",
  left: "auto",
  marginTop: -12,
});
const StyledInputLabel = styled(InputLabel)({
  margin: "20px 0 10px 0",
});
const StyledChipsDiv = styled("div")({
  display: "flex",
  flexWrap: "wrap",
});
const StyledImageListItemBar = styled(ImageListItemBar)({
  background:
    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
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


const ProjectCUModel = (props) => {

  const dispatch = useDispatch();
  const { simpleCUModelOpen, simpleUModelOpen, err, errMsg } = useSelector(
    (rs) => ({ ...rs.modelReducer })
  );
  const { simpleLoading } = useSelector((rs) => ({
    ...rs.notificationReducer,
  }));

  const theme = useTheme();
  const xxScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { op, title, project, handleOnOperation } = props;

  const [state, setState] = useState({
    project: project
      ? project
      : {
          name: "",
          link: "",
          description: "",
          tags: [],
          categories: [],
          pictures: [],
        },
    images: [],
  });

  const [categoryState, setCategoryState] = useState({
    categories: [],
    categoriesLoading: false,
  });
  const [tagState, setTagState] = useState({
    tags: [],
    tagsLoading: false,
  });

  const [selectedTags, setSelectedTags] = useState(
    state.project.tags.map((tag) => tag.name)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    state.project.categories.map((category) => category.name)
  );

  const handleChangeTags = (event) => {
    setSelectedTags(event.target.value);
    const tags = event.target.value.map(
      (st) => tagState.tags.filter((t) => t.name == st)[0]
    );
    setState({ ...state, project: { ...state.project, tags: tags } });
  };
  const handleChangeCategories = (event) => {
    setSelectedCategories(event.target.value);
    const categories = event.target.value.map(
      (sc) => categoryState.categories.filter((c) => c.name == sc)[0]
    );
    setState({
      ...state,
      project: { ...state.project, categories: categories },
    });
  };

  const handleFieldChange = (event) => {
    setState({
      ...state,
      project: {
        ...state.project,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handlePreviewImage = (e) => {
    let blob = URL.createObjectURL(e.target.files[0]);
    setState({
      ...state,
      images: [
        ...state.images,
        {
          id: blob.split("-")[2],
          blob: blob,
          file: e.target.files[0],
        },
      ],
    });
  };

  const handleRemovePrevImg = (id) => {
    let filteredPrevImg = state.images.filter((p) => p.id != id);
    setState({
      ...state,
      images: filteredPrevImg,
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

  const handleOperation = () => {
    handleOnOperation(state.project, state.images);
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
    } else if (res.status === 400)
      setCategoryState({
        ...setCategoryState,
        categories: [],
        categoriesLoading: false,
      });
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
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <DialogTitle>
            <Typography
              variant="body1"
              fontSize={25}
              style={{ textAlign: "center", opacity: 0.7 }}
            >
              {title}
            </Typography>
            <IconButton
              aria-label="close"
              sx={{
                position: "absolute",
                right: theme.spacing(1),
                top: theme.spacing(1),
              }}
              onClick={handleClose}
            >
              <CancelIcon color="error" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              color="secondary"
              value={state.project.name}
              name="name"
              fullWidth
              error={errMsg.name ? err : false}
              autoFocus
              margin="dense"
              id="name"
              label="Project name"
              type="text"
              size="small"
              onChange={handleFieldChange}
              helperText={errMsg.name ? errMsg.name : "Enter your project name"}
            />
            <TextField
              color="secondary"
              size="small"
              value={state.project.description}
              name="description"
              multiline
              rows={5}
              error={errMsg.description ? err : false}
              autoFocus
              margin="dense"
              id="description"
              label="Project description"
              type="text"
              fullWidth
              onChange={handleFieldChange}
              helperText={
                errMsg.description
                  ? errMsg.description
                  : "Enter your project description"
              }
            />
            <TextField
              color="secondary"
              size="small"
              value={state.project.link}
              name="link"
              error={errMsg.link ? err : false}
              autoFocus
              margin="dense"
              id="link"
              label="Project URL"
              type="text"
              fullWidth
              placeholder="http://www.example.com"
              onChange={handleFieldChange}
              helperText={errMsg.link ? errMsg.link : "Enter your project link"}
            />

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
                color="secondary"
                size="small"
                disabled={tagState.tags.length > 0 ? false : true}
                fullWidth
                multiple
                value={
                  tagState.tags.length > 0 ? selectedTags : ["No tag found"]
                }
                onChange={handleChangeTags}
                renderValue={(selected) => (
                  <StyledChipsDiv>
                    {selected.map((value) => (
                      <Chip
                        style={{ margin: 1, borderRadius: "8px" }}
                        size="small"
                        key={value}
                        label={value}
                        color="primary"
                      />
                    ))}
                  </StyledChipsDiv>
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
                  <StyledChipsDiv>
                    {selected.map((value) => (
                      <Chip
                        style={{ margin: 1, borderRadius: "8px" }}
                        size="small"
                        key={value}
                        label={value}
                        color="secondary"
                      />
                    ))}
                  </StyledChipsDiv>
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
            {project ? (
              <ImageList
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
                rowHeight={130}
                cols={xxScreen ? 1 : 3}
              >
                {project.pictures.map((photo) => (
                  <ImageListItem key={photo.id}>
                    <img
                      style={{
                        height: "inherit",
                        maxWidth: "100%",
                        width: "auto",
                        right: 0,
                        margin: "auto",
                      }}
                      src={[photo.location, photo.name].join("/")}
                    />
                    <StyledImageListItemBar
                      title=""
                      actionIcon={
                        <IconButton aria-label={`info about ${photo.name}`}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : null}
            <label htmlFor="contained-button-file">
              <Input
                disabled={
                  state.images.length + state.project.pictures.length >= 3 ||
                  state.images.length >= 3 ||
                  state.project.pictures.length >= 3
                    ? true
                    : false
                }
                accept="image/*"
                onChange={handlePreviewImage}
                id="contained-button-file"
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
                {state.images.length + state.project.pictures.length >= 3 ||
                state.images.length >= 3 ||
                state.project.pictures.length >= 3
                  ? "At most 3 picture can be uploaded"
                  : "Upload Project Picture"}
              </Button>
            </label>
            {state.images.length > 0 ? (
              <ImageList
                style={{
                  paddingTop: "10px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
                rowHeight={130}
                cols={xxScreen ? 1 : 3}
              >
                {state.images.map((prevImg) => (
                  <ImageListItem key={prevImg.id}>
                    <img
                      style={{
                        height: "inherit",
                        maxWidth: "100%",
                        width: "auto",
                        right: 0,
                        margin: "auto",
                      }}
                      src={prevImg.blob}
                    />
                    <ImageListItemBar
                      style={{ background: "inherit" }}
                      position="top"
                      actionIcon={
                        <IconButton
                          onClick={() => handleRemovePrevImg(prevImg.id)}
                          style={{ marginRight: "5px" }}
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography
                style={{ marginTop: "5px" }}
                color="error"
                variant="body1"
              >
                No picture uploaded yet
              </Typography>
            )}
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "8px" }}
          >
            <Button
              disabled={
                state.project.categories.length <= 0 ||
                state.project.tags.length <= 0
                  ? true
                  : false
              }
              variant="contained"
              size="large"
              disableElevation
              onClick={handleOperation}
              color="primary"
              style={{ textTransform: "none" }}
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

export default ProjectCUModel;
