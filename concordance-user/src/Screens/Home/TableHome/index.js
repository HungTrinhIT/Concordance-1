import React, { Component } from "react";
import "./TableHome.css";

export default class TableHome extends Component {
  handleActive = (id) => {
    console.log("sentence id:",id);
  };
  render() {
    let { data } = this.props;
    let tbodyContent = data.map((item, index) => {
      return (
        <tr key={index}>
          <td className="col-3">{item.sentence_id}</td>
          <td
            className="col-9"
            onClick={() => this.handleActive(item.sentence_id)}
          >
            {item.sentence}
          </td>
        </tr>
      );
    });
    return (
      <div className="table__home">
        <div className="table-content">
          <table className="table table-fixed">
            <thead>
              <tr>
                <th className="col-3">ID</th>
                <th className="col-9">Sentence</th>
              </tr>
            </thead>
            <tbody>{tbodyContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
