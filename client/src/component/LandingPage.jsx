import React from "react";
import { Link } from "react-router-dom";
import "../CSS/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div>
        <Link to="/home">
          <button className="button" id="button">
            GET INTO
          </button>
        </Link>
      </div>

      <div>
        <h1 className="letras">WELCOME</h1>
      </div>
    </div>
  );
}
