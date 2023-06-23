import {CURRENT_ROUTE} from "../types/pathActionTypes";

const initialState = {
    currentRoute: "",
}
const pathReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENT_ROUTE:
            return {...state, ...action.payload }
        default:
            return { ...state }
            }

    }

    export default pathReducer;

