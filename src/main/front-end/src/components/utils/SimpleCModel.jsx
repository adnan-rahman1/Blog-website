import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSimpleCUModel } from "../../redux/actions/modelAction";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "@emotion/styled";

const StyledCircularProgress = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "auto",
  marginTop: -10,
  marginLeft: -100,
});

const SimpleCUModel = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { simpleCUModelOpen, simpleUModelOpen, err, errMsg } = useSelector(
    (rs) => ({ ...rs.modelReducer })
  );
  const { simpleLoading } = useSelector((rs) => ({
    ...rs.notificationReducer,
  }));

  const { op, title, textFieldLabel, handleOnOperation } = props;

  const [state, setState] = useState({
    name: "",
  });

  const handleTextFieldChange = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const handleClose = () => {
    dispatch(
      showSimpleCUModel({
        simpleCUModelOpen: false,
        simpleUModelOpen: false,
        err: false,
        errMsg: "",
      })
    );
  };

  const handleOperation = () => {
    handleOnOperation(state.name);
  };
  return (
    <Dialog
      open={simpleCUModelOpen || simpleUModelOpen}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Typography variant="body1">{title}</Typography>
        <IconButton
          sx={{
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
          error={err}
          autoFocus
          margin="dense"
          id="name"
          label={textFieldLabel}
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleTextFieldChange}
          helperText={errMsg.name}
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button variant="contained" onClick={handleOperation} fullWidth>
          {op}
          {simpleLoading && (
            <StyledCircularProgress size={18} style={{ color: "#fff" }} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleCUModel;
