import React, { Component } from "react";
import { connect } from "react-redux";
import "./word.css";
export default class Word extends Component {
  state = {
    typeSearch: "match",
    searchInput: "",
  };
  onChangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div className="col-4 search">
        <div className="form-group d-flex justify-content-start align-items-start search__input">
          <label htmlFor="keyseach" className="mr-2 content__title">
            Key search
          </label>
          <input
            type="text"
            className="form-control"
            name="searchInput"
            id="keyseach"
            placeholder="Type to search..."
            onChange={this.onChangeHandler}
          />
        </div>
        <div className="search__choosen d-flex justify-content-start align-items-center">
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeSearch"
                value="match"
                onChange={this.onChangeHandler}
                checked={this.state.typeSearch === "match"}
              />
              Match
            </label>
          </div>
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeSearch"
                value="morphlogical"
                onChange={this.onChangeHandler}
                checked={this.state.typeSearch === "morphlogical"}
              />
              Morphlogical
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeSearch"
                value="phares"
                onChange={this.onChangeHandler}
                checked={this.state.typeSearch === "phares"}
              />
              Phares
            </label>
          </div>
        </div>
      </div>
    );
  }
}
