import React, { Component } from "react";
import "./TableHelp.css";
import { connect } from "react-redux";

class TableHelp extends Component {
  render() {
    // Render <tr> </tr> tags of tbody in table
    let trRender = this.props.tags[`${this.props.typeTag}`].map(
      (item, index) => {
        return (
          <tr key={index}>
            <td className="col-6">{item.tag}</td>
            <td className="col-6">{item.description}</td>
          </tr>
        );
      }
    );

    return (
      <div className="help-table">
        <table className="table table-fixed table-bordered">
          <thead>
            <tr>
              <th className="col-6">Tag</th>
              <th className="col-6">Description</th>
            </tr>
          </thead>
          <tbody>{trRender}</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tags: state.Tag.tags,
  };
};
export default connect(mapStateToProps)(TableHelp);
