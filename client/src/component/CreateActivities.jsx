import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postAcivities, getCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function ActivitiesCreate() {
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countries);

  const [input, setInput] = useState({
    name: "",
    hardness: "",
    duration: "",
    season: [],
    country: [],
  });
  // alert(`activity  succesfully created`);
  // history.pushState("/home");

  function handleChange(e) {
    //guarda lo que el usuario va escribiendo en el set input
    setInput({
      ...input,
      [e.target.name]: e.target.value, //name es lo que se le va pasando
    });
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      country: [...input.country, e.target.value],
    });
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: [...input.season, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      country: input.country.filter((di) => di !== el),
    });
  }

  function handleDeleteSeason(el) {
    setInput({
      ...input,
      season: input.season.filter((di) => di !== el),
    });
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div>
      <div>
        <button>
          <Link className="button" id="button" to="/home">
            Back home
          </Link>
        </button>
      </div>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Hardness:</label>
          <input
            type="range"
            value={input.hardness}
            name="hardness"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Duration/hs:</label>
          <input
            type="range"
            value={input.duration}
            name="duration"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <select name="season" onChange={(e) => handleSelectSeason(e)}>
          <option key="spring" value="spring">
            spring
          </option>
          <option key="sumer" value="summer">
            summer
          </option>
          <option key="autumn" value="autumn">
            autumn
          </option>
          <option key="winter" value="winter">
            winter
          </option>
        </select>
        {input.season.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDeleteSeason(el)}> x </button>
          </div>
        ))}

        <ul>
          <li>{input.season.map((el) => el + ", ")} </li>
        </ul>

        <select name="country" onChange={(e) => handleSelect(e)}>
          {country.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {input.country.map((el) => (
          <div>
            <p>{el}</p>
            <button onClick={() => handleDelete(el)}> x </button>
          </div>
        ))}
        <ul>
          <li>{input.country.map((el) => el + ", ")} </li>
        </ul>

        <button type="submit">Create activity</button>
      </form>
    </div>
  );
}
