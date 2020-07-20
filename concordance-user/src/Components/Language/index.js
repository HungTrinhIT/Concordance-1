import React, { Component } from "react";
import "./ShowLanguage.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { LANGUAGE_TYPE } from "../../Redux/Action/type";
class ShowLanguage extends Component {
  state = {
    language: "english",
  };
  handleTypeLanguageChange = (e) => {
    this.setState(
      {
        language: e.target.value,
      },
      () => {
        this.props.dispatch(createAction(LANGUAGE_TYPE, this.state.language));
      }
    );
  };
  render() {
    return (
      <div className="col-2 language">
        <p className="content__title">Source language</p>
        <div className="language__choosen d-flex justify-content-start align-items-center">
          <div className="form-check mr-3">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeLanguage"
                value="english"
                onChange={this.handleTypeLanguageChange}
                checked={this.state.language === "english"}
              />
              English
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                name="typeLanguage"
                value="vietnamese"
                onChange={this.handleTypeLanguageChange}
                checked={this.state.language === "vietnamese"}
              />
              Vietnamese
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ShowLanguage);
