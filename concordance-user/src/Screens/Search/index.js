import React, { Component, Fragment } from "react";
import Sidebar from "../../Components/Sidebar";
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
        <Table languageTitle="English" data={this.props.data.source} />
      );
      tables.push(
        <Table languageTitle="Vietnamese" data={this.props.data.target} />
      );
    } else {
      tables.push(
        <Table languageTitle="Vietnamese" data={this.props.data.target} />
      );
      tables.push(
        <Table languageTitle="English" data={this.props.data.source} />
      );
    }

    return (
      <Fragment>
        <div className="main">
          <div className="row m-0">
            <Sidebar />
            <div className="col-10 mt-2 content">
              <div className="row">
                {/* Language to search */}
                <ShowLanguage />
                {/* Search type */}
                <SearchController />
              </div>
              <Linebreak />
              {tables}
            </div>
          </div>
        </div>
      </Fragment>
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
