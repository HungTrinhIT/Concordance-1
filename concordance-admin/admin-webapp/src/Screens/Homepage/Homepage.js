import React, { Component } from "react";
import "./Homepage.css";
import Controller from "../../Components/Controller";
import Table from "../../Components/Table";
import { connect } from "react-redux";
import { createAciton } from "../../Redux/Action/index";
import { FETCH_EN_DATA, FETCH_VI_DATA, LOG_OUT } from "../../Redux/Action/type";
import { dataService } from "../../Services/index";
import Spinner from "../../Components/Spinner";
import Modal from "../../Components/Modal";
import Backdrop from "../../Components/Backdrop";

class Homepage extends Component {
  state = {
    modalToggle: false,
    editData: {},
  };
  componentDidMount() {
    // Get VnData
    dataService
      .fetchLanguageData_pagination(this.props.pageNumber, "vndata")
      .then((res) => {
        this.props.dispatch(createAciton(FETCH_VI_DATA, res.data.results));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Get enData
    dataService
      .fetchLanguageData_pagination(this.props.pageNumber, "endata")
      .then((res) => {
        this.props.dispatch(createAciton(FETCH_EN_DATA, res.data.results));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.pageNumber);
    if (this.props.pageNumber !== nextProps.pageNumber) {
      dataService
        .fetchLanguageData_pagination(nextProps.pageNumber, "vndata")
        .then((res) => {
          this.props.dispatch(createAciton(FETCH_VI_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Get enData
      dataService
        .fetchLanguageData_pagination(nextProps.pageNumber, "endata")
        .then((res) => {
          this.props.dispatch(createAciton(FETCH_EN_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    return true;
  }

  getEditData = (item) => {
    this.setState({
      editData: item,
    });
  };
  logOutHandler = () => {
    this.props.dispatch(createAciton(LOG_OUT, null));
    this.props.history.push("/login");
  };
  openModalHandler = () => {
    this.setState({
      modalToggle: !this.state.modalToggle,
    });
  };
  render() {
    let { user } = this.props;
    let userContent = null;
    if (user) {
      userContent = (
        <div className="log-out-ctn">
          <span className="log-out-icon" onClick={this.logOutHandler}>
            Log out  <i className="fa fa-sign-out-alt ml-2"></i>
          </span>
        </div>
      );
    }
    return (
      <div className="container-fluid homepage">
        <div className="d-flex justify-content-between align-items-center header-admin">
          <h3 className="admin-title">CONCORDANCE ADMIN</h3>
          {userContent}
        </div>
        <Controller />
        <div className="line"></div>
        {/* EngData */}
        <p className="language">
          <i className="fa fa-language mr-3"></i>
          English
        </p>
        <Table
          data={this.props.enData}
          openModalHandler={this.openModalHandler}
          getEditData={this.getEditData}
        />

        {/* ViData */}
        <p className="language">
          <i className="fa fa-language mr-3"></i>
          Vietnamese
        </p>
        <Table
          data={this.props.viData}
          openModalHandler={this.openModalHandler}
          getEditData={this.getEditData}
        />
        <Modal
          show={this.state.modalToggle}
          modalClosed={this.openModalHandler}
          editData={this.state.editData}
          openModalHandler={this.openModalHandler}
        ></Modal>
        <Backdrop
          show={this.state.modalToggle}
          clicked={this.openModalHandler}
        />
        {this.props.loaded === true ? <Spinner /> : null}
      </div>
    );
  }
}
// mapStateToProps: This function is responsible for map State to props and Homepage will be received data from store
const mapStateToProps = (state) => {
  return {
    viData: state.data.viData,
    enData: state.data.enData,
    pageNumber: state.data.currentPage,
    loaded: state.data.loaded,
    user: state.user.credentials,
  };
};
export default connect(mapStateToProps)(Homepage);
