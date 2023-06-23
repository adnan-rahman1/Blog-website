import {combineReducers} from "redux";
import modelReducer from "./modelReducer";
import notificationReducer from "./notifacationReducer";
import pathReducer from "./pathReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    pathReducer: pathReducer,
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    modelReducer: modelReducer
})

export default rootReducer;
