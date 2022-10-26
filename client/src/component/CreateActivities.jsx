import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postAcivities, getCountries } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "../CSS/CreateActivities.css";

function validate(input) {
  let errors = {};
  let testName = /^[^$()!¡@#/=¿{}?*%&|<>#]*$/;
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!testName.test(input.name)) {
    errors.name =
      'start the name with capital letter. Only characters "":.,_-are accepted';
  } else if (!input.hardness) {
    errors.hardness = "Place number from 1 to 100";
  } else if (input.hardness > 100 || input.hardness < 1) {
    errors.hardness = "The number exceeds limits 1 to 100";
  } else if (!input.duration) {
    errors.duration = "Place hs from 1 to 10";
  } else if (!input.season.length) {
    errors.season = "Select season";
  } else if (!input.country.length) {
    errors.country = "Select country";
  }
  return errors;
}
export default function ActivitiesCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const country = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hardness: "",
    duration: "",
    season: [],
    country: [],
  });

  function handleChange(e) {
    //guarda lo que el usuario va escribiendo en el set input
    setInput({
      ...input,
      [e.target.name]: e.target.value, //name es lo que se le va pasando
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    if (!input[e.target.name].includes(e.target.value)) {
      setInput({
        ...input,
        [e.target.name]: [...input[e.target.name], e.target.value],
      });
    }
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
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

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(postAcivities(input));
    alert("activities created!!");
    setInput({
      name: "",
      hardness: "",
      duration: "",
      season: [],
      country: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  return (
    <div className="fondo">
      <div>
        <button id="button">
          <Link className="link" to="/home">
            Back home
          </Link>
        </button>
      </div>
      <form className="contaitner" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Hardness: {input.hardness}</label>
          <input
            type="number"
            value={input.hardness}
            name="hardness"
            min="0"
            max="100"
            onChange={(e) => handleChange(e)}
          />
          {errors.hardness && <p>{errors.hardness}</p>}
        </div>
        <div>
          <label>Duration:{input.duration}hs</label>
          <input
            type="range"
            value={input.duration}
            name="duration"
            min="0"
            max="10"
            onChange={(e) => handleChange(e)}
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>

        <select name="season" onChange={(e) => handleSelect(e)}>
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
          <div key={el}>
            <h5>{el}</h5>
            <button onClick={() => handleDeleteSeason(el)}> x </button>
          </div>
        ))}

        <ul className="li">
          <li>{input.season.map((el) => el + ", ")} </li>
        </ul>
        {errors.season && <p>{errors.season}</p>}

        <select name="country" onChange={(e) => handleSelect(e)}>
          {country.map((c, i) => (
            <option key={i} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        {input.country.map((el) => (
          <div key={el}>
            <h5>{el}</h5>
            <button onClick={() => handleDelete(el)}>x</button>
          </div>
        ))}
        <ul className="li">
          <li>{input.country.map((el) => el + ", ")} </li>
        </ul>
        {errors.country && <p>{errors.country}</p>}

        <button
          id="button"
          disabled={!input.name || input.country.length === 0}
          type="submit"
        >
          Create activity
        </button>
        <ul>
          Required fields:
          {errors.name && <p>{errors.name}</p>}
          {errors.hardness && <p>{errors.hardness}</p>}
          {errors.duration && <p>{errors.duration}</p>}
          {errors.season && <p>{errors.season}</p>}
          {errors.country && <p>{errors.country}</p>}
        </ul>
      </form>
    </div>
  );
}
