import React from "react";
import "./Style.css";
import { Link } from "react-router-dom";
const Detail = (props) => {
  return (
    <Link  style={{ textDecoration: "none" }} to={"/countries/" + props.id}>
      <div className="containerDetail">
        <div className="div2">
          <h1>{props.name}</h1>
          
          <img src={props.img} alt={props.name} className="flags"/>
          <h3>{props.continent}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Detail;
