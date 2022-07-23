import { getCountryById } from "../../redux/actions";
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
  }, [dispatch, id]);

  const oneCountry = useSelector((state) => state.countryDetail);
  //console.log('HOLAAAAAAAAAAAAAAAAAAA',oneCountry)
  return (
  
      <div className="countryDetail">
      
        {oneCountry.map((el) => {
          return (
            <div className="contenido">
            <Link to="/countries">
                <button type="button" className="bac">x</button>
              </Link>
              <h1>{el.name} Details</h1>
              
              <hr/>
              <img src={el.img} alt="Country Flag" />
              <p>Capital: {el.capital}</p>
              <p>Population: {el.population}</p>
              <p>Continent: {el.continent}</p>
              <p>Subcontinent: {el.subregion}</p>
              <p>Area: KM2 {el.area}</p>
              {el.activities &&
                el.activities.map((e) => {
                  return <p>Activities: {e.name}</p>;
                })}
            </div>
          );
        })}
        
      </div>
    
  );
};

export default DetailCountry;
