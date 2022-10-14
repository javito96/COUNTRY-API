import React from "react";
import "../CSS/Paginado.css";

export default function Paginado({ countriesPerPage, allCountries, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i + 1);
  } //tomo el nro redondo(metodo ceil) de dividir los personajes en las paginas

  return (
    <nav>
      <div>
        <ul className="paginadoContainer">
          {pageNumbers &&
            pageNumbers.map((number) => (
              <li className="li" key={number}>
                <a>
                  <button className="a" onClick={() => paginado(number)}>
                    {number}
                  </button>
                </a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
