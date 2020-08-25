import React, { Component } from "react";
import "./StatisTable.css";
import { connect } from "react-redux";
class StatisTable extends Component {
  render() {
    let tbodyContent = this.props.queryData.map((item, index) => {
      return (
        <tr key={index}>
          <td className="col-3 text-center">{item.word}</td>
          <td className="col-3 text-center">{item.count}</td>
          <td className="col-3 text-center">{item.percent}</td>
          <td className="col-3 text-center">{item.F}</td>
        </tr>
      );
    });
    return (
      <div>
        <div className="table-statis">
          <table className="table table-fixed">
            <thead className="text-center">
              <tr>
                <th className="col-3">Word</th>
                <th className="col-3">Count</th>
                <th className="col-3">Percent</th>
                <th className="col-3">F=-log(n/N)</th>
              </tr>
            </thead>
            <tbody>{tbodyContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    queryData: state.Data.queryData,
  };
};
export default connect(mapStateToProps)(StatisTable);
