import React, { Component } from "react";
import "./SearchController.css";
import { connect } from "react-redux";
import Ner from "./Tag/Ner";
import Pos from "./Tag/Pos";

import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import { FETCH_SEARCH_DATA } from "../../Redux/Action/type";
import Word from "./Word";

class SearchController extends Component {
  state = {
    word: {
      searchValue: "",
      searchType: "",
    },
    tag: {
      pos: "",
      ner: "",
    },
    isRefresh: false,
    loaded: false,
  };
  handleWord = ({ searchValue, searchType }) => {
    let newWord = { searchValue: searchValue, searchType: searchType };
    this.setState({ word: newWord, isRefresh: false });
  };
  handleTag = ({ key, value }) => {
    let initTag = this.state.tag;
    if (key === "pos") {
      initTag.pos = value;
    } else initTag.ner = value;
    this.setState({
      isRefresh: false,
      tag: initTag,
    });
  };
  handleRefresh = () => {
    this.setState({
      word: {
        searchValue: "",
        searchType: "",
      },
      tag: {
        pos: "",
        ner: "",
      },
      isRefresh: true,
    });
  };

  // Submit search:
  // Request to server,
  // then get data if
  //    1 => setState in Redux ,
  //    0 => Modal : alert to client
  handleOnsubmit = (e) => {
    e.preventDefault();
    let lang = this.props.languageType === "vietnamese" ? "vn" : "en";
    // this.props.dispatch(createAction(FETCH_SEARCH_DATA, DATA_TEST));
    this.props.dispatch(createAction("RESET_LOADING", true));
    dataService
      .fetchData_Search(
        this.state.word.searchValue,
        this.state.word.searchType,
        lang,
        this.state.tag
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
  render() {
    return (
      <div className="col-10 seach__controller mt-3">
        <form className="row" onSubmit={this.handleOnsubmit}>
          {/* SEARCH BY WORD */}
          <div className="col-5">
            <Word
              handleWord={this.handleWord}
              isRefresh={this.state.isRefresh}
            />
          </div>

          {/* SEARCH BY TAG */}
          <div className="search__tag col-4 ">
            <p className="content__title">Tag</p>
            <div className="d-flex">
              <div className="mr-2">
                <Pos
                  handleTag={this.handleTag}
                  isRefresh={this.state.isRefresh}
                />
              </div>
              <div>
                <Ner
                  handleTag={this.handleTag}
                  isRefresh={this.state.isRefresh}
                />
              </div>
            </div>
          </div>

          {/* Button SUBMIT SEARCHc */}
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageType: state.Controller.language,
  };
};

export default connect(mapStateToProps)(SearchController);
