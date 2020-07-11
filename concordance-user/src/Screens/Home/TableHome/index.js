import React, { Component } from "react";
import "./TableHome.css";

export default class TableHome extends Component {
  render() {
    let { data } = this.props;
    let tbodyContent = data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.sentence_id}</td>
          <td>{item.sentence}</td>
        </tr>
      );
    });
    return (
      <div className="table__home">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sentence</th>
            </tr>
          </thead>
          <tbody>{tbodyContent}</tbody>
        </table>
      </div>
    );
  }
}
