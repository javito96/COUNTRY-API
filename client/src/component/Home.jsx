import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  return (
    <div>
      <h1>The word countries</h1>

      {/* <link to="/create">created activities</link> */}

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Load all countries again
      </button>
      {allCountries &&
        allCountries.map((p) => {
          return (
            <Card
              name={p.name}
              image={p.image}
              continent={p.continent}
              // activity={p.activities}
            />
          );
        })}
    </div>
  );
}
