import React, { useState } from "react";
import "./Style.css";

const Pagination = ({ countriesPerPage, allCountries, paginado }) => {
  const pageNumbers = [];
  
  //divide la cantidad de paises que hay en mi estado por la cantidad de paises que quiero mostrar en pantalla
  //math.ceil me redondea hacia arriba el resultado de la division
  //ese resultado lo pushea al array
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="pagination">
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pagination;
