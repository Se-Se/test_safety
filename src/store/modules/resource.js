const resourceReducer = (
  state = {
    pageType: "resource",
  },
  action
) => {
  switch (action.type) {
    case "SET_PAGE_TYPE":
      return { ...state, pageType: action.pageType };
    default:
      return state;
  }
};

export default resourceReducer;