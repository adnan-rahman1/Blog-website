import store from "../redux/store";

const getToken = async () => {
    const state = await store.getState();
    const { token } = { ...state.userReducer } ;
    return token;
}

export default getToken;