import React, { Component, Fragment } from "react";
import "./controller.css";
import AddRecordModal from "../AddRecordModal";
import ImportFile from "./ImportFile";
import AddRecord from "./AddRecord";
import EditMode from "./EditMode";
export default class Controller extends Component {
  render() {
    return (
      <div className="controller">
        <div className="row">
          <ImportFile />
          <AddRecord />
          <EditMode />
          <AddRecordModal />
        </div>
      </div>
    );
  }
}
