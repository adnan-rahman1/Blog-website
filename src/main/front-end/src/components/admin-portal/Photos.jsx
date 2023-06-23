import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, getAllImages } from "../../api/picture";
import { showSimpleDeleteModel } from "../../redux/actions/modelAction";
import {
  showLoading,
  showNotification,
} from "../../redux/actions/notificationAction";
import DeleteModel from "../utils/DeleteModel";

import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import TrackRoute from "../header/TrackRoute";

const StyledImageList = styled(ImageList)({
  paddingTop: "10px",
});
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.wht,
}));
const StyledImageListItemBar = styled(ImageListItemBar)({
  background:
    "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
});
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledImagePreview = styled("img")({
  maxHeight: "95vh",
  // maxWidth: "100vw",
});
const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  marginLeft: "auto",
  right: "0px",
  borderRadius: 0,
  background: theme.palette.secondary.main,
  color: theme.palette.background.paper,
}));

const Photos = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const xxScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const xsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));
  const mdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const lgScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const { authenticated, token } = useSelector((rs) => rs.userReducer);
  const { simpleDeleteModelOpen } = useSelector((rs) => rs.modelReducer);

  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const [state, setState] = useState({
    photos: [],
  });

  const handleOpen = (currentImage) => {
    setImage(currentImage);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const openSimpleDeleteModel = (currentImage) => {
    setImage(currentImage);
    dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: true }));
  };

  const handleOnDelete = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await deleteImage(image.id);
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
      let photos = state.photos.filter((p) => p.id != image.id);
      if (photos.length <= 0)
        setState({ ...state, msg: "No photo found", photos: [] });
      else setState({ ...state, photos: photos });

      dispatch(
        showSimpleDeleteModel({
          simpleDeleteModelOpen: false,
          err: false,
          errMsg: {},
        })
      );
      dispatch(showLoading({ simpleLoading: false }));
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
      dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: false }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const getAllPhotos = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getAllImages();
    if (res.status == 200) {
      setState({ ...state, photos: res.data });
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  useEffect(() => {
    if (authenticated && token !== "") {
      getAllPhotos();
    }
  }, []);

  return (
    <Grid
      sx={{
        minHeight: "94vh",
        [theme.breakpoints.down("md")]: {
          alignItems: "flex-start",
        },
      }}
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={11} sm={11} md={11} lg={10}>
        <StyledImageList
          rowHeight={200}
          cols={
            xxScreen
              ? 1
              : xsScreen
              ? 2
              : smScreen
              ? 3
              : mdScreen
              ? 4
              : lgScreen
              ? 5
              : 6
          }
        >
          {state.photos.map((photo) => (
            <ImageListItem key={photo.id}>
              <IconButton
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  left: "auto",
                  right: 0,
                  top: 5,
                  marginRight: 1,
                  color: theme.palette.common.wht,
                  padding: 1,
                }}
                onClick={() => handleOpen(photo)}
                aria-label={`info about ${photo.name}`}
              >
                <ZoomOutMapIcon />
              </IconButton>
              <img
                src={`${[photo.location, photo.name].join(
                   "/"
                 )}?w=248&fit=crop&auto=format`}
                 srcSet={`${[photo.location, photo.name].join(
                   "/"
                 )}?w=248&fit=crop&auto=format&dpr=2 2x`}
                 alt={photo.name}
                 loading="lazy"
              />
              <StyledImageListItemBar
                title={photo.name.split(".")[0]}
                actionIcon={
                  <StyledIconButton
                    color="error"
                    onClick={() => openSimpleDeleteModel(photo)}
                    aria-label={`info about ${photo.name}`}
                  >
                    <DeleteForeverIcon />
                  </StyledIconButton>
                }
              />
            </ImageListItem>
          ))}
        </StyledImageList>
      </Grid>
      <Grid item>
        <StyledModal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Box style={{ position: "relative", textAlign: "center", margin: 3 }}>
            <StyledImagePreview
              src={image ? [image.location, image.name].join("/") : ""}
              alt={image ? image.name : "exmaple image"}
            />
            <StyledCloseIconButton
              onClick={handleClose}
              disableRipple
              disableTouchRipple
              disableFocusRipple
            >
              <CloseIcon />
            </StyledCloseIconButton>
          </Box>
        </StyledModal>
      </Grid>
      {simpleDeleteModelOpen && (
        <DeleteModel title={image.name} handleOnDelete={handleOnDelete} />
      )}
      <TrackRoute title="Manage Images" />
    </Grid>
  );
};

export default Photos;
