import React, { Component } from "react";
import "./Table.css";
import { connect } from "react-redux";
class Table extends Component {
  render() {
    let tableContent = this.props.data.map((item) => {
      let activeClass =
        this.props.selectedID === item.sentence_id
          ? "text-info"
          : null;
      return (
        <tr
          key={item.sentence_id}
          onClick={() => {
            this.props.handleRowSelected(item.sentence_id);
          }}
          className={activeClass}
        >
          <td className="text-right col-5">
            {item.left.length < 50 ? item.left : item.left.slice(0, 50) + "..."}
          </td>
          <td className="text-center text-primary col-2">
            {item.key.length < 10 ? item.key : item.key.slice(0, 10) + "..."}
          </td>
          <td className="text-left col-5">
            {item.right.length < 50
              ? item.right
              : item.right.slice(0, 50) + "..."}
          </td>
        </tr>
      );
    });
    return (
      <div className="source-languege">
        {/* Title language */}
        <p className="language-title">
          <i className="fa fa-language mr-2" />
          {this.props.languageTitle}
        </p>
        {/* Table content */}
        <div className="table-content">
          <table className="table table-fixed">
            <thead className="text-center">
              <tr>
                <th className="col-5">Left</th>
                <th className="col-2">Key</th>
                <th className="col-5">Right</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect()(Table);
