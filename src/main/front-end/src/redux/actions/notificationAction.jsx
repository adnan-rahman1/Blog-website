const showNotification = (state) => ({
    type: "SHOW_NOTIFICATION",
    payload: {
        ...state
    }
});

const showLoading = (state) => ({
    type: "SHOW_LOADING",
    payload: {
        ...state
    }
});

const showErrors = (state) => ({
    type: "SHOW_ERRORS",
    payload: {
        ...state
    }
});

export {
    showNotification,
    showLoading,
    showErrors
};