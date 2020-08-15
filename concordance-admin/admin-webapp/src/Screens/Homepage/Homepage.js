import React, { Component } from "react";
import "./Homepage.css";
import Controller from "../../Components/Controller";
import Table from "../../Components/Table";
import { connect } from "react-redux";
import { createAciton } from "../../Redux/Action/index";
import EnData from "../../EnData.json";
import ViData from "../../ViData.json";
import { FETCH_EN_DATA, FETCH_VI_DATA } from "../../Redux/Action/type";
import { dataService } from "../../Services/index";
import Spinner from "../../Components/Spinner";

class Homepage extends Component {
  componentDidMount() {
    // Get VnData
    dataService
      .fetchLanguageData_pagination(this.props.pageNumber, "vndata")
      .then((res) => {
        this.props.dispatch(createAciton(FETCH_VI_DATA, res.data.results));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Get enData
    dataService
      .fetchLanguageData_pagination(this.props.pageNumber, "endata")
      .then((res) => {
        this.props.dispatch(createAciton(FETCH_EN_DATA, res.data.results));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.pageNumber);
    if (this.props.pageNumber !== nextProps.pageNumber) {
      dataService
        .fetchLanguageData_pagination(nextProps.pageNumber, "vndata")
        .then((res) => {
          this.props.dispatch(createAciton(FETCH_VI_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Get enData
      dataService
        .fetchLanguageData_pagination(nextProps.pageNumber, "endata")
        .then((res) => {
          this.props.dispatch(createAciton(FETCH_EN_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    return true;
  }
  render() {
    console.log("render homepage:", this.props.pageNumber);
    return (
      <div className="container-fluid homepage">
        <h3 className="text-center title-admin">CONCORDANCE ADMIN</h3>
        <Controller />
        <div className="line"></div>
        {/* EngData */}
        <p className="language">
          <i className="fa fa-language mr-3"></i>
          English
        </p>
        <Table data={this.props.enData} />

        {/* ViData */}
        <p className="language">
          <i className="fa fa-language mr-3"></i>
          Vietnamese
        </p>
        <Table data={this.props.viData} />
        {this.props.loaded === true ? <Spinner /> : null}
      </div>
    );
  }
}
// mapStateToProps: This function is responsible for map State to props and Homepage will be received data from store
const mapStateToProps = (state) => {
  return {
    viData: state.data.viData,
    enData: state.data.enData,
    pageNumber: state.data.currentPage,
    loaded: state.data.loaded,
  };
};
export default connect(mapStateToProps)(Homepage);
