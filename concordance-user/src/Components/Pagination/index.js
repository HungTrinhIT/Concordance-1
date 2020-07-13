import React, { Component } from "react";
import "./pagination.css";
import { connect } from "react-redux";
import { UPDATE_PAGE_NUMBER } from "../../Redux/Action/type";
import { createAction } from "../../Redux/Action";

class Pagination extends Component {
  state = {
    pageNumber: this.props.pageNumber,
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
          createAction(UPDATE_PAGE_NUMBER, this.state.pageNumber)
        );
      }
    );
  };
  render() {
    let clickHandler =
      this.state.pageNumber === 1 ? null : () => this.handlePage(-1);
    return (
      <div className="pagination">
        <div className="d-flex justify-content-around align-items-center">
          <i className="fa fa-chevron-circle-left" onClick={clickHandler}></i>
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

const mapStateToProps = (state) => {
  return {
    pageNumber: state.Controller.currentPage,
  };
};
export default connect(mapStateToProps)(Pagination);
