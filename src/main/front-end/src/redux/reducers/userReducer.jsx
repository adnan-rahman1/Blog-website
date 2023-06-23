import {AUTH_USER} from "../types/userActionTypes";

const initialState = {
    user: null,
    authenticated: false,
    token: ""
}
const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH_USER:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }

}

export default userReducer;

