import React, { Component, Fragment } from "react";
import "./App.css";
import Homepage from "./Screens/Homepage/Homepage";
import { connect } from "react-redux";
import Login from "./Screens/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createAciton } from "./Redux/Action";
import { FETCH_CREDENTIALS } from "./Redux/Action/type";
class App extends Component {
  // Len local storegare lay thong tin user neu da dang nhap
  _getCridentialsFromLocal = () => {
    const credentialString = localStorage.getItem("credentials");
    if (credentialString) {
      this.props.dispatch(
        createAciton(FETCH_CREDENTIALS, JSON.parse(credentialString))
      );
    }
  };

  componentDidMount() {
    this._getCridentialsFromLocal();
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(App);
