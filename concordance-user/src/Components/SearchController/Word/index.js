import React, { Component } from "react";
import "./word.css";
export default class Word extends Component {
  state = {
    searchType: "mat", // : 1. match: mat, 2. morphological: mor, 3. phrase: phr
    searchValue: "",
  };
  onChangleHandler = (e) => {
    this.setState(
      {
        [e.currentTarget.name]: e.currentTarget.value,
      },
      () => {
        this.props.handleWord({
          searchValue: this.state.searchValue,
          searchType: this.state.searchType,
        });
      }
    );
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isRefresh) {
      return {
        searchType: "",
        searchValue: "",
      };
    }
    return false;
  }
  render() {
    return (
      <div className="serach__word ml-4">
        {/* Search Value */}
        <div className="form-group">
          <label htmlFor="searchKey" className="content__title">
            Key search
          </label>
          <input
            type="text"
            className="form-control"
            id="searchKey"
            placeholder="Type keyword to search..."
            onChange={this.onChangleHandler}
            name="searchValue"
            value={this.state.searchValue}
          />
        </div>

        {/* Search type */}
        <div className="tag__choosen d-flex justify-content- algin-items-center">
          {/* Match cases */}
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="searchType"
                value="mat"
                onChange={this.onChangleHandler}
                checked={this.state.searchType === "mat"}
              />
              Match
            </label>
          </div>
          {/* Morphological cases */}
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="searchType"
                value="mor"
                onChange={this.onChangleHandler}
                checked={this.state.searchType === "mor"}
              />
              Morphological
            </label>
          </div>
          {/* phares */}
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="searchType"
                value="phr"
                onChange={this.onChangleHandler}
                checked={this.state.searchType === "phr"}
                disabled
              />
              Phares
            </label>
          </div>
        </div>
      </div>
    );
  }
}
