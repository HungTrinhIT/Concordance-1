import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./Screens/Search";
import Header from "./Layouts/Header";
import Help from "./Screens/Help";
import Aboutus from "./Screens/Aboutus";
import Statistics from "./Screens/Statistics";
import Home from "./Screens/Home";
import { connect } from "react-redux";
import { createAction } from "./Redux/Action";
import { FETCH_VI_DATA, FETCH_EN_DATA } from "./Redux/Action/type";
import { dataService } from "./Services";
import Footer from "./Layouts/Footer";

const data = [
  {
    sentence_id: "000001",
    sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
  },
  {
    sentence_id: "000002",
    sentence:
      "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
  },
  {
    sentence_id: "000003",
    sentence:
      'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
  },
  {
    sentence_id: "000004",
    sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
  },
  {
    sentence_id: "000005",
    sentence:
      "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
  },
  {
    sentence_id: "000006",
    sentence:
      'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
  },
  {
    sentence_id: "000007",
    sentence: "' Nếu điều đó giữ được hạnh_phúc gia_đình thì vẫn còn hời đấy !",
  },
  {
    sentence_id: "000008",
    sentence:
      "' Renbim ' có nghĩa là ' nhân_dân ' và ' bi ' có nghĩa là ' tiền_tệ ' hoặc ' tiền ' .",
  },
  {
    sentence_id: "000009",
    sentence:
      'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
  },
  {
    sentence_id: "0000010",
    sentence:
      'Xin cám_ơn ông đã cho chúng_tôi xem bộ sưu_tập hoạ_phẩm của ông , " Đó là đặc_ân của tôi " .',
  },
];
class App extends Component {
  componentDidMount() {
    // FETCH Vietnamese sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "vnsentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_VI_DATA, response.data.results));
      })
      .catch((error) => {
        console.log(error.message);
      });
    // FETCH English sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "ensentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_EN_DATA, response.data.results));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/statistics" component={Statistics} />
          <Route path="/aboutus" component={Aboutus} />
          <Route path="/help" component={Help} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageNumber: state.Controller.currentPage,
  };
};
export default connect(mapStateToProps)(App);
