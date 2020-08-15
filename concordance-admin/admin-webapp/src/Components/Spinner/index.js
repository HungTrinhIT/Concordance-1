import React from "react";
import "./spinner.css";
export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="blocks">
        <div className="block orange"></div>
        <div className="block blue"></div>
      </div>
    </div>
  );
}
