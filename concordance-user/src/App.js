import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Search from "./Screens/Search";
import Header from "./Layouts/Header";
import Help from "./Screens/Help";
import Statistics from "./Screens/Statistics";
import Home from "./Screens/Home";
import { connect } from "react-redux";
import { createAction } from "./Redux/Action";
import {
  FETCH_VI_DATA,
  FETCH_EN_DATA,
  NEXT_PAGE,
  FETCH_STATIS_QUERY,
} from "./Redux/Action/type";
import { dataService } from "./Services";
import Footer from "./Layouts/Footer";
import Spinner from "./Components/Spinner";
import axios from "axios";
import Input from "./Components/Form/Input";

class App extends Component {
  state = {
    name: "",
    age: "",
    address: "",
    email: "",
  };
  componentDidMount() {
    // FETCH Vietnamese sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "vnsentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_VI_DATA, response.data.results));
        this.props.dispatch(createAction(NEXT_PAGE, response.data.next));
      })
      .catch((error) => {
        this.props.dispatch(createAction("RESET_LOADING", false));
        alert(error.message);
      });
    // Fetch English sentences
    dataService
      .fetchData_pagination(this.props.pageNumber, "ensentence")
      .then((response) => {
        this.props.dispatch(createAction(FETCH_EN_DATA, response.data.results));
      })
      .catch((error) => {
        alert(error.message);
      });

    //Fetch statistic default data
    axios
      .get(`http://127.0.0.1:8000/api/statistic/?lang=en&size=100`)
      .then((response) => {
        this.props.dispatch(createAction(FETCH_STATIS_QUERY, response.data));
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  handleOnChange = (name, value) => {
    this.setState({
      [`${name}`]: value,
    });
  };
  render() {
    return (
      <BrowserRouter className="wrapper">
        <Header />
        <Switch>
          <Route path="/statistics" component={Statistics} />
          <Route path="/help" component={Help} />
          <Route path="/search" component={Search} />
          <Route path="/" component={Home} />
        </Switch>
        {this.props.loaded === true ? <Spinner /> : null}
        <Footer />
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pageNumber: state.Controller.currentPage,
    loaded: state.Controller.loaded,
  };
};
export default connect(mapStateToProps)(App);
