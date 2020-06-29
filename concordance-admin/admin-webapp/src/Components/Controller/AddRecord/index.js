import React, { Component } from "react";

export default class AddRecord extends Component {
  render() {
    return (
      <div className="col-4">
        <div className="d-flex justify-content-center align-items-center controller__item">
          <i
            className="fa fa-plus-square mr-4"
            data-toggle="modal"
            data-target="#addRecordModal"
          ></i>
          <span>Add record</span>
        </div>
      </div>
    );
  }
}
