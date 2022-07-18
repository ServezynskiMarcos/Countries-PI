import axios from "axios";
//!ACA HAGO LA CONEXION DEL FRONT CON EL BACK
export function getCountries() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/countries");
    //si quiero hacer la llamada con fetch tengo que usar .then y no async await
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}
export function getCountriesByName(payload) {
  return async function (dispatch) {
    let json = await axios.get(`/countries?name=${payload}`);
    return dispatch({
      type: "GET_COUNTRIES_BY_NAME",
      payload: json.data,
    });
  };
}
export function getCountryById(payload) {
  return async function (dispatch) {
    let json = await axios.get(`/countries/${payload}`);
    return dispatch({
      type: "GET_COUNTRY_BY_ID",
      payload: json.data,
    });
  };
}
