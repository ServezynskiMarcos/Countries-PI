import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postActivity, getCountries } from "../../redux/actions";
import "./Style.css";
import { Link } from "react-router-dom";
import validate from "./validation";
const Activities = () => {
  const dispatch = useDispatch();
  const allountries = useSelector((state) => state.countries);
  const [error, setError] = useState({ initial: false });
  const [newActivity, setNewActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    country: [],
  });

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleCountry = (e) => {
    //e.preventDefault();
    if (
      e.target.value !== "select" &&
      !newActivity.country.includes(e.target.value)
    ) {
      setNewActivity({
        ...newActivity,
        country: [...newActivity.country, e.target.value],
      });
    }
  };

  const handleChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
    if (!error.initial) {
      setError(
        validate({
          ...newActivity,
          [e.target.name]: e.target.value,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    if (
      newActivity.name &&
      newActivity.difficulty &&
      newActivity.duration &&
      newActivity.season &&
      newActivity.country.length
    ) {
      dispatch(postActivity(newActivity));
      alert(`Activity succesfully created in: ${newActivity.country}`);
      error.initial = true;
    }
    if (!error.initial) {
      e.preventDefault();
      if (error.name) {
        alert(`error: ${error.name}`);
      }
      if (error.duration) {
        alert(`error: ${error.duration}`);
      }
      if (error.difficulty) {
        alert(`error: ${error.difficulty}`);
      }
      if (error.countries) {
        alert(`error: ${error.countries}`);
      }
      error.initial = false;
    }
  };

  const deleteCountry = (e) => {
    e.preventDefault();
    setNewActivity({
      ...newActivity,
      country: newActivity.country.filter((c) => c !== e.target.name),
    });
  };

  return (
    <div className="activitiesContainer">
      <div className="divcont">
        <label className="tittle">ACTIVITY</label>
        <Link to="/countries">
          <button type="button" className="back">
            x
          </button>
        </Link>
        <hr />
        <form>
          {error.name ? (
            <label style={{ color: "red" }}>{error.name}</label>
          ) : (
            <label>Activity name</label>
          )}

          <div>
            <input
              type="text"
              name="name"
              placeholder="enter text"
              value={newActivity.name}
              onChange={(e) => handleChange(e)}
              required
            ></input>
          </div>
          {error.difficulty ? (
            <label style={{ color: "red" }}>{error.difficulty}</label>
          ) : (
            <label>Difficulty</label>
          )}

          <div>
            <select
              name="difficulty"
              //value={newActivity.difficulty}
              onChange={handleChange}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                select...
              </option>
              <option value="1">1 🟩</option>
              <option value="2">2 🟩</option>
              <option value="3">3 🟨</option>
              <option value="4">4 🟧</option>
              <option value="5">5 🟥</option>
            </select>
          </div>
          {error.duration ? (
            <label style={{ color: "red" }}>{error.duration}</label>
          ) : (
            <label>Duration</label>
          )}

          <div>
            <select
              name="duration"
              //value={newActivity.duration}
              onChange={(e) => handleChange(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                select...
              </option>
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="4">4 Hours</option>
              <option value="5">5 Hours</option>
            </select>
          </div>
          {error.season ? (
            <label style={{ color: "red" }}>{error.season}</label>
          ) : (
            <label>Season</label>
          )}
          <div>
            <select
              name="season"
              //value={newActivity.season}
              onChange={(e) => handleChange(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                select...
              </option>
              <option value="Primavera">Spring 🌸</option>
              <option value="Verano">Summer ☀️</option>
              <option value="Otoño">Autumn 🍂</option>
              <option value="Invierno">Winter ❄️</option>
            </select>
          </div>

          <label>Country</label>

          <div>
            <select
              name="country"
              defaultValue={"DEFAULT"}
              onChange={(e) => handleCountry(e)}
            >
              <option value="DEFAULT" disabled>
                select...
              </option>
              {allountries &&
                allountries.map((e) => {
                  return <option key={e.name}>{e.name}</option>;
                })}
            </select>
          </div>
          <div className="countryadd">
            {newActivity.country &&
              newActivity.country.map((e) => {
                return (
                  <div key={e} className="addcountry">
                    <div className="actcar">
                      <button
                        type="button"
                        id="delete"
                        name={e}
                        onClick={(e) => deleteCountry(e)}
                      >
                        x
                      </button>
                      <p>{e}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            ✅
          </button>
        </form>
      </div>
    </div>
  );
};

export default Activities;
