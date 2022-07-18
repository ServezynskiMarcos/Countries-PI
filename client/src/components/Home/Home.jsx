import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountryByContinent, orderByName, orderByPopulation} from "../../redux/actions";
//import { Link } from "react-router-dom";
import Detail from "../Detail/Detail";
import "./Style.css";
import Pagination from "../Pagination/Pagination";
import logo from "./lg.png";
const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); //?me traigo todo lo que tengo en el estado
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [ordenPoblation, setOrdenPoblation] = useState(""); //? Seteo en 1 pq quiero que mi pagina siempre arranque desde la pagina 1
  const [countriesPerPage, setCountriesPerPage] = useState(9); //? aca le digo cuantos paises quiero tener por pag.
  const indexOfLastCountry = currentPage * countriesPerPage; // 9 //? indice currentPage = 1 * cPerPage = 9===9
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0 //? indice del ultimo pais - la cantidad de paises por pagina
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  //?allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
  //!1------  Mi primer pais tiene indice 0 y el ultimo indice 9
  //!2------  Mi primer pais tiene indice 10 y el ultimo indice 19

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(getCountries(inputText));
  // };

  // const inputHandler = (e) => {
  //   setInputText(e.target.value);
  // };
  const handleFilterContinent = (e) => {
    //console.log(e.target.value);
    dispatch(filterCountryByContinent(e.target.value));
  }

  const handleSort = (e) => {
    e.preventDefault(e);
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }
  const handleSortPopulation = (e) => {
    e.preventDefault(e);
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrdenPoblation(`Ordenado ${e.target.value}`)

  }
  return (
    <div className="container">
      <div className="div1">
        <img src={logo} alt="logo"></img>
        <form className="form">
          <div className="left">
            <label>
              CONTINENT
              <br></br>
              <hr />
              <select onChange={e => handleFilterContinent(e)}>
                <option value="" selected disabled hidden>Choose here</option>
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
              <select onChange={e => handleSort(e)}>
                <option value="" selected disabled hidden>Choose here</option>
                <option value="asc">Order A</option>
                <option value="des">Order Z</option>
              </select>
            </label>
          </div>
          <div className="right">
            <label>
              POPULATION
              <br></br>
              <hr />
              <select onChange={e => handleSortPopulation(e)}>
                <option value="" selected disabled hidden>Choose here</option>
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

        <div className="search">
          <input
            name="name"
            type="text"
            // onChange={(e) => inputHandler(e)}
          ></input>
          <input type="submit"></input>
        </div>
      </div>
      {currentCountries &&
        currentCountries.map((e) => {
          return <Detail name={e.name} img={e.img} continent={e.continent} />;
        })}
    </div>
  );
};
export default Home;
