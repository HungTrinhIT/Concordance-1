import React, { Component } from "react";
import ShowLanguage from "../../Components/Language";
import Linebreak from "../../Components/Linebreak";
import Table from "../../Components/Table";
import { connect } from "react-redux";
import "./Search.css";
import SearchController from "../../Components/SearchController";
import Modal from "../../Components/Modal";
import Backdrop from "../../Components/Backdrop";

class Search extends Component {
  state = {
    rowSelected: null,
    modalToggle: false,
  };
  handleRowSelected = (id) => {
    this.setState({
      rowSelected: id,
    });
  };

  openModalHandler = () => {
    this.setState({
      modalToggle: !this.state.modalToggle,
    });
  };

  render() {
    let renderSource = null,
      renderTarget = null;
    if (this.props.detailSentence !== null) {
      renderSource = this.props.detailSentence.source.map((item, index) => {
        return (
          <div className="word-item mr-5" key={index}>
            <p className="mb-2">{item[8]}</p>
            <p>{item[4]}</p>
          </div>
        );
      });
      renderTarget = this.props.detailSentence.target.map((item, index) => {
        return (
          <div className="word-item mr-5" key={index}>
            <p>{item[4]}</p>
            <p className="mt-1">{item[8]}</p>
          </div>
        );
      });
    }
    let tables = [];
    if (this.props.language === "english") {
      tables.push(
        <Table
          languageTitle="English"
          key="source"
          data={this.props.data.source}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
      tables.push(
        <Table
          languageTitle="Vietnamese"
          key="target"
          data={this.props.data.target}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
    } else {
      tables.push(
        <Table
          languageTitle="Vietnamese"
          key="source"
          data={this.props.data.source}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
      tables.push(
        <Table
          languageTitle="English"
          key="target"
          data={this.props.data.target}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
    }
    console.log(this.props.data.length);
    return (
      <div className="container">
        <div className="row">
          <ShowLanguage />
          <SearchController />
        </div>
        <Linebreak />
        <div>
          {!this.props.data ? (
            <p className="search-result">
              Found total <span>{this.props.data.length}</span> results
            </p>
          ) : null}
          {tables}
        </div>
        <Modal
          show={this.state.modalToggle}
          modalClosed={this.openModalHandler}
        >
          <div className="myModal-top">
            <p className="modal-title">Show Alignment</p>
            <i className="fa fa-times" onClick={this.openModalHandler}></i>
          </div>
          <div className="myModal-content">
            <div className="modal-content__left">
              <div className="modal-content__item-left mt-2">
                <p className="mb-2">POS</p>
                <p className="source-title">
                  {this.props.language === "english" ? "English" : "Vietnamese"}
                </p>
              </div>
              <div className="modal-content__item-left">
                <p className="source-title">
                  {this.props.language !== "english" ? "English" : "Vietnamese"}
                </p>
                <p className="mt-2 mb-2">POS</p>
              </div>
            </div>
            <div className="modal-content__right">
              <div className="modal-content__item-right d-flex">
                {renderSource}
              </div>
              <div className="modal-content__item-right d-flex">
                {renderTarget}
              </div>
            </div>
          </div>
          <div className="myModal-footer d-flex justify-content-end">
            <button onClick={this.openModalHandler}>CLOSE</button>
          </div>
        </Modal>
        <Backdrop
          show={this.state.modalToggle}
          clicked={this.openModalHandler}
        />
      </div>
    );
  }
}

// Get data from store
const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
    data: state.Data.searchData || { source: [], target: [] },
    detailSentence: state.Data.detailSentence,
  };
};
export default connect(mapStateToProps)(Search);
