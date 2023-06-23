import { OPEN_SIMPLE_CU_MODEL, OPEN_SIMPLE_DELETE_MODEL} from "../types/modelActionTypes";

const initialState = {
    simpleCUModelOpen: false,
    simpleUModelOpen: false,
    simpleDeleteModelOpen: false,
    err: false,
    errMsg: {
        name: ""
    },
    loading: false,
}
const modelReducer = (state = initialState, action) => {

    switch (action.type) {
        case OPEN_SIMPLE_CU_MODEL:
            return { ...state, ...action.payload };
        case OPEN_SIMPLE_DELETE_MODEL:
            return { ...state, ...action.payload };
        default:
            return { ...state }
    }

}

export default modelReducer;