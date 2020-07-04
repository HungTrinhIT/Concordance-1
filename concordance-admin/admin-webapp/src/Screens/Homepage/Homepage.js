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

class Homepage extends Component {
  componentDidMount() {
    // Call API here(componentDidMount) to get the ViData and EngData, then those data will be stored in Redux store
    // After that, we will get ViData and EngData from store and pass those data to EngTable and ViTable
    // Get viData
    // dataService
    //   .fetchLanguageData_pagination(this.props.pageNumber, "vnData")
    //   .then((res) => {
    //     this.props.dispatch(createAciton(FETCH_VI_DATA, res.data.results));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
      this.props.dispatch(createAciton(FETCH_VI_DATA, ViData.results));
    // Get enData
    // dataService
    //   .fetchLanguageData_pagination(this.props.pageNumber, "enData")
    //   .then((res) => {
    //     this.props.dispatch(createAciton(FETCH_EN_DATA, res.data.results));
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
      this.props.dispatch(createAciton(FETCH_EN_DATA, EnData.results));
  }
  render() {
    return (
      <div className="container-fluid">
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
      </div>
    );
  }
}
// mapStateToProps: This function is responsible for map State to props and Homepage will be received data from store
const mapStateToProps = (state) => {
  return {
    viData: state.data.viData,
    enData: state.data.enData,
    pageNumber: state.data.pageNumber,
  };
};
export default connect(mapStateToProps)(Homepage);
