import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import TableHome from "./TableHome";
import Pagination from "../../Components/Pagination";
import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import { FETCH_VI_DATA, FETCH_EN_DATA } from "../../Redux/Action/type";

class Home extends Component {
  componentDidMount() {
    // FETCH Vietnamese sentences
    console.log("didMount Home:",this.props.pageNumber);
    dataService
      .fetchData_pagination(this.props.pageNumber, "vnsentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_VI_DATA, response.data.results));
      })
      .catch((error) => {
        console.log(error.message);
      });

    // FETCH English sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "ensentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_EN_DATA, response.data.results));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Update Home:", this.props.pageNumber, nextProps.pageNumber);
    if (this.props.pageNumber !== nextProps.pageNumber) {
      dataService
        .fetchData_pagination(nextProps.pageNumber, "vnsentence")
        .then((res) => {
          this.props.dispatch(createAction(FETCH_VI_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Get enData
      dataService
        .fetchData_pagination(nextProps.pageNumber, "ensentence")
        .then((res) => {
          this.props.dispatch(createAction(FETCH_EN_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });
      return true;
    }
    return false;
  }

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
