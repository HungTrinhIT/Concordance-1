import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import TableHome from "./TableHome";
import Pagination from "../../Components/Pagination";

class Home extends Component {
  render() {
    return (
      <div className="home container">
        <div className="home__controller">
          <div className="d-flex">
            <Pagination />
          </div>
        </div>
        <div className="home__table">
          <TableHome data={this.props.viData} />
          <TableHome data={this.props.enData} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    languageType: state.Controller.language,
    pageNumber: state.Controller.currentPage,
    viData: state.Data.viData,
    enData: state.Data.enData,
  };
};
export default connect(mapStateToProps)(Home);
