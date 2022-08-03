import { getCountryById } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import "./Style.css";
import { useHistory } from "react-router-dom";
const DetailCountry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getCountryById(id));
  }, [dispatch, id]);
  
  const oneCountry = useSelector((state) => state.countryDetail);
  
  return (
    <div className="countryDetail">
      {oneCountry?.map((el) => {
        return (
          <div className="contenido" key={el.id}>
            <button
              onClick={() => history.goBack()}
              type="button"
              className="bac"
            >
              x
            </button>

            <h1>{el.name} Details</h1>

            <hr />
            <img src={el.img} alt="Country Flag" />
            <p>Capital: {el.capital}</p>
            <p>
              Population: {new Intl.NumberFormat("de-DE").format(el.population)}
            </p>
            <p>Continent: {el.continent}</p>
            <p>Subcontinent: {el.subregion}</p>
            <p>Area: {new Intl.NumberFormat("de-DE").format(el.area)} Km2</p>
            {el.activities.length > 0 ? (
              <div>
                <p className="acti">Activities: </p>
              </div>
            ) : (
              <Link to="/activities">
                <p
                  style={{
                    color: "white",
                    textTransform: "uppercase",
                    backgroundColor: "red",
                  }}
                >
                  {el.name} does not have an activity created
                </p>
              </Link>
            )}
            {el.activities &&
              el.activities.map((e) => {
                return (
                  <select className="listAct" key={e.id}>
                    <option>{e.name}</option>
                    <option disabled>Season: {e.season}</option>
                    <option disabled>Difficulty: {e.difficulty}</option>
                    <option disabled>Duration: {e.duration}</option>
                  </select>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default DetailCountry;
