import { useEffect, useState } from "react";
import { getProjects } from "../../../api/Project";
import { useDispatch } from "react-redux";
import { showLoading } from "../../../redux/actions/notificationAction";
import ProjectList from "./project/ProjectList";
import TrackRoute from "../../header/TrackRoute";

const Project = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    projects: [],
  });

  const getAllProject = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getProjects();
    if (res.status == 200) {
      setState({ ...state, projects: res.data });
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      setState({ ...state, msg: res.data.message });
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  useEffect(getAllProject, []);

  return (
    <div style={{ minHeight: "94vh" }}>
      <ProjectList projects={state.projects} />
      <TrackRoute title="Project" />
    </div>
  );
};

export default Project;
