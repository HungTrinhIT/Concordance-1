import React, { Component, Fragment } from "react";
import "./App.css";
import Homepage from "./Screens/Homepage/Homepage";
import Login from "./Screens/Login";
export default class App extends Component {
  render() {
    return (
      <Fragment>
        {/* <Homepage /> */}
        <Login />
      </Fragment>
    );
  }
}
