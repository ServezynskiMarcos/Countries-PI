import { getCountryById, clear } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import "./Style.css";

const DetailCountry = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryById(id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);

  const oneCountry = useSelector((state) => state.countryDetail);
  //console.log('HOLAAAAAAAAAAAAAAAAAAA',oneCountry)
  return (
    <div className="countryDetail">
      {oneCountry.map((el) => {
        return (
          <div className="contenido" key={el.id}>
            <a href="/countries">
              <button type="button" className="bac">
                x
              </button>
            </a>
            <h1>{el.name} Details</h1>

            <hr />
            <img src={el.img} alt="Country Flag" />
            <p>Capital: {el.capital}</p>
            <p>Population: {el.population}</p>
            <p>Continent: {el.continent}</p>
            <p>Subcontinent: {el.subregion}</p>
            <p>Area: KM2 {el.area}</p>
            {el.activities.length > 0 ? (
              <p>Activities: </p>
            ) : (
              <Link to="/activities">
                <p style={{ color: "red", textTransform: "uppercase" }}>
                  {el.name} does not have an activity created
                </p>
              </Link>
            )}
            {el.activities &&
              el.activities.map((e) => {
                return (
                  <select className= "listAct">
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
