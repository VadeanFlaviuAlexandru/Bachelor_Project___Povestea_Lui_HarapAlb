import React from "react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>login:</h1>
      <Link to="/login">
        <button>Play</button>
      </Link>
    </div>
  );
}
