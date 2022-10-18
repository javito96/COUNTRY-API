import React, { useEffect } from "react";
import {
  filterByContinent,
  filterByActivities,
  getActivities,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function FilteroOrder() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  function handleContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }

  function handleActivities(e) {
    dispatch(filterByActivities(e.target.value));
  }

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div>
      <select onChange={(e) => handleContinent(e)}>
        <option defaultValue value="all">
          Filter continent
        </option>
        <option value="all">All</option>
        <option value="Africa">Africa</option>
        <option value="Antarctica">Antarctica</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select onChange={(e) => handleActivities(e)}>
        <option value="all"> Filter by activities</option>
        {activities.map((activities, t) => (
          <option key={t} value={activities.name}>
            {activities.name}
          </option>
        ))}
      </select>
    </div>
  );
}
