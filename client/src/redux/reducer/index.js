const initialState = {
  countries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_COUNTRIES_BY_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_COUNTRIES_BY_ID":
      return {
        ...state,
        countries: action.payload,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
