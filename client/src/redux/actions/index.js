import axios from "axios";
//!ACA HAGO LA CONEXION DEL FRONT CON EL BACK
export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries");
    //si quiero hacer la llamada con fetch tengo que usar .then y no async await
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function filterCountryByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload: payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}
export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload: payload,
  };
}
export function getSearchName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      return dispatch({
        type: "GET_SEARCH_NAME",
        payload: json.data,
      });
    } catch (err) {
      alert('country not found');
    }
  };
}
export function getCountryById(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: "GET_COUNTRIES_BY_ID",
        payload: json.data,
      });
    } catch (err) {
      alert('country not found');
      return window.location.href ="http://localhost:3000/countries";
    }
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    // console.log("ESTE ES EL PAYLOAD: ",payload);
    const json = await axios.post("http://localhost:3001/activities", payload);
    // console.log(payload);
    return dispatch({
      type: "POST_ACTIVITY",
      payload: json.data,
    });
  };
}

export function getActivity() {
  return async function (dispatch) {
    const response = await axios.get("http://localhost:3001/activities");
    return dispatch({
      type: "GET_ACTIVITY",
      payload: response.data,
    });
  };
}

export function filterActivity(payload){
  return{
    type: "FILTER_ACTIVITY",
    payload: payload
  }
}
export function clear(){

  return{
    type: "CLEAR",
  }
}
