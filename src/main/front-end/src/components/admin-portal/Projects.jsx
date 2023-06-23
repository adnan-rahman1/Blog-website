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
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../api/Project";
import DeleteModel from "../utils/DeleteModel";
import {
  showSimpleCUModel,
  showSimpleDeleteModel,
} from "../../redux/actions/modelAction";
import ProjectCUModel from "../utils/ProjectCUModel";
import { uploadImage } from "../../api/picture";
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

const Projects = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { authenticated, token } = useSelector((rs) => rs.userReducer);
  const { simpleLoading } = useSelector((rs) => rs.notificationReducer);
  const { simpleCUModelOpen, simpleUModelOpen, simpleDeleteModelOpen } =
    useSelector((s) => ({ ...s.modelReducer }));

  const [state, setState] = useState({
    id: 0,
    project: {},
    projects: [],
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

  const openSimpleUpdateModel = (project) => {
    setState({ ...state, project: project });
    dispatch(showSimpleCUModel({ simpleUModelOpen: true }));
  };
  const openSimpleDeleteModel = (id, name) => {
    setState({ ...state, id: id, project: name });
    dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: true }));
  };

  const hanldeOnUpdateProject = async (project) => {
    const res = await updateProject(project);
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
      const projects = state.projects.filter((p) => p.id !== project.id);
      setState({ ...state, projects: [...projects, project] });
      dispatch(
        showSimpleCUModel({ simpleUModelOpen: false, err: false, errMsg: {} })
      );
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showSimpleCUModel({ err: true, errMsg: { ...res.data } }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

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

  const handleOnCreateProject = async (project) => {
    const res = await createProject(project);
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
      setState({ ...state, projects: [...state.projects, res.data.project] });
      dispatch(
        showSimpleCUModel({ simpleCUModelOpen: false, err: false, errMsg: {} })
      );
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      dispatch(showSimpleCUModel({ err: true, errMsg: { ...res.data } }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const handleOnCreate = async (project, images) => {
    dispatch(showLoading({ simpleLoading: true }));
    const slug = project.name.toLowerCase().split(" ").join("-");
    let imgs = [];
    let i = 0;
    if (images.length <= 0) {
      await handleOnCreateProject(project);
    }
    while (i < images.length) {
      let res = await uploadImage(images[i].file, {
        section: "project",
        directory: `project/${slug}`,
      });
      if (res.status === 200) {
        imgs.push(res.data.picture);

        if (i == images.length - 1) {
          dispatch(
            showNotification({
              open: true,
              varient: "filled",
              msgType: "success",
              msgText: res.data.message,
              anchorOrigin: { vertical: "top", horizontal: "center" },
            })
          );

          let newProject = {
            ...project,
            pictures: imgs,
          };
          await handleOnCreateProject(newProject);
        }
        i++;
      } else if (res.status == 400) {
        dispatch(showLoading({ simpleLoading: false }));
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
    }
  };

  const handleOnUpdate = async (project, images) => {
    console.log(images);
    dispatch(showLoading({ simpleLoading: true }));
    const slug = project.name.toLowerCase().split(" ").join("-");
    let imgs = [];
    let i = 0;
    if (images <= 0) {
      await hanldeOnUpdateProject(project);
    }
    while (i < images.length) {
      let res = await uploadImage(images[i].file, `project/${slug}`);
      if (res.status === 200) {
        imgs.push(res.data.picture);

        if (i == images.length - 1) {
          dispatch(
            showNotification({
              open: true,
              varient: "filled",
              msgType: "success",
              msgText: res.data.message,
              anchorOrigin: { vertical: "top", horizontal: "center" },
            })
          );

          project = {
            ...project,
            pictures: imgs,
          };
          await hanldeOnUpdateProject(project);
        }
        i++;
      } else if (res.status == 400) {
        dispatch(showLoading({ simpleLoading: false }));
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
    }
  };

  const handleOnDelete = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await deleteProject(state.id);
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
      let projects = state.projects.filter((p) => p.id != state.id);
      if (projects.length <= 0)
        setState({ ...state, msg: "No Project found", projects: [] });
      else setState({ ...state, projects: projects });

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
          anchorOrigin: { vertical: "top", horizontal: "center" },
        })
      );
      dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: false }));
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  useEffect(() => {
    if (authenticated && token !== "") {
      getAllProject();
    }
  }, []);

  return (
    <>
      <Grid
        sx={{
          [theme.breakpoints.down("md")]: {
            alignItems: "flex-start",
          },
          display: simpleCUModelOpen || simpleUModelOpen ? "none" : "flex",
          minHeight: "94vh",
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {!simpleLoading && state.projects.length > 0 && (
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
                Projects
              </StyledTitle>
              <Tooltip title="Create tag">
                <IconButton
                  aria-label="filter list"
                  onClick={openSimpleCUModel}
                >
                  <AddCircleOutlineIcon style={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </StyledToolbar>
            <StyledTableContainer>
              <Table
                sx={{
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
                  {state.projects != undefined &&
                    state.projects.map((project, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">
                            <Typography color="secondary">
                              {project.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="warning"
                              onClick={() => openSimpleUpdateModel(project)}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() =>
                                openSimpleDeleteModel(project.id, project.name)
                              }
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
        {!simpleLoading && state.projects.length <= 0 && (
          <Grid
            container
            spacing={2}
            alignItems="center"
            direction="row"
            justifyContent="center"
            sx={{
              [theme.breakpoints.down("md")]: {
                marginTop: "40vh",
              },
            }}
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
              <IconButton aria-label="Create tag" onClick={openSimpleCUModel}>
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </Grid>

      {simpleCUModelOpen && (
        <ProjectCUModel
          op="Create project"
          title="Add a project"
          handleOnOperation={handleOnCreate}
        />
      )}
      {simpleUModelOpen && (
        <ProjectCUModel
          op="Update project"
          title={`Edit Project`}
          textFieldLabel="Project title"
          project={state.project}
          handleOnOperation={handleOnUpdate}
        />
      )}
      {simpleDeleteModelOpen && (
        <DeleteModel title={state.project} handleOnDelete={handleOnDelete} />
      )}
      <TrackRoute title="Manage Projects" />
    </>
  );
};

export default Projects;
