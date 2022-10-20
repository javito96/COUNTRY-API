import { React } from "react";

export default function Card({ name, image, continent }) {
  return (
    <div>
      <img src={image} />
      <h4>{name}</h4>
      <div>
        <h6>
          Continent:{"   "}
          {continent?.map((p) => {
            return <span key={p}>{p}</span>;
          })}
        </h6>
      </div>
    </div>
  );
}
