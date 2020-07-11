import React, { Component, Fragment } from "react";
import Sidebar from "../../Components/Sidebar";
import ShowLanguage from "../../Components/Language";
import Linebreak from "../../Components/Linebreak";
import Table from "../../Components/Table";
import { connect } from "react-redux";
import "./Search.css";
import SearchController from "../../Components/SearchController";
class Search extends Component {
  // Fetch Data from Backend in here
  componentDidMount() {}
  render() {
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
              <Table />
              <Table />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// Get data from store
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(Search);
