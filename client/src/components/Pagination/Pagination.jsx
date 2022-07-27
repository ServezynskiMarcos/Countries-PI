import React from "react";

import "./Style.css";

const Pagination = ({
  countriesPerPage,
  allCountries,
  paginado,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];

  //divide la cantidad de paises que hay en mi estado por la cantidad de paises que quiero mostrar en pantalla
  //math.ceil me redondea hacia arriba el resultado de la division
  //ese resultado lo pushea al array
  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClickNext = () => {
    if (currentPage + 1 > pageNumbers.length) {
      alert("¡There are no more countries to show!");
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleClickPrev = () => {
    if (currentPage === 1) {
      alert("can't go backwards");
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <ul>
        <button type="button" className="btnPage" onClick={handleClickPrev}>
          &#171;
        </button>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <p onClick={() => paginado(number)}>{number}</p>
            </li>
          ))}
        <button type="button" className="btnPage" onClick={handleClickNext}>
          &#187;
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
