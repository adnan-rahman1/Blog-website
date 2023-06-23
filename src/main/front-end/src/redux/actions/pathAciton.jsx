const setCurrentRoute = (state) => ({
  type: "CURRENT_ROUTE",
  payload: {
    ...state,
  },
});

export { setCurrentRoute };
