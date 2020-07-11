import React, { Component } from "react";
import "./help.css";
import TableHelp from "./TableHelp";
export default class Help extends Component {
  state = {
    typeTag: "eNer",
  };

  handleTypeChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="help">
          <div className="help__controller">
            <label className="help__title">List of meaing of tags:</label>
            <select
              className="custom-select custom-select-lg mb-3 typeOfTag"
              name="typeTag"
              onChange={this.handleTypeChange}
              value={this.state.typeTag}
            >
              <option value="eNer">English NER Tags</option>
              <option value="ePos">English POS Tags</option>
              <option value="vNer">Vietnamese NER Tags</option>
              <option value="vPos">Vietnamese POS Tags</option>
            </select>
          </div>
          <TableHelp typeTag={this.state.typeTag} />
        </div>
      </div>
    );
  }
}
