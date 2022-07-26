import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountryByContinent,
  orderByName,
  orderByPopulation,
  getSearchName,
  getActivity,
  filterActivity,
} from "../../redux/actions";
//import { Link } from "react-router-dom";
import Detail from "../Detail/Detail";
import "./Style.css";
import Pagination from "../Pagination/Pagination";
import logo from "./lg.png";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); // me traigo todo lo que tengo en el estado
  const allActivities = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputText, setInputText] = useState("");
  const [orden, setOrden] = useState("");
  const [ordenPoblation, setOrdenPoblation] = useState(""); // Seteo en 1 pq quiero que mi pagina siempre arranque desde la pagina 1
  const [countriesPerPage, setCountriesPerPage] = useState(9); // aca le digo cuantos paises quiero tener por pag.
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  // 0 // indice del ultimo pais - la cantidad de paises por pagina
  // 9 // indice currentPage = 1 * cPerPage = 9===9
  // slice() devuelve una copia de una parte del array dentro de un nuevo array empezando por inicio hasta fin (fin no incluido). El array original no se modificará.
  //slice extrae hasta, pero sin incluir el final
  const currentCountries = allCountries.slice(
    indexOfFirstCountry, //0
    indexOfLastCountry //9
  );
  //allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  //1------  Mi primer pais tiene indice 0 y el ultimo indice 9
  //2------  Mi primer pais tiene indice 10 y el ultimo indice 19

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // useEffect se ejecuta después del primer renderizado y después de cada actualización, cada vez que el DOM renderiza o actualiza, useEffect ejecuta un dispatch de la action que me trae todos los paises de la API.
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
    setOrden(`Ordenado ${e.target.value}`);
  };
  const handleSortPopulation = (e) => {
    e.preventDefault(e);
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrdenPoblation(`Ordenado ${e.target.value}`);
  };
  const handleActivity=(e)=>{
    e.preventDefault(e);
    dispatch(filterActivity(e.target.value));
  }
  return (
    <>
      {currentCountries.length ? (
        <div className="container">
          <div className="div1">
            <img src={logo} alt="logo"></img>
            <form className="form">
              <div className="left">
                <label>
                  CONTINENT
                  <br></br>
                  <hr />
                  <select
                    defaultValue={"DEFAULT"}
                    onChange={(e) => handleFilterContinent(e)}
                  >
                    <option value="DEFAULT" disabled>Choose</option>
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
              </div>
              <div className="center">
                <label>
                  NAME ALPHABETICALLY
                  <br></br>
                  <hr />
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
                <label className="center2">
                  ACTIVITIES
                  <br></br>
                  <hr />
                  <select onChange={(e) => handleActivity(e)}>
                    {allActivities &&
                      allActivities.map((e) => {
                        return <option key={e.id}>{e.name}</option>;
                      })}
                  </select>
                </label>
              </div>
              <div className="right">
                <label>
                  POPULATION
                  <br></br>
                  <hr />
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
              </div>
            </form>

            <Pagination
              countriesPerPage={countriesPerPage}
              allCountries={allCountries.length}
              paginado={paginado}
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
              <button type="button" className="buttonActivity">
                create new activity
              </button>
            </Link>
          </div>

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
      ) : (
        <Loading />
      )}
    </>
  );
};
export default Home;
