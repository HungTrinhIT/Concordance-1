import React, { Component } from "react";
import "./ShowLanguage.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { LANGUAGE_TYPE } from "../../Redux/Action/type";
import RadioButton from "../Form/RadioButton";
class ShowLanguage extends Component {
  state = {
    language: "english",
  };
  handleTypeLanguageChange = (key) => (value) => {
    this.setState(
      {
        [key]: value,
      },
      () => {
        this.props.dispatch(createAction(LANGUAGE_TYPE, this.state.language));
      }
    );
  };
  render() {
    const { language } = this.state;
    return (
      <div className="col-2 language mt-3">
        <p className="content__title">Source language</p>

        <div className="language">
          <RadioButton
            label="English"
            onChange={this.handleTypeLanguageChange("language")}
            selected={language === "english"}
            value="english"
            styleClass="mb-3"
          />
          <RadioButton
            label="Vietnamese"
            onChange={this.handleTypeLanguageChange("language")}
            selected={language === "vietnamese"}
            value="vietnamese"
          />
        </div>
      </div>
    );
  }
}

export default connect()(ShowLanguage);
