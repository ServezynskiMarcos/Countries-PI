import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
const Landing = () => {
  return (
    <div className="landing">
      <div className="content">
        <h1>WELCOME</h1>
        <Link to="/countries">
          <div className="box-1">
            <div className="bt btn-one">
              <span>INGRESAR</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
