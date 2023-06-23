import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { showSimpleDeleteModel } from "../../redux/actions/modelAction";

const StyledCircularProgress = styled(CircularProgress)({
  float: "right",
});

const DeleteModel = (props) => {
  const dispatch = useDispatch();
  const { simpleDeleteModelOpen } = useSelector((rs) => ({
    ...rs.modelReducer,
  }));
  const { simpleLoading } = useSelector((rs) => ({
    ...rs.notificationReducer,
  }));

  const { title, handleOnDelete } = props;

  const handleClose = () => {
    dispatch(
      showSimpleDeleteModel({
        simpleDeleteModelOpen: false,
        err: false,
        errMsg: "",
      })
    );
  };

  const handleDelete = () => {
    handleOnDelete();
  };

  return (
    <Dialog
      open={simpleDeleteModelOpen}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {simpleLoading && (
          <StyledCircularProgress
            color="secondary"
            size={24}
            color="secondary"
          />
        )}
        <Typography variant="subtitle1">Delete "{title}" ?</Typography>
      </DialogTitle>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          fullWidth
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          fullWidth
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModel;
