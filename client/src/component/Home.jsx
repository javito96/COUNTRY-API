import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  ordenByPopulation,
  orderByAlphabetical,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import "../CSS/Home.css";
import FilteroOrder from "./FilteredAndOrder";
import Search from "./Search";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  const [currentPage, setCurrentPage] = useState(1); //estado local con primer pag que renderiza
  const [countriesPerPage] = useState(9); //en la primer pag trae 9 paises
  const indexOfLastCountries = currentPage * countriesPerPage; //numero del ultimo indice multiplicado pag, ej recetas 9 pag nro3 = 27
  const indexOfFirstCountries = indexOfLastCountries - countriesPerPage; //indice de ultima pais - paises por pag igual a indice de primer receta
  const currentCountries = allCountries.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  ); //slice toma una porcion de lo que yo le paso por parametro
  const [Ordenado, setOrder] = useState("");
  // const [loading, setLoading] = useState(false);

  const paginado = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }
  function handleByName(e) {
    e.preventDefault();
    dispatch(orderByAlphabetical(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }
  function handleByPopulation(e) {
    e.preventDefault();
    dispatch(ordenByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="back1">
      <h1>The word countries</h1>
      <div>
        <Search />
        <button className="button" id="button">
          <Link to="/createActivitie">Create new activitie</Link>
        </button>
      </div>
      <select onChange={(e) => handleByName(e)}>
        <option defaultValue>Alphabetical order</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <select onChange={(e) => handleByPopulation(e)}>
        <option defaultValue>Population order</option>
        <option value="max">min</option>
        <option value="min">max</option>
      </select>
      <FilteroOrder />

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Load all countries again
      </button>
      {currentCountries &&
        currentCountries.map((p) => {
          return (
            <div key={p.id}>
              <Link to={"/detail/" + p.id}>
                <Card
                  name={p.name}
                  image={p.image}
                  continent={p.continent}
                  // activity={p.activities}
                />
              </Link>
            </div>
          );
        })}
      <Paginado
        countriesPerPage={countriesPerPage}
        allCountries={allCountries.length}
        paginado={paginado}
      />
    </div>
  );
}
