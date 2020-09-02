import React, { Component } from "react";

export default class EditMode extends Component {
  render() {
    return (
      <div className="col-4">
        <div className="d-flex justify-content-center align-items-center controller__item">
          <i className="fa fa-edit mr-4"></i>
          <span>Edit mode</span>
        </div>
      </div>
    );
  }
}
