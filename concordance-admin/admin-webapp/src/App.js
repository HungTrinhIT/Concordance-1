import React, { Component, Fragment } from "react";
import "./App.css";
import Table from "./Components/Table";
import Homepage from "./Screens/Homepage/Homepage";
export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Homepage />
      </Fragment>
    );
  }
}
