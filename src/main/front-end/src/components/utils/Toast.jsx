import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from "../../redux/actions/notificationAction"

const Toast = () => {

    const {
        msgType,
        msgText,
        anchorOrigin,
        varient,
        open,
    } = useSelector(state => state.notificationReducer);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'timeout') {
            dispatch(showNotification({ open: false }))
        }
    };


    return (
        <Snackbar
            anchorOrigin={anchorOrigin}
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}
            TransitionComponent={Slide}
        >
            <Alert variant={varient} elevation={3} severity={msgType}>
                {msgText}
            </Alert>
        </Snackbar>
    )
}

export default Toast;