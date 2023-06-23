import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../../redux/actions/pathAciton";

const TrackRoute = (props) => {
  const dispatch = useDispatch();

  const getCleanRoute = (url) => {
    let cleanUrl = url.split("/")[1] == "blog" ? "/blog" : url;
    document.title = props.title + " | Full Stack App";
    return cleanUrl;
  };

  useEffect(() => {
    dispatch(
      setCurrentRoute({ currentRoute: getCleanRoute(window.location.pathname) })
    );
  }, []);

  return <></>
};

export default TrackRoute;
