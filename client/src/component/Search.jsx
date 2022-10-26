import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../actions";
import "../CSS/Search.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleCountries(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchName(name));
  }

  return (
    <div className="div">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleCountries(e)}
      />
      <button className="button" type="submit" onClick={(e) => handleSubmit(e)}>
        Search🔎
      </button>
    </div>
  );
}
