import React from "react";
import "./Style.css";
import logo from "./img/lg.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCountries,filterCountryByContinent,orderByName,orderByPopulation,getSearchName,getActivity,filterActivity,} from "../../redux/actions";
import Detail from "../Detail/Detail";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

const Home = () => {
  
  const allCountries = useSelector((state) => state.countries); // me traigo todo lo que tengo en el estado
  const allActivities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const [orden, setOrden] = useState("");
  const countriesPerPage = 10;
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //0
  const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  
  const dispatch = useDispatch();
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());
  }, [dispatch]);

  const inputHandler = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchName(inputText));
    e.target.reset();
  };

  const handleFilterContinent = (e) => {
    //console.log(e.target.value);
    dispatch(filterCountryByContinent(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden({
      ...orden,
      orden: e.target.value
    });
  };
  const handleSortPopulation = (e) => {
    e.preventDefault(e);
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden({
      ...orden,
      orden: e.target.value
    });
  };
  const handleActivity = (e) => {
    e.preventDefault(e);
    dispatch(filterActivity(e.target.value));
  };
  return (
    <>
      {currentCountries.length ? (
        <div className="container">
          <div className="div1">
            <a href="/countries">
              <img src={logo} alt="logo"></img>
            </a>
            <form className="form">
              <label>
                CONTINENT
                <br></br>
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleFilterContinent(e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                  <option value="All">All</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Oceania">Oceania</option>
                </select>
              </label>

              <label>
                NAME ALPHABETICALLY
                <br></br>
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleSort(e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                  <option value="asc">Order A</option>
                  <option value="des">Order Z</option>
                </select>
              </label>
              <label>
                ACTIVITIES
                <br></br>
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleActivity(e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                  {allActivities &&
                    allActivities.map((e) => {
                      return <option key={e.id}>{e.name}</option>;
                    })}
                </select>
              </label>

              <label>
                POPULATION
                <br></br>
                <select
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleSortPopulation(e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose
                  </option>
                  <option value="asc">Lower Population</option>
                  <option value="des">Higher Population</option>
                </select>
              </label>
            </form>

            <Pagination
              countriesPerPage={countriesPerPage}
              allCountries={allCountries.length}
              paginado={paginado}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            {/* //!SEARCH BAR */}
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  className="search"
                  placeholder="Search..."
                  name="name"
                  type="text"
                  onChange={(e) => inputHandler(e)}
                ></input>
                <input type="submit" className="btn"></input>
              </form>
            </div>
            {/* //!SEARCH BAR */}
            <Link to="/activities">
              <button type="button" className="buttonActivity"></button>
            </Link>
          </div>

          <div className="card">
            {currentCountries &&
              currentCountries.map((e) => {
                return (
                  <Detail
                    key={e.id}
                    name={e.name}
                    img={e.img}
                    continent={e.continent}
                    id={e.id}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Home;
