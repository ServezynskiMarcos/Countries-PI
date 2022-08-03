const initialState = {
  countries: [],
  allCountries: [],
  countryDetail: [],
  activities: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case "FILTER_BY_CONTINENT":
      const allCountries = state.allCountries;
      // console.log("hola", allCountries)
      const continentFiltered =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((e) => e.continent === action.payload);
      return {
        ...state,
        countries: continentFiltered,
      };

    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: sortedArr,
      };
    case "ORDER_BY_POPULATION":
      const orderPopulation =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.population > b.population) {
                return -1;
              }
              if (b.population > a.population) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: orderPopulation,
      };
    case "GET_SEARCH_NAME":
      return {
        ...state,
        countries: action.payload,
      };
    case "GET_COUNTRIES_BY_ID":
      return {
        ...state,
        countryDetail: action.payload,
      };
    case "POST_ACTIVITY":
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case "GET_ACTIVITY":
      return {
        ...state,
        activities: action.payload,
      };
    case "FILTER_ACTIVITY":
      const all = state.allCountries;
      const filter = all.filter((country) => {
        let countryAct = country.activities.map((e) => e.name);
        return countryAct.includes(action.payload) ? country : null;
      });
      return {
        ...state,
        countries: filter,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
