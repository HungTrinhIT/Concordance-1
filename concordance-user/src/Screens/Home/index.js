import React, { Component } from "react";
import { connect } from "react-redux";
import "./Home.css";
import TableHome from "./TableHome";
import Pagination from "../../Components/Pagination";
import { dataService } from "../../Services";
import { createAction } from "../../Redux/Action";
import { FETCH_EN_DATA, FETCH_VI_DATA } from "../../Redux/Action/type";

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
//     sentence_id: "000003",
//     sentence:
//       'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
//   },
// ];

class Home extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.pageNumber !== nextProps.pageNumber) {
      dataService
        .fetchData_pagination(nextProps.pageNumber, "vnsentence")
        .then((res) => {
          this.props.dispatch(createAction(FETCH_VI_DATA, res.data.results));
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
      return true;
    }
    return false;
  }

  render() {
    return (
      <div className="home container pt-2">
        <div className="home__controller mb-3">
          <div className="d-flex">
            <Pagination />
          </div>
        </div>
        <div className="home__table">
          <TableHome data={this.props.viData} />
          <TableHome data={this.props.enData} />
        </div>
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
  };
};

export default connect(mapStateToProps)(Home);
