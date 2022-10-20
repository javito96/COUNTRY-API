import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetail } from "../actions";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";

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
    <div>
      <Link to="/home">Return home</Link>
      {myCountry.length > 0 ? (
        <div>
          <h1>
            {myCountry[0].name}({myCountry[0].id})
          </h1>

          <img
            src={myCountry[0].image}
            alt="image not found"
            // width="400px"
            // height="400px"
          />

          <h5>Area: {myCountry[0].area}</h5>
          <h5>Capital: {myCountry[0].capital}</h5>
          <h5>Continent: {myCountry[0].continent}</h5>
          <h5>population: {myCountry[0].population}</h5>
          <h5>Subregion: {myCountry[0].subregion}</h5>
          {myCountry[0].activities.map((e, g) => {
            return (
              <div key={g}>
                <h6>
                  Activitie:{"   "}
                  {e.name}
                </h6>
                <h6>
                  hardness:{"   "}
                  {e.hardness}
                </h6>
                <h6>
                  duration:{"   "}
                  {e.duration}
                </h6>
                <h6>
                  season:{"   "}
                  {e.season?.join(",  ")}
                </h6>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
