import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetail } from "../actions";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";
import "../CSS/Detail.css";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myCountry = useSelector((state) => state.detail);
  console.log(myCountry);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div className="back">
      <button id="button">
        <Link className="link" to="/home">
          Return home
        </Link>
      </button>
      {myCountry.length > 0 ? (
        <div className="detail">
          <div className="nameContainer">
            <h1>
              {myCountry[0].name}({myCountry[0].id})
            </h1>

            <h2>Capital: {myCountry[0].capital}</h2>
            <img
              className="image"
              src={myCountry[0].image}
              alt="image not found"
              height="400px"
            />
            <div className="data">
              <h2>Area: {myCountry[0].area}</h2>
              <h2>population: {myCountry[0].population}</h2>
              <h2>Continent: {myCountry[0].continent}</h2>
              <h2>Subregion: {myCountry[0].subregion}</h2>
            </div>
          </div>
          <div className="lista">
            <h2 className="nameContainer">Activities</h2>
            {myCountry[0].activities.map((e, g) => {
              return (
                <div key={g}>
                  <h4 className="nameActivities">{e.name}</h4>
                  <h6>
                    hardness:{"   "}
                    {e.hardness}
                  </h6>
                  <h6>
                    duration:{"   "}
                    {e.duration}hs
                  </h6>
                  <h6>
                    season:{"   "}
                    {e.season?.join(",  ")}
                  </h6>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
