import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions";
import Detail from "../Detail/Detail";
import "./Style.css";
const Home = () => {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries); //?me traigo todo lo que tengo en el estado
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    dispatch(getCountries());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCountries(inputText));
  };

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div className="parent">
      <div className="div1">
        <h1>Home</h1>
        <form>
          <input
            name="name"
            type="text"
            onChange={(e) => inputHandler(e)}
          ></input>
          <input type="submit" onSubmit={() => handleSubmit}></input>
          <div>
            <label>
              Continente
              <select>
                <option value="northAmerica">North America</option>
                <option value="southAmerica">South America</option>
                <option value="europe">Europe</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="australia">Australia</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Nombre alfabéticamente
              <select>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Población
              <select>
                <option value="ascendente">Ascendente</option>
                <option value="descendente">Descendente</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      {allCountries &&
        allCountries.map((e) => {
          return (
            <Detail
              name={e.name}
              img={e.img}
              continent={e.continent}
            />
          );
        })}
    </div>
  );
};
export default Home;
