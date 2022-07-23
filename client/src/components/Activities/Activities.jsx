import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postActivity, getCountries } from "../../redux/actions";
import "./Style.css";
import { Link } from "react-router-dom";
const Activities = () => {
  const dispatch = useDispatch();
  const allountries = useSelector((state) => state.countries);
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

  const handleChange = (e) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(newActivity));
    alert("Activity succesfully created");
    setNewActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      country: [],
    });
  };

  return (
    <div className="activitiesContainer">
        
      <div className="divcont">
        <label className="tittle">ACTIVITY</label>
        <Link to="/countries">
              <button type="button" className="back">x</button>
          </Link>
        <hr/>
        <form>
          <label>Activity name</label>
          <div>
            <input
              type="text"
              name="name"
              value={newActivity.name}
              onChange={handleChange}
            ></input>
          </div>
          <label>Difficulty</label>

          <div>
            <select
              name="difficulty"
              value={newActivity.difficulty}
              onChange={handleChange}
            >
              <option value="1">1 🟩</option>
              <option value="2">2 🟩</option>
              <option value="3">3 🟨</option>
              <option value="4">4 🟧</option>
              <option value="5">5 🟥</option>
            </select>
          </div>
          <label>Duration</label>

          <div>
            <select
              name="duration"
              value={newActivity.duration}
              onChange={handleChange}
            >
              <option value="1">1 Hour</option>
              <option value="2">2 Hours</option>
              <option value="3">3 Hours</option>
              <option value="4">4 Hours</option>
              <option value="5">5 Hours</option>
            </select>
          </div>
          <label>Season</label>
          <div>
            <select
              name="season"
              value={newActivity.season}
              onChange={handleChange}
            >
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
              value={newActivity.country}
              onChange={handleChange}
            >
              {allountries &&
                allountries.map((e) => {
                  return <option>{e.name}</option>;
                })}
            </select>
          </div>

          <button type="submit" onClick={handleSubmit}>
            ✅
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Activities;
