import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import TableHome from "./TableHome";
import Pagination from "../../Components/Pagination";
import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import {
  FETCH_EN_DATA,
  FETCH_VI_DATA,
  NEXT_PAGE,
} from "../../Redux/Action/type";
import Modal from "../../Components/Modal";
import Backdrop from "../../Components/Backdrop";
// const data = [
//   {
//     sentence_id: "000001",
//     sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
//   },
//   {
//     sentence_id: "000002",
//     sentence:
//       "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
//   },
//   {
//     sentence_id: "000003",
//     sentence:
//       'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
//   },
//   {
//     sentence_id: "000004",
//     sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
//   },
//   {
//     sentence_id: "000005",
//     sentence:
//       "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
//   },
//   {
//     sentence_id: "000006",
//     sentence:
//       'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
//   },
//   {
//     sentence_id: "000007",
//     sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
//   },
//   {
//     sentence_id: "000008",
//     sentence:
//       "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
//   },
//   {
//     sentence_id: "000009",
//     sentence:
//       'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
//   },
//   {
//     sentence_id: "0000010",
//     sentence:
//       'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
//   },
// ];

class Home extends Component {
  state = {
    rowSelected: null,
    modalToggle: false,
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pageNumber !== nextProps.pageNumber) {
      dataService
        .fetchData_pagination(nextProps.pageNumber, "vnsentence")
        .then((res) => {
          this.props.dispatch(createAction(FETCH_VI_DATA, res.data.results));
          this.props.dispatch(createAction(NEXT_PAGE, res.data.next));
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Get enData
      dataService
        .fetchData_pagination(nextProps.pageNumber, "ensentence")
        .then((res) => {
          this.props.dispatch(createAction(FETCH_EN_DATA, res.data.results));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    return true;
  }

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
            <p className="mb-2">{item[7]}</p>
            <p>{item[3]}</p>
          </div>
        );
      });
      renderTarget = this.props.detailSentence.target.map((item, index) => {
        return (
          <div className="word-item mr-5" key={index}>
            <p>{item[3]}</p>
            <p className="mt-1">{item[7]}</p>
          </div>
        );
      });
    }
    return (
      <div className="home container pt-2">
        <div className="home__controller mb-3">
          <div className="d-flex">
            <Pagination />
          </div>
        </div>
        <div className="home__table">
          <TableHome
            data={this.props.enData}
            selectedID={this.state.rowSelected}
            openModalHandler={this.openModalHandler}
            handleRowSelected={this.handleRowSelected}
          />
          <TableHome
            data={this.props.viData}
            selectedID={this.state.rowSelected}
            openModalHandler={this.openModalHandler}
            handleRowSelected={this.handleRowSelected}
          />
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
                  {this.props.languageType === "english"
                    ? "English"
                    : "Vietnamese"}
                </p>
              </div>
              <div className="modal-content__item-left">
                <p className="source-title">
                  {this.props.languageType !== "english"
                    ? "English"
                    : "Vietnamese"}
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

const mapStateToProps = (state) => {
  return {
    languageType: state.Controller.language,
    pageNumber: state.Controller.currentPage,
    viData: state.Data.initData.viData,
    enData: state.Data.initData.enData,
    detailSentence: state.Data.detailSentence,
  };
};

export default connect(mapStateToProps)(Home);
