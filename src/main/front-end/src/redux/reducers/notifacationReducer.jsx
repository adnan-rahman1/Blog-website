import {
  SHOW_LOADING,
  SHOW_NOTIFICATION,
  SHOW_ERRORS,
  SHOW_SCROLL_POSITION
} from "../types/notificationTypes";

const initialState = {
  open: null,
  msgType: "info",
  msgText: "",
  fill: "standard",
  anchorOrigin: { vertical: "bottom", horizontal: "center" },

  globalLoading: false,
  simpleLoading: false,
  imageUploading: false,

  err: false,
  errMsg: {},
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return { ...state, ...action.payload };
    case SHOW_LOADING:
      return { ...state, ...action.payload };
    case SHOW_ERRORS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default notificationReducer;
