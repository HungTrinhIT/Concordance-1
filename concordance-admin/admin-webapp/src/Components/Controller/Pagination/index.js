import React, { Component } from "react";
import "./pagination.css";
import { createAciton } from "../../../Redux/Action";
import { UPDATE_PAGE_NUMBER } from "../../../Redux/Action/type";
import { connect } from "react-redux";
class Pagination extends Component {
  state = {
    pageNumber: 1,
  };
  handlePage = (value) => {
    let currentPageNumber = this.state.pageNumber;
    let newPageNumber;
    if (value === -1) {
      if (currentPageNumber > 1) newPageNumber = currentPageNumber + value;
      else newPageNumber = currentPageNumber;
    } else newPageNumber = currentPageNumber + value;

    this.setState(
      {
        pageNumber: newPageNumber,
      },
      () => {
        this.props.dispatch(
          createAciton(UPDATE_PAGE_NUMBER, this.state.pageNumber)
        );
      }
    );
  };

  render() {
    return (
      <div className="col-4 pagination">
        <div className="d-flex justify-content-around align-items-start">
          <i
            className="fa fa-chevron-circle-left"
            onClick={() => this.handlePage(-1)}
          ></i>
          <input
            type="text"
            value={this.state.pageNumber}
            className="pagination__number"
            name="pageNumber"
            onChange={this.handleOnChange}
          />
          <i
            className="fa fa-chevron-circle-right"
            onClick={() => this.handlePage(1)}
          ></i>
        </div>
      </div>
    );
  }
}

export default connect()(Pagination);
