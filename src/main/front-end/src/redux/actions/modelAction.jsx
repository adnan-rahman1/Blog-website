const showSimpleCUModel = (state) => ({
    type: "OPEN_SIMPLE_CU_MODEL",
    payload: {
        ...state
    }
});

const showSimpleDeleteModel = (state) => ({
    type: "OPEN_SIMPLE_DELETE_MODEL",
    payload: {
        ...state
    }
});

export {
    showSimpleCUModel,
    showSimpleDeleteModel,
};