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
          data={this.props.data.target}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
      tables.push(
        <Table
          languageTitle="English"
          key="target"
          data={this.props.data.source}
          handleRowSelected={this.handleRowSelected}
          selectedID={this.state.rowSelected}
          openModalHandler={this.openModalHandler}
        />
      );
    }

    return (
      <div className="container">
        <div className="row">
          <ShowLanguage />
          <SearchController />
        </div>
        <Linebreak />
        <div>{tables}</div>
        <Modal show={this.state.modalToggle} modalClosed={this.openModalHandler}>
           <p className="modal-title">Modal title</p>
        </Modal>
        <Backdrop show={this.state.modalToggle} clicked={this.openModalHandler} />
      </div>
    );
  }
}

// Get data from store
const mapStateToProps = (state) => {
  return {
    language: state.Controller.language,
    data: state.Data.searchData || { source: [], target: [] },
  };
};
export default connect(mapStateToProps)(Search);
