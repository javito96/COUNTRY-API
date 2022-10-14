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
  console.log(myCountry[0]);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  return (
    <div>
      <Link to="/home">Return home</Link>

      <div>
        <div>
          <h1>{myCountry.name}</h1>

          {/* <img
            src={myCountry.map((e) => e.image)}
            alt="image not found"
            width="400px"
            height="400px"
          />
        </div> */}

          {/* <p>Pupulation: {myCountry.map((e) => e.population)}</p> */}
          {/* <p>
            Subregion:
            {myCountry.map((e) => "   " + e.subregion)}
          </p> */}
          {/* <p>
            Capital:
            {myCountry.map((e) => "   " + e.capital)}
          </p> */}

          {/* {myGame?.genres && (
            <h4>
              genres:{" "}
              {myGame?.genres?.map((g, i) => {
                return <span key={i}> {g.name} </span>;
              })}
            </h4>
          )} */}
          {/* {myGame?.genders && (
            <h4>
              genres:{" "}
              {myGame?.genders?.map((g, i) => {
                return <span key={i}> {g.name} </span>;
              })}
            </h4>
          )} */}
        </div>
      </div>
    </div>
  );
}
