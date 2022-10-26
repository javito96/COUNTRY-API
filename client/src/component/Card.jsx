import { React } from "react";
import "../CSS/Card.css";

export default function Card({ name, image, continent, id }) {
  return (
    <div className="Card">
      <img className="image" src={image} />
      <h3>
        {name}({id})
      </h3>
      <div>
        <h6 className="contintent">
          Continent:{"   "}
          {continent?.map((p) => {
            return <span key={p}>{p}</span>;
          })}
        </h6>
      </div>
    </div>
  );
}
