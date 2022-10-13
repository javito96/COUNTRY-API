import { React } from "react";

export default function Card({
  id,
  name,
  image,
  continent,
  capital,
  subregion,
  area,
  population,
  activity,
}) {
  return (
    <div>
      <img src={image} />
      <h4>{name}</h4>
      <div>
        <p>
          {continent?.map((p) => {
            return <span key={p}>{p}</span>;
          })}
        </p>
        {/* <p className='p-info'>Activity: {activity?.map(p=>{ */}
        {/* return <span key={p}> {p.name} -</span>
              })}</p> */}
        <p>{id}</p>
      </div>
    </div>
  );
}
