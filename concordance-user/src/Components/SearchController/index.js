import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../Form/Input";
import RadioButton from "../Form/RadioButton";
import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import { FETCH_SEARCH_DATA } from "../../Redux/Action/type";
import Checkbox from "../Form/Checkbox";
import Dropdown from "../Form/Dropdown";
import "./SearchController.css";

class SearchController extends Component {
  state = {
    searchValue: "",
    searchType: "mat",
    loaded: false,
    posValue: "",
    nerValue: "",
    posAcceptance: false,
    nerAcceptance: false,
  };

  //Handle onChange event
  handleChange = (key) => (value) => {
    if ((key === "posAcceptance" || key === "nerAcceptance") && !value) {
      if (key === "posAcceptance") {
        this.setState({
          [key]: value,
          posValue: "",
        });
      } else {
        this.setState({
          [key]: value,
          nerValue: "",
        });
      }
    } else this.setState({ [key]: value });
  };

  // Submit search:
  // Request to server,
  // then get data if
  //    1 => dispatch data to Redux ,
  //    0 => Modal : alert to client
  handleOnsubmit = (e) => {
    e.preventDefault();
    let lang = this.props.languageType === "vietnamese" ? "vn" : "en";
    let tag = { pos: this.state.posValue, ner: this.state.nerValue };
    this.props.dispatch(createAction("RESET_LOADING", true));
    dataService
      .fetchData_Search(
        this.state.searchValue,
        this.state.searchType,
        lang,
        tag
      )
      .then((res) => {
        this.props.dispatch(createAction(FETCH_SEARCH_DATA, res.data));
        this.props.dispatch(createAction("RESET_LOADING", false));
      })
      .catch((err) => {
        this.props.dispatch(createAction("RESET_LOADING", false));
        alert("Fail connection! Please try again!");
      });
  };

  // Get tag value base on tag and language
  getTagsValue = (typeTag) => {
    let type = this.props.language.charAt(0) + typeTag;
    return this.props.tags[`${type}`].map((item, index) => {
      let descript = item.description;
      if (item.description.length >= 30) {
        descript = item.description.slice(0, 30) + "...";
      }
      return { value: item.tag, label: descript };
    });
  };

  // Set State when Refresh button is trigged
  handleRefresh = () => {
    this.setState({
      searchValue: "",
      searchType: "mat",
      loaded: false,
      posValue: "",
      nerValue: "",
      posAcceptance: false,
      nerAcceptance: false,
    });
  };
  render() {
    //State
    const {
      searchValue,
      searchType,
      posAcceptance,
      nerAcceptance,
      posValue,
      nerValue,
    } = this.state;

    //Get data for Dropdown component: eNer, vNer, ePos or vPos
    let nerData = nerAcceptance ? this.getTagsValue("Ner") : [];
    let posData = posAcceptance ? this.getTagsValue("Pos") : [];

    return (
      <div className="col-10 seach__controller mt-3">
        {/* Form Search */}
        <form className="row" onSubmit={this.handleOnsubmit}>
          {/*  Word */}
          <div className="col-5">
            <p className="content__title">Word</p>
            <Input
              type="text"
              placeholder="Enter keyword to search..."
              onChange={this.handleChange("searchValue")}
              value={searchValue}
            />
            <div className="tag__choosen d-flex justify-content- algin-items-center">
              <RadioButton
                label="Match"
                onChange={this.handleChange("searchType")}
                selected={searchType === "mat"}
                value="mat"
                styleClass="mr-3"
              />
              <RadioButton
                label="Morphological"
                onChange={this.handleChange("searchType")}
                selected={searchType === "mor"}
                value="mor"
                styleClass="mr-3"
              />
              <RadioButton
                label="Phares"
                onChange={this.handleChange("searchType")}
                selected={searchType === "pha"}
                value="pha"
                disabled={true}
              />
            </div>
          </div>
          {/* End Word */}

          {/* Tag  */}
          <div className="search__tag col-4 px-auto">
            <p className="content__title">Tag</p>
            <div>
              <div className="pos d-flex align-items-center mb-3">
                <Checkbox
                  label="Pos"
                  selected={posAcceptance}
                  onChange={this.handleChange("posAcceptance")}
                  styleClass="mr-2"
                />
                <Dropdown
                  onChange={this.handleChange("posValue")}
                  placeholder="Select pos"
                  data={posData}
                  value={posValue}
                />
              </div>
              <div className="ner d-flex align-items-center">
                <Checkbox
                  label="Ner"
                  selected={nerAcceptance}
                  onChange={this.handleChange("nerAcceptance")}
                  styleClass="mr-2"
                />
                <Dropdown
                  onChange={this.handleChange("nerValue")}
                  placeholder="Select ner"
                  data={nerData}
                  value={nerValue}
                />
              </div>
            </div>
          </div>
          {/* End tag */}

          {/* Btn submit */}
          <div className="col-3 m-auto">
            <button type="submit" className="btn-search mr-2">
              SEARCH
            </button>
            <button
              type="button"
              className="btn-refresh"
              onClick={this.handleRefresh}
            >
              REFRESH
            </button>
          </div>
          {/* End btn submit */}
        </form>
        {/* End form search */}
      </div>
    );
  }
}

// Get State from Redux store to props
const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
    tags: state.Tag.tags,
  };
};

// Connect component SearchController with Redux store
export default connect(mapStateToProps)(SearchController);
