import React, { Component, Fragment } from "react";
import ShowLanguage from "../../Components/Language";
import Linebreak from "../../Components/Linebreak";
import Table from "../../Components/Table";
import { connect } from "react-redux";
import "./Search.css";
import SearchController from "../../Components/SearchController";
class Search extends Component {
  render() {
    let tables = [];
    if (this.props.language === "english") {
      tables.push(
        <Table
          languageTitle="English"
          key="source"
          data={this.props.data.source}
        />
      );
      tables.push(
        <Table
          languageTitle="Vietnamese"
          key="target"
          data={this.props.data.target}
        />
      );
    } else {
      tables.push(
        <Table
          languageTitle="Vietnamese"
          key="source"
          data={this.props.data.target}
        />
      );
      tables.push(
        <Table
          languageTitle="English"
          key="target"
          data={this.props.data.source}
        />
      );
    }

    return (
      <div>
        <div className="main container">
          <div className="row m-0">
            <div className="col-12 mt-2 content">
              <div className="row">
                {/* Language to search */}
                <ShowLanguage />
                {/* Search type */}
                <SearchController />
              </div>
              <Linebreak />
              <div className="container">{tables}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Get data from store
const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
    data: state.Data.searchData || { source: [], target: [] },
  };
};
export default connect(mapStateToProps)(Search);
