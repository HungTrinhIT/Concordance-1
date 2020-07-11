import React, { Component } from "react";
import "./sidebar.css";
import { connect } from "react-redux";
import { createAction } from "../../Redux/Action";
import { SEARCH_TYPE } from "../../Redux/Action/type";

class Sidebar extends Component {
  _handleSearchType = (value) => {
    this.props.dispatch(createAction(SEARCH_TYPE, value));
  };
  render() {
    let { searchType } = this.props;
    let searchComponent = null;

    return (
      <div className="col-2 side-bar">
        <div className=" searchTitle">
          <div
            className="searchTitle__item border-bottom"
            onClick={() => this._handleSearchType("word")}
          >
            <p>WORD</p>
            <i className="fa fa-chevron-right"/>
          </div>
          <div
            className="searchTitle__item border-bottom"
            onClick={() => this._handleSearchType("tag")}
          >
            <p>TAGS</p>
            <i className="fa fa-chevron-right" />
          </div>
          <div
            className="searchTitle__item"
            onClick={() => this._handleSearchType("wordtag")}
          >
            <p>WORD + TAGS</p>
            <i className="fa fa-chevron-right" />
          </div>
        </div>


        {/* Logo CLC */}
        <div className="info-clc mt-5 text-white">
          <img src="/images/cropped-Logo-v2.0.22.png" alt="logo" />
          <p className="mt-3">
            UNIVERSITY OF SCIENCE - VIETNAM NATIONAL UNIVERSITY HO CHI MINH CITY
          </p>
          <p className="mt-3">COMPUTATIONAL LINGUISTICS CENTER</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchType: state.SearchType.type,
  };
};
export default connect(mapStateToProps)(Sidebar);
