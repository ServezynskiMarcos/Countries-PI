import React from "react";
import "./Style.css"
const Pagination = ({ countriesPerPage, allCountries, paginado }) => {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i+1);
  }
  return (
    <div className="pagination">
      <ul>
        {pageNumbers &&
          pageNumbers.map(number => (
            <li key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pagination;
