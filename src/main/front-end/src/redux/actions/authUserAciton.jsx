
const authUser = (state) => ({
    type: "AUTH_USER",
    payload: {
        ...state
    }
});

export {
   authUser 
};