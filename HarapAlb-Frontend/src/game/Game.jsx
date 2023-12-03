import React from "react";
import { Link } from "react-router-dom";

export default function Game() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>phaser</h1>
      <Link to="/phaser">
        <button>Play</button>
      </Link>
    </div>
  );
}
