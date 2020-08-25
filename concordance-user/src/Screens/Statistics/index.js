import React, { Component } from "react";
import "./statistics.css";
import { connect } from "react-redux";
import StatisTable from "./StatisTable";
import StatisController from "./StatisController";
import axios from "axios";
import { createAction } from "../../Redux/Action";
import { FETCH_STATIS_SUMARY } from "../../Redux/Action/type";

class Statistics extends Component {
  state = {
    queryData: this.props.queryData,
  };
  componentDidMount() {
    //   FETCH DATA - SUMARY
    axios
      .get("http://127.0.0.1:8000/api/totalstatistics")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_STATIS_SUMARY, response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  // Updating: setState for data
  static getDerivedStateFromProps(props, state) {
    if (props.sumaryData !== state.sumaryData) {
      return {
        sumaryData: props.sumaryData,
      };
    }
    return null;
  }
  render() {
    return (
      <div className="statistics-section myContainer">
        {/*Sumary data  */}
        {this.props.sumaryData.length !== 0 ? (
          <div className="row">
            <div className="col-6">
              <p>English</p>
              <div>
                <ul>
                  <li>Total word types: {this.props.sumaryData[0][3]}</li>
                  <li>Total word token: {this.props.sumaryData[0][1]}</li>
                  <li>Total sentences: {this.props.sumaryData[0][2]}</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <p>Vietnamses</p>
              <div>
                <ul>
                  <li>Total word types: {this.props.sumaryData[1][3]}</li>
                  <li>Total word token: {this.props.sumaryData[1][1]}</li>
                  <li>Total sentences: {this.props.sumaryData[1][2]}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : null}

        {/* Statistic query section */}
        <div className="row">
          {/* Table */}
          {/* Controller */}
          <div className="col-9">
            <StatisTable />
          </div>
          <div className="col-3">
            <StatisController />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sumaryData: state.Data.sumaryData,
  };
};

export default connect(mapStateToProps)(Statistics);
