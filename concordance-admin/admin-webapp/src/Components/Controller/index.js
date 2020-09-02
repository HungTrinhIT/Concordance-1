import React, { Component, Fragment } from "react";
import "./controller.css";
import ImportFile from "./ImportFile";
import EditMode from "./EditMode";
import Pagination from "./Pagination";
export default class Controller extends Component {
  render() {
    return (
      <div className="controller">
        <div className="row">
          <ImportFile />
          <EditMode />
          <Pagination/>
        </div>
      </div>
    );
  }
}
