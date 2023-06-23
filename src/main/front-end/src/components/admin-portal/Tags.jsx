import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { createTag, deleteTag, getTagsByPage, updateTag } from "../../api/Tag";
import DeleteModel from "../utils/DeleteModel";
import SimpleCUModel from "../utils/SimpleCModel";
import {
  showSimpleCUModel,
  showSimpleDeleteModel,
} from "../../redux/actions/modelAction";
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
  maxHeight: "80vh",
});
const StyledTitle = styled(Typography)({
  color: "#fff",
  flex: "1 1 100%",
});
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: theme.palette.primary.main,
}));

const Tags = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { authenticated, token } = useSelector((rs) => rs.userReducer);
  const { simpleLoading } = useSelector((rs) => rs.notificationReducer);
  const { simpleCUModelOpen, simpleUModelOpen, simpleDeleteModelOpen } =
    useSelector((rs) => rs.modelReducer);

  const [state, setState] = useState({
    id: 0,
    tag: "",
    tags: [],
    msg: "",
  });
  const [page, setPage] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchOrder, setSearchOrder] = useState("desc");
  const [showSearchField, setShowSearchField] = useState(false);
  const [pageIndex, setPageIndex] = useState({
    startIndex: 0,
    endIndex: 9,
  });

  const handleChangePage = (event, value) => {
    console.log(value);
    setPageIndex({
      ...pageIndex,
      startIndex: 10 * (value - 1),
      endIndex: 10 * value - 1,
    });
    setPage(value);
  };

  const openSimpleCUModel = () => {
    dispatch(showSimpleCUModel({ simpleCUModelOpen: true }));
  };

  const openSimpleUpdateModel = (id, name) => {
    setState({ ...state, id: id, tag: name });
    dispatch(showSimpleCUModel({ simpleUModelOpen: true }));
  };
  const openSimpleDeleteModel = (id, name) => {
    setState({ ...state, id: id, tag: name });
    dispatch(showSimpleDeleteModel({ simpleDeleteModelOpen: true }));
  };

  const getAllTag = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getTagsByPage(page, searchKeyword, searchOrder);
    if (res.status == 200) {
      setState({ ...state, tags: res.data.tags });
      setNumberOfElements(res.data.numberOfElements);
      setTotalElements(res.data.totalElements);
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      setState({ ...state, msg: res.data.message });
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  const handleOnCreate = async (name) => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await createTag(name);
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
      setState({ ...state, tags: [...state.tags, res.data.tag] });

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

  const handleOnUpdate = async (name) => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await updateTag(state.id, name);
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

      state.tags.map((tag) => {
        if (tag.id == state.id) {
          tag.name = name;
        }
      });
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

  const handleOnDelete = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await deleteTag(state.id);
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
      let tags = state.tags.filter((t) => t.id != state.id);
      if (tags.length <= 0)
        setState({ ...state, msg: "No tag found", tags: [] });
      else setState({ ...state, tags: tags });

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

  useEffect(() => {
    getAllTag();
  }, [page, searchKeyword]);

  return (
    <>
      <Grid
        sx={{
          position: "fixed",
          minHeight: "93vh",
          [theme.breakpoints.down("md")]: {
            alignItems: "flex-start",
          },
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {state.tags.length > 0 && (
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
                Tags
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
                  {state.tags != undefined &&
                    state.tags.map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">
                            <Typography color="secondary">
                              {row.name}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="warning"
                              onClick={() =>
                                openSimpleUpdateModel(row.id, row.name)
                              }
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="error"
                              onClick={() =>
                                openSimpleDeleteModel(row.id, row.name)
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
              rowsPerPageOptions={[]}
              component="div"
              count={totalElements}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
            />
          </Grid>
        )}
        {state.tags.length <= 0 && (
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
        <SimpleCUModel
          op="Create"
          title="Create a tag"
          textFieldLabel="Tag name"
          handleOnOperation={handleOnCreate}
        />
      )}
      {simpleUModelOpen && (
        <SimpleCUModel
          op="Update"
          title={`Edit "${state.tag}"`}
          textFieldLabel="Tag name"
          handleOnOperation={handleOnUpdate}
        />
      )}
      {simpleDeleteModelOpen && (
        <DeleteModel title={state.tag} handleOnDelete={handleOnDelete} />
      )}
      <TrackRoute title="Manage Tags" />
    </>
  );
};

export default Tags;
